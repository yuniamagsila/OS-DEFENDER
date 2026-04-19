"""Rotate Tor circuits via ControlPort."""
import logging
import os
import socket

logger = logging.getLogger(__name__)

TOR_CONTROL_HOST = os.getenv("TOR_CONTROL_HOST", "127.0.0.1")
TOR_CONTROL_PORT = int(os.getenv("TOR_CONTROL_PORT", "9051"))


def rotate_circuit(cookie_auth: bytes | None = None) -> bool:
    """Send NEWNYM signal to Tor ControlPort to rotate circuit.

    Returns True on success, False on failure.
    """
    try:
        with socket.create_connection((TOR_CONTROL_HOST, TOR_CONTROL_PORT), timeout=5) as s:
            if cookie_auth:
                s.sendall(b"AUTHENTICATE " + cookie_auth.hex().encode() + b"\r\n")
            else:
                s.sendall(b"AUTHENTICATE\r\n")
            s.recv(256)
            s.sendall(b"SIGNAL NEWNYM\r\n")
            response = s.recv(256).decode()
            if "250" in response:
                logger.info("Tor circuit rotated successfully.")
                return True
        logger.warning("Tor circuit rotation failed: unexpected response.")
        return False
    except OSError as exc:
        logger.warning("Tor circuit rotation failed: %s", exc)
        return False
