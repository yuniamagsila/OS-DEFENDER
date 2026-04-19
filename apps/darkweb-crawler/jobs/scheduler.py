"""Job scheduler for dark web crawler."""
import logging

logger = logging.getLogger(__name__)


def start_scheduler() -> None:
    """Start the dark web crawl scheduler.

    In production, use APScheduler:
        from apscheduler.schedulers.blocking import BlockingScheduler
        scheduler = BlockingScheduler()
        scheduler.add_job(run_paste_job, "interval", hours=6)
        scheduler.add_job(run_breach_job, "interval", hours=12)
        scheduler.add_job(run_marketplace_job, "interval", hours=24)
        scheduler.add_job(run_forum_job, "interval", hours=8)
        scheduler.start()
    """
    logger.info("Dark web scheduler stub. Configure APScheduler for production.")
