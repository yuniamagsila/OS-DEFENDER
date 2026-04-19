"""Parse credential dump formats (email:password, colon-separated)."""
import re
from dataclasses import dataclass


@dataclass
class Credential:
    email: str
    password_hash: str


EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}")


def parse_credential_dump(raw_text: str) -> list[Credential]:
    """Parse lines of email:password from a credential dump."""
    credentials: list[Credential] = []
    for line in raw_text.splitlines():
        line = line.strip()
        if ":" in line:
            parts = line.split(":", 1)
            email = parts[0].strip()
            pwd = parts[1].strip()
            if EMAIL_RE.fullmatch(email) and pwd:
                # Store only masked hash — never store plaintext passwords
                credentials.append(Credential(email=email, password_hash=f"[REDACTED:{len(pwd)}chars]"))
    return credentials
