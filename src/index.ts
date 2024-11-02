import { Hono } from 'hono';
import { router } from './routes/router';

export default new Hono().route('/api/v1', router);
