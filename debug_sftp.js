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

        console.log('Listing root directory (/)...');
        let list = await client.list('/');
        console.log('Root contents:', list.map(i => i.name));

        const baumsteigerExists = await client.exists('/baumsteiger');
        console.log(`Does /baumsteiger exist? ${baumsteigerExists}`);

        if (baumsteigerExists) {
            console.log('Listing /baumsteiger...');
            let subList = await client.list('/baumsteiger');
            console.log('/baumsteiger contents:', subList.map(i => i.name));
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        client.end();
    }
}

main();
