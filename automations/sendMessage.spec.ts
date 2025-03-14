import test from "@playwright/test";
import sendMessageToNumber from "../actors/sendMessageToNumber";
import { RECIPENTS } from "../data/ignore/recipentInfo";
import { awaitTime } from "../utils/time";

const message = [`Testing the multiMessages.`, "This is the second message"]

test("Sending Message to phone number", async ({ page }) => {
    await page.goto("https://web.whatsapp.com/");

    for (let i = 0; i < RECIPENTS.length; i++) {
        const recipent = RECIPENTS[i];
        await sendMessageToNumber(page, recipent.number, recipent.message as string || message);
    }

    await page.keyboard.press("Enter");
    await awaitTime(10)
    await page.close();
})
