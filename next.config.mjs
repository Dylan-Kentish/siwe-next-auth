// @ts-check

!process.env.SKIP_ENV_VALIDATION && (await import('./src/env.mjs'));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  // eslint-disable-next-line @typescript-eslint/promise-function-async, @typescript-eslint/no-shadow
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
      net: false,
      tls: false,
      'pino-pretty': false,
      encoding: false,
      lokijs: false,
    };

    return config;
  },
};
export default config;
