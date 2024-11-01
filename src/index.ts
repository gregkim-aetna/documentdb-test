import dotenv from 'dotenv';

import {getClient} from './mongodb-client.js';

dotenv.config();

const client = await getClient();

process.on("SIGINT", async () => {
    if (client) {
        await client.close();
        console.log("Connection to DocumentDB closed.");
        process.exit(0);
    }
});
