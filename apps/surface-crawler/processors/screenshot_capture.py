"""Capture screenshots of URLs as evidence."""
import logging

logger = logging.getLogger(__name__)


def capture_screenshot(url: str, output_path: str) -> str:
    """Capture a screenshot using Playwright and save to output_path.

    In production, use Playwright's async API:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.goto(url)
            await page.screenshot(path=output_path, full_page=True)
            await browser.close()
    """
    logger.info("Screenshot stub: %s → %s", url, output_path)
    return output_path
