import * as readline from 'readline';

export async function getInput() {
    const read = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise<string>((resolve, reject) => {
        read.question('Enter message: ', (input: string) => {
            read.close();
            resolve(input);
        });
    });
}
