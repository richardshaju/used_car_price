// next.config.mjs
import path from 'path';

export default {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias['@'] = path.resolve('./src');
    return config;
  },
  experimental: {
    appDir: true,
  },
};
