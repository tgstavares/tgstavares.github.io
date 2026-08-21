#!/usr/bin/env python3
"""Build a passive network profile for an IPv4 or IPv6 address.

The script uses public DNS, RDAP, RIPEstat, IPinfo, and DB-IP lookups. It does
not connect to the target address, scan ports, or otherwise probe the device.
"""

from __future__ import annotations

import argparse
import datetime as dt
import ipaddress
import json
import os
import socket
import sys
import urllib.error
import urllib.parse
import urllib.request
from typing import Any, Iterable


USER_AGENT = "tgstavares-ip-profile/1.0 (+https://www.tgstavares.com/)"

PROFILE_FIELDS = (
    ("ip_address", "IP address"),
    ("address_type", "Address type"),
    ("reverse_dns", "Reverse DNS"),
    ("registered_network", "Registered network"),
    ("registered_cidr", "Registered CIDR"),
    ("registered_range", "Registered range"),
    ("registered_organization", "Registered organization"),
    ("registered_country", "Registered country"),
    ("routed_prefix", "Routed prefix"),
    ("asn", "ASN"),
    ("asn_organization", "ASN organization (ORG/ISP)"),
    ("network_type", "Network type"),
    ("approximate_location", "Approximate location"),
    ("secondary_location", "Secondary geolocation"),
    ("coordinates", "Coordinates"),
    ("time_zone", "Time zone"),
    ("rpki_status", "RPKI status"),
    ("abuse_contact", "Abuse contact"),
)


class LookupClient:
    """Small JSON HTTP client that records non-fatal lookup failures."""

    def __init__(self, timeout: float) -> None:
        self.timeout = timeout
        self.warnings: list[str] = []

    def get_json(
        self,
        source: str,
        url: str,
        params: dict[str, str] | None = None,
    ) -> dict[str, Any] | None:
        if params:
            separator = "&" if "?" in url else "?"
            url = f"{url}{separator}{urllib.parse.urlencode(params)}"

        request = urllib.request.Request(
            url,
            headers={"Accept": "application/json", "User-Agent": USER_AGENT},
        )
        try:
            with urllib.request.urlopen(request, timeout=self.timeout) as response:
                payload = json.load(response)
        except urllib.error.HTTPError as exc:
            self.warnings.append(f"{source}: HTTP {exc.code}")
            return None
        except urllib.error.URLError as exc:
            self.warnings.append(f"{source}: {exc.reason}")
            return None
        except (TimeoutError, socket.timeout):
            self.warnings.append(f"{source}: request timed out")
            return None
        except (json.JSONDecodeError, UnicodeDecodeError, OSError) as exc:
            self.warnings.append(f"{source}: {exc}")
            return None

        if not isinstance(payload, dict):
            self.warnings.append(f"{source}: unexpected response format")
            return None
        return payload


def parse_ip(value: str) -> ipaddress.IPv4Address | ipaddress.IPv6Address:
    try:
        return ipaddress.ip_address(value.strip())
    except ValueError as exc:
        raise argparse.ArgumentTypeError(f"invalid IP address: {value}") from exc


def address_type(address: ipaddress.IPv4Address | ipaddress.IPv6Address) -> str:
    version = f"IPv{address.version}"
    if address.is_global:
        return f"Public {version}"
    if address.is_loopback:
        return f"Loopback {version}"
    if address.is_link_local:
        return f"Link-local {version}"
    if address.is_multicast:
        return f"Multicast {version}"
    if address.is_unspecified:
        return f"Unspecified {version}"
    if address.is_reserved:
        return f"Reserved {version}"
    if address.is_private:
        return f"Private/non-public {version}"
    return f"Non-global {version}"


def reverse_dns(address: str) -> str | None:
    try:
        return socket.gethostbyaddr(address)[0].rstrip(".")
    except (socket.herror, socket.gaierror, TimeoutError, OSError):
        return None


def flatten_entities(entities: Any) -> Iterable[dict[str, Any]]:
    if not isinstance(entities, list):
        return
    for entity in entities:
        if not isinstance(entity, dict):
            continue
        yield entity
        yield from flatten_entities(entity.get("entities"))


def vcard_values(entity: dict[str, Any], property_name: str) -> list[str]:
    vcard = entity.get("vcardArray")
    if not isinstance(vcard, list) or len(vcard) < 2 or not isinstance(vcard[1], list):
        return []

    values: list[str] = []
    for item in vcard[1]:
        if not isinstance(item, list) or len(item) < 4:
            continue
        if str(item[0]).lower() != property_name.lower():
            continue
        value = item[3]
        if isinstance(value, list):
            value = ", ".join(str(part) for part in value if part)
        if value:
            values.append(str(value))
    return values


