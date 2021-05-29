import readline from 'readline';
import fs from 'fs';

import colors from 'colors';

colors.setTheme({
    def: ['grey'],
    ask: ['green', 'bold'],
    err: ['red', 'underline'],
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askAction() {
    const question = [
        'What do you want to do?',
        '  - To decrypt type D.',
        '  - To encrypt type E',
        '',
        'Waiting your order my King: ',
    ].join('\n');

    return new Promise<string>((resolve, reject) => {
        function parseAction(action: string) {
            const isDecrypt = (action === 'D');
            const isEncrypt = (action === 'E');

            if (!isDecrypt && !isEncrypt) {
                // @ts-ignore
                console.log('\nInvalid action. Please read carefully...\n'.err);

                askAction().then((action) => {
                    resolve(action);
                });

                return;
            }

            if (isEncrypt) {
                // @ts-ignore
                console.log('\nOkay, you decided to encrypt your secrets. Your word is law for me...'.def);
            }

            if (isDecrypt) {
                // @ts-ignore
                console.log('\nOkay, you decided to decrypt your enemies secrets. Your word is law for me...'.def);
            }

            resolve(action);
        }

        // @ts-ignore
        rl.question(question.ask, parseAction);
    });
}

function askFilePathAndRead() {
    return new Promise<Buffer>((resolve, reject) => {
        async function parseFile(rawPath: string) {
            const path = rawPath.trim();

            try {
                const buffer = fs.readFileSync(path);

                resolve(buffer);
            } catch (err) {
                console.error(err.message.err);
                console.log('\nTrying again...');

                resolve(askFilePathAndRead());
            }
        }

        // @ts-ignore
        rl.question('\nDrop file with which you want to work: '.ask, parseFile);
    });
}

function processFile(action: string, fileData: Buffer) {
    function decryptBuffer(buffer: Buffer) {
        // @ts-ignore
        console.log('\nDecrypting enemies secure data...'.def);

        // DECRYPTION LOGIC
    }

    function encryptBuffer(buffer: Buffer) {
        // @ts-ignore
        console.log('\nEncrypting your secrets...'.def);

        // ENCRYPTION LOGIC
    }

    switch (action) {
        case 'D': return decryptBuffer(fileData);
        case 'E': return encryptBuffer(fileData);
    }
}

(async() => {
    const action = await askAction();
    const fileData = await askFilePathAndRead();

    processFile(action, fileData);
})();
