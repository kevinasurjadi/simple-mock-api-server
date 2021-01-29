const env = Deno.env.toObject();
const APP_HOST = env.APP_HOST || '0.0.0.0';
const APP_PORT = env.APP_PORT || 4000;

export { APP_HOST, APP_PORT };