def rdap_organization(rdap: dict[str, Any] | None) -> str | None:
    if not rdap:
        return None
    entities = list(flatten_entities(rdap.get("entities")))
    registrants = [
        entity
        for entity in entities
        if "registrant" in [str(role).lower() for role in entity.get("roles", [])]
    ]

    # RIPE responses can list a maintainer before the actual organization.
    # Prefer conventional organization handles and human-readable names.
    def organization_score(entity: dict[str, Any]) -> tuple[int, int]:
        handle = str(entity.get("handle") or "").upper()
        names = vcard_values(entity, "fn") + vcard_values(entity, "org")
        human_name = max((len(name.split()) for name in names), default=0)
        return (int(handle.startswith("ORG-")), human_name)

    preferred = sorted(registrants, key=organization_score, reverse=True)
    remaining = [entity for entity in entities if entity not in preferred]
    for entity in preferred + remaining:
        for field in ("fn", "org"):
            values = vcard_values(entity, field)
            if values:
                return values[0]
    return None


def rdap_abuse_contacts(rdap: dict[str, Any] | None) -> list[str]:
    if not rdap:
        return []
    contacts: list[str] = []
    for entity in flatten_entities(rdap.get("entities")):
        roles = [str(role).lower() for role in entity.get("roles", [])]
        if "abuse" in roles:
            contacts.extend(vcard_values(entity, "email"))
    return unique(contacts)


def rdap_cidrs(rdap: dict[str, Any] | None) -> list[str]:
    if not rdap or not isinstance(rdap.get("cidr0_cidrs"), list):
        return []
    cidrs: list[str] = []
    for item in rdap["cidr0_cidrs"]:
        if not isinstance(item, dict):
            continue
        prefix = item.get("v4prefix") or item.get("v6prefix")
        length = item.get("length")
        if prefix is not None and length is not None:
            cidrs.append(f"{prefix}/{length}")
    return cidrs


def unique(values: Iterable[str]) -> list[str]:
    return list(dict.fromkeys(value for value in values if value))


def location(parts: Iterable[Any]) -> str | None:
    cleaned = unique(str(part).strip() for part in parts if part and str(part).strip())
    return ", ".join(cleaned) if cleaned else None


def infer_network_type(*values: Any) -> str:
    text = " ".join(str(value).lower() for value in values if value)
    categories = (
        (
            "Academic/institutional (heuristic)",
            ("university", "universidade", "academic", "education", "eduroam", "rcts", "rccn"),
        ),
        (
            "Hosting/cloud (heuristic)",
            (
                "amazon",
                "aws",
                "azure",
                "cloud",
                "datacenter",
                "data center",
                "digitalocean",
                "hosting",
                "colo",
            ),
        ),
        ("Mobile/wireless (heuristic)", ("cellular", "mobile", "wireless")),
        (
            "Consumer/access ISP (heuristic)",
            ("broadband", "cable", "dsl", "fiber", "fibre", "telecom", "residential"),
        ),
        ("Government (heuristic)", ("government", "ministry", "municipal", "public administration")),
    )
    for label, terms in categories:
        if any(term in text for term in terms):
            return label
    return "Unclassified (heuristic)"


def value_at(payload: dict[str, Any] | None, *path: str) -> Any:
    value: Any = payload
    for key in path:
        if not isinstance(value, dict):
            return None
        value = value.get(key)
    return value


