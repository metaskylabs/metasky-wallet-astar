const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  distDir: 'build',
  images: {
    domains: [
      'img.welt.de',
      'openseauserdata.com',
      'www.theater-herne.de',
      'upload.wikimedia.org',
      'cryptologos.cc',
      'skywallet-public-resources.s3.ap-southeast-1.amazonaws.com',
    ],
    formats: ['image/webp'],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ];
  },
});

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });
//
// module.exports = withBundleAnalyzer({});
