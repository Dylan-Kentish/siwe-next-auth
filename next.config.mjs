import './src/env.mjs';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  logging: { fetches: { fullUrl: true } },
  experimental: {
    webpackBuildWorker: true,
  },
  webpack: config => {
    // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};
export default config;
