"""Dark Web Crawler — main entry point."""
import logging

from jobs.scheduler import start_scheduler

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)


def main() -> None:
    logger.info("Starting dark web crawler scheduler…")
    start_scheduler()


if __name__ == "__main__":
    main()
