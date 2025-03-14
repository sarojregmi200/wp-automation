import type { Page } from "@playwright/test";
import { validatePhNumber, type tphoneNumber } from "../validators/validatePhNumber";
import { awaitTime } from "../utils/time";
import { logger } from "../utils/logger";

const sendMessageToNumber = async (page: Page, number: tphoneNumber, message: string | string[]) => {
    try {
        logger.log(`\n\nChecking the validity of the number ${number}?`);
        const isValid = validatePhNumber(number);

        if (!isValid) {
            logger.log(`\t> Number is Invalid.`);
            return;
        }
        logger.log(`\t> Number is valid.`);

        await page.getByRole('button', { name: 'New chat', exact: true }).click({ timeout: 0 });
        const searchBox = page.getByRole('textbox', { name: 'Search name or number' })
        await searchBox.fill(String(number));
        await awaitTime(1);

        logger.log(`\nSearching for the number ${number}.`);
        const isNumberNotFound = await page.getByText(`No results found for '${number}'`).isVisible()
        if (isNumberNotFound) {
            await page.keyboard.press("Escape");
            await page.keyboard.press('Escape');
            logger.log(`\t> Number not found.`);

            // log point
            await awaitTime(1);
            return;
        }

        logger.log(`\t> Number found. :)`);
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press('Enter');

        logger.log(`\nSending the message to the number ${number}.`);
        // Handeling the multi message
        if (Array.isArray(message)) {
            logger.log(`\t> Multi message detected.`);
            for (let i = 0; i < message.length; i++) {
                await page.getByRole('textbox', { name: 'Type a message' }).fill(message[i]);
                await page.keyboard.press('Enter');
                await awaitTime(1);
                logger.log(`\t> Message ${i + 1} sent.`);
            }
        } else {
            logger.log(`\t> Single message detected.`);
            await page.getByRole('textbox', { name: 'Type a message' }).fill(message);
            await page.keyboard.press('Enter');
            logger.log(`\t> Message sent.`);
        }
        await page.keyboard.press('Enter');

        // log point
        await awaitTime(1);
        logger.log(`\n Operation completed. For number ${number}.`);
    } catch (error) {
        logger.log(`\n Error occured while sending message to ${number}.\nError:${error}`);
    }
}

export default sendMessageToNumber;
