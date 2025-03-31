/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = false;

      // Treat external dependencies properly
      config.externals = [
        ...(config.externals || []),
        {
          // Handle Netlify Identity widget
          "netlify-identity-widget": "netlifyIdentity",
          // Required for react-immutable-proptypes and decap-cms
          immutable: "Immutable",
        },
      ];
    }

    // Fix for DecapCMS TypeScript and missing dependencies issues
    config.module.rules.push({
      test: /node_modules\/decap-cms-.*\/.*\.(?:js|jsx|ts|tsx)$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    });

    // Fix for slate-hyperscript missing dependency
    config.resolve.alias = {
      ...config.resolve.alias,
      "slate-hyperscript": false,
    };

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };

    return config;
  },
  // This is important for the admin route to work properly
  trailingSlash: true,
};

module.exports = nextConfig;
