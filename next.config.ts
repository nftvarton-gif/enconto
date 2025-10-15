import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default withIntl(nextConfig);
