import Client from 'ssh2-sftp-client';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    host: 'access-5019484682.webspace-host.com',
    username: 'su373050',
    password: '2k26Schnitzel1!',
    port: 22,
};

const localDir = path.join(__dirname, 'dist');
const remoteDir = '/baumsteiger';

const client = new Client();

async function main() {
    try {
        console.log(`Deploying to ${config.host}...`);
        await client.connect(config);
        console.log('Connected via SFTP!');

        console.log('Current remote root contents:');
        const rootList = await client.list('/');
        console.log(rootList.map(item => item.name));

        console.log(`Uploading contents of ${localDir} to ${remoteDir}...`);

        // Check if local dir exists
        if (!fs.existsSync(localDir)) {
            throw new Error(`Local directory ${localDir} does not exist. Run 'npm run build' first.`);
        }

        // Upload directory
        // filter function to skip .DS_Store or similar if needed
        client.on('upload', info => {
            console.log(`Uploaded: ${info.source}`);
        });

        await client.uploadDir(localDir, remoteDir);

        console.log('Deployment successful!');
    } catch (err) {
        console.error('Deployment failed:', err.message);
    } finally {
        client.end();
    }
}

main();
