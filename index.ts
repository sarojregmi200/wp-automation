import test from "@playwright/test";
import sendMessageToNumber from "./actors/sendMessageToNumber";

test("Sending Message to phone number", async ({ page }) => {
    await page.goto("https://web.whatsapp.com/");
})
