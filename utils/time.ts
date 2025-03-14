/**
 * Waits for the given time in seconds.
 */
export const awaitTime = (time: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time * 1000);
    });
}
