import dotenv from 'dotenv';

import {getClient} from './mongodb-client.js';
import {crudExample} from './mongodb-crud.js';

dotenv.config();

const mongoClient = await getClient();

await crudExample(mongoClient);

process.on('SIGINT', async () => {
    if (mongoClient) {
        await mongoClient.close();
        console.log('Mongo connection to DocumentDB closed.');
        process.exit(0);
    }
});

process.exit(0);
