import Client from 'ssh2-sftp-client';

const config = {
    host: 'access-5019484682.webspace-host.com',
    username: 'su373050',
    password: '2k26Schnitzel1!',
    port: 22,
};

const client = new Client();

async function main() {
    try {
        console.log(`Connecting to ${config.host}...`);
        await client.connect(config);
        console.log('Connected!');

        console.log('Listing /public...');
        let list = await client.list('/public');
        console.log('Public contents:', list.map(i => i.name));

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        client.end();
    }
}

main();
