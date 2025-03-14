import type { Page } from "@playwright/test";
import { validatePhNumber, type tphoneNumber } from "../validators/validatePhNumber";
import { awaitTime } from "../utils/time";

const sendMessageToNumber = async (page: Page, number: tphoneNumber, message: string | string[]) => {
    try {
        // log point
        const isValid = validatePhNumber(number);

        if (!isValid)
            throw new Error(`The number ${number} is not valid.`);

        await page.getByRole('button', { name: 'New chat', exact: true }).click({ timeout: 0 });
        const searchBox = page.getByRole('textbox', { name: 'Search name or number' })
        await searchBox.fill(String(number));
        await awaitTime(1);

        // log point
        const isNumberNotFound = await page.getByText(`No results found for '${number}'`).isVisible()
        if (isNumberNotFound) {
            await page.keyboard.press("Escape");
            await page.keyboard.press('Escape');

            // log point
            await awaitTime(1);
            return;
        }

        await page.keyboard.press("ArrowDown");
        await page.keyboard.press('Enter');

        // Handeling the multi message
        if (Array.isArray(message)) {
            for (let i = 0; i < message.length; i++) {
                await page.getByRole('textbox', { name: 'Type a message' }).fill(message[i]);
                await page.keyboard.press('Enter');
            }
        } else {
            await page.getByRole('textbox', { name: 'Type a message' }).fill(message);
            await page.keyboard.press('Enter');
        }
        await page.keyboard.press('Enter');

        // log point
        await awaitTime(1);
    } catch (error) {
        throw new Error(`Error occured while sending message to ${number}.\nError:${error}`);
    }
}

export default sendMessageToNumber;
