"""Job scheduler for surface crawler using APScheduler."""
import logging

logger = logging.getLogger(__name__)


def start_scheduler() -> None:
    """Start the crawl scheduler.

    In production, use APScheduler:
        from apscheduler.schedulers.blocking import BlockingScheduler
        scheduler = BlockingScheduler()
        scheduler.add_job(run_serp_job, "interval", hours=6)
        scheduler.add_job(run_news_job, "interval", hours=3)
        scheduler.add_job(run_social_job, "interval", hours=1)
        scheduler.start()
    """
    logger.info("Scheduler stub started. Configure APScheduler for production.")