def build_profile(
    address: ipaddress.IPv4Address | ipaddress.IPv6Address,
    client: LookupClient,
) -> dict[str, Any]:
    ip = str(address)
    ptr = reverse_dns(ip)

    if not address.is_global:
        return {
            "ip_address": ip,
            "address_type": address_type(address),
            "reverse_dns": ptr,
            **{key: None for key, _ in PROFILE_FIELDS[3:]},
        }

    # Colons are valid path characters and are required by some IPv6 RDAP
    # implementations; input is already constrained to a validated IP address.
    escaped_ip = urllib.parse.quote(ip, safe=":")
    rdap = client.get_json("RDAP", f"https://rdap.org/ip/{escaped_ip}")
    network = client.get_json(
        "RIPEstat network info",
        "https://stat.ripe.net/data/network-info/data.json",
        {"resource": ip},
    )
    abuse = client.get_json(
        "RIPEstat abuse contact",
        "https://stat.ripe.net/data/abuse-contact-finder/data.json",
        {"resource": ip},
    )

    ipinfo_params = {"token": os.environ["IPINFO_TOKEN"]} if os.getenv("IPINFO_TOKEN") else None
    ipinfo = client.get_json("IPinfo", f"https://ipinfo.io/{escaped_ip}/json", ipinfo_params)
    dbip = client.get_json("DB-IP", f"https://api.db-ip.com/v2/free/{escaped_ip}")

    prefix = value_at(network, "data", "prefix")
    asns = value_at(network, "data", "asns")
    asn = str(asns[0]) if isinstance(asns, list) and asns else None

    if not asn and ipinfo:
        ipinfo_org = str(ipinfo.get("org") or "")
        first, _, rest = ipinfo_org.partition(" ")
        if first.upper().startswith("AS") and first[2:].isdigit():
            asn = first[2:]

    as_overview = None
    rpki = None
    if asn:
        as_overview = client.get_json(
            "RIPEstat ASN overview",
            "https://stat.ripe.net/data/as-overview/data.json",
            {"resource": f"AS{asn}"},
        )
    if asn and prefix:
        rpki = client.get_json(
            "RIPEstat RPKI validation",
            "https://stat.ripe.net/data/rpki-validation/data.json",
            {"resource": f"AS{asn}", "prefix": str(prefix)},
        )

    asn_org = value_at(as_overview, "data", "holder")
    if not asn_org and ipinfo:
        ipinfo_org = str(ipinfo.get("org") or "")
        _, separator, remainder = ipinfo_org.partition(" ")
        asn_org = remainder if separator else ipinfo_org or None

    registered_org = rdap_organization(rdap)
    registered_name = rdap.get("name") if rdap else None
    registered_cidrs = rdap_cidrs(rdap)
    start = rdap.get("startAddress") if rdap else None
    end = rdap.get("endAddress") if rdap else None
    registered_range = f"{start} - {end}" if start and end else None

    abuse_contacts = rdap_abuse_contacts(rdap)
    ripe_abuse = value_at(abuse, "data", "abuse_contacts")
    if isinstance(ripe_abuse, list):
        abuse_contacts.extend(str(contact) for contact in ripe_abuse if contact)

    if not ptr and ipinfo:
        ptr = ipinfo.get("hostname")

    primary_location = location(
        (ipinfo.get("city"), ipinfo.get("region"), ipinfo.get("country"))
        if ipinfo
        else ()
    )
    secondary_location = location(
        (dbip.get("city"), dbip.get("stateProv"), dbip.get("countryCode"))
        if dbip
        else ()
    )

    return {
        "ip_address": ip,
        "address_type": address_type(address),
        "reverse_dns": ptr,
        "registered_network": registered_name,
        "registered_cidr": ", ".join(registered_cidrs) if registered_cidrs else None,
        "registered_range": registered_range,
        "registered_organization": registered_org,
        "registered_country": rdap.get("country") if rdap else None,
        "routed_prefix": prefix,
        "asn": f"AS{asn}" if asn else None,
        "asn_organization": asn_org,
        "network_type": infer_network_type(ptr, registered_name, registered_org, asn_org),
        "approximate_location": primary_location,
        "secondary_location": secondary_location,
        "coordinates": ipinfo.get("loc") if ipinfo else None,
        "time_zone": ipinfo.get("timezone") if ipinfo else None,
        "rpki_status": value_at(rpki, "data", "status"),
        "abuse_contact": ", ".join(unique(abuse_contacts)) if abuse_contacts else None,
    }


def markdown_value(value: Any) -> str:
    if value is None or value == "":
        return "Not available"
    return str(value).replace("|", "\\|").replace("\n", " ")


def print_markdown(profile: dict[str, Any], generated_at: str, warnings: list[str]) -> None:
    print(f"# Passive IP profile: {profile['ip_address']}\n")
    print(f"Generated at {generated_at}.\n")
    print("| Field | Result |")
    print("|---|---|")
    for key, label in PROFILE_FIELDS:
        print(f"| {label} | {markdown_value(profile.get(key))} |")

    print("\nNotes:")
    print("- These are passive lookups only; the target address was not contacted or scanned.")
    print("- Geolocation is approximate and may identify a VPN, proxy, ISP, or institutional exit point.")
    print("- Network type is a keyword-based inference, not a definitive classification.")
    if warnings:
        print("- Some sources were unavailable: " + "; ".join(warnings) + ".")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate a passive DNS, registration, ASN, routing, and geolocation profile."
    )
    parser.add_argument("ip", type=parse_ip, help="IPv4 or IPv6 address to inspect")
    parser.add_argument("--json", action="store_true", help="emit machine-readable JSON")
    parser.add_argument(
        "--timeout",
        type=float,
        default=10.0,
        help="timeout in seconds for each public lookup (default: 10)",
    )
    args = parser.parse_args()
    if args.timeout <= 0:
        parser.error("--timeout must be greater than zero")
    return args


def main() -> int:
    args = parse_args()
    socket.setdefaulttimeout(args.timeout)
    client = LookupClient(args.timeout)
    profile = build_profile(args.ip, client)
    generated_at = dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()

    if args.json:
        print(
            json.dumps(
                {
                    "generated_at": generated_at,
                    "profile": profile,
                    "warnings": client.warnings,
                },
                indent=2,
                sort_keys=True,
            )
        )
    else:
        print_markdown(profile, generated_at, client.warnings)
    return 0


if __name__ == "__main__":
    sys.exit(main())
