/** @type {import('next').NextConfig} */
const nextConfig = {
  // Webpack configuration for proper dependency handling
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ensure styled-jsx is not marked as external on the server side
      config.externals = config.externals || {};
      if (Array.isArray(config.externals)) {
        // If externals is an array, filter out styled-jsx
        config.externals = config.externals.filter(
          (ext) => ext !== 'styled-jsx' && ext !== 'styled-jsx/style'
        );
      }
    }
    return config;
  },

  // Security headers
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "connect-src 'self'",
              "media-src 'self'",
              "object-src 'none'",
              "frame-src 'self'", // Allow same-origin framing for NextAuth
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
          // HTTP Strict Transport Security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Cross-site scripting protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Additional security settings
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
