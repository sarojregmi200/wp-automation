import fs from 'node:fs';

export class Logger {
    private logPath: string = './logs.txt';
    private writer = fs.createWriteStream(this.logPath, {
        flags: 'a',
        encoding: 'utf-8',
        highWaterMark: 16384,
    })

    async log(message: string, silent: boolean = false) {
        try {
            if (!silent) {
                console.log(`Logged:> ${message.replaceAll('\n', '').replaceAll('\t', '')}`);
            }
            this.writer.write(`${message}\n`);
        }
        catch (error) {
            console.log(`Error occured while logging.\nError:${error}`);
        }
    }
}

export const logger = new Logger();
