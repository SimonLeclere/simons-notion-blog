import { createClient } from '@vercel/kv';

if (!process.env.REDIS_REST_API_URL) {
    throw new Error('REDIS_REST_API_URL is not defined');
}

if (!process.env.REDIS_REST_API_TOKEN) {
    throw new Error('REDIS_REST_API_TOKEN is not defined');
}

export default createClient({
    url: process.env.REDIS_REST_API_URL,
    token: process.env.REDIS_REST_API_TOKEN,
});