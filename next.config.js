/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Fix WalletConnect dynamic import issues
    config.externals.push("pino-pretty", "lokijs", "encoding");

    // 🛠 Tell Webpack to treat this Worker file as an ES module
    config.module.rules.push({
      test: /HeartbeatWorker\.js$/,
      type: "javascript/esm",
    });

    // ✅ Optional: Also help Terser (minifier) treat modules correctly
    if (config.optimization?.minimizer) {
      config.optimization.minimizer = config.optimization.minimizer.map(
        (plugin) => {
          if (plugin.constructor.name === "TerserPlugin") {
            return new plugin.constructor({
              ...plugin.options,
              terserOptions: {
                ...plugin.options.terserOptions,
                module: true,
              },
            });
          }
          return plugin;
        }
      );
    }

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets-stg.transak.com",
        port: "",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "assets-dev.transak.com",
        port: "",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "orki-money-storage.s3.af-south-1.amazonaws.com",
        port: "",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "cryptologos.cc",
        port: "",
        pathname: "*/**",
      },
    ],
  },
};

module.exports = nextConfig;
