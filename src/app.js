import { Application } from 'https://deno.land/x/oak/mod.ts';
import { APP_HOST, APP_PORT } from './configs/config.js';

import { errorHandler, requestHandler } from './controllers/index.js';

const app = new Application();

app.use(errorHandler);
app.use(requestHandler);

console.log(`Listening on port ${APP_PORT}...`);

await app.listen(`${APP_HOST}:${APP_PORT}`);
