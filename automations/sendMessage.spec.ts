import test from "@playwright/test";
import sendMessageToNumber from "../actors/sendMessageToNumber";
import { RECIPENTS } from "../data/ignore/recipentInfo";
import { awaitTime } from "../utils/time";
import { logger } from "../utils/logger";
import { MESSAGES } from "../data/ignore/messages";

test("Sending Message to phone number", async ({ page }) => {
    await page.goto("https://web.whatsapp.com/");

    for (let i = 0; i < RECIPENTS.length; i++) {
        const recipent = RECIPENTS[i];
        await sendMessageToNumber(page, recipent.number, MESSAGES);
    }

    await page.keyboard.press("Enter");
    await awaitTime(10)

    // closing the logger stream.
    logger.endLog();
    await page.close();
})
