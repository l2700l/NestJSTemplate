import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  config: {url: process.env.REDIS_URL}
}));
