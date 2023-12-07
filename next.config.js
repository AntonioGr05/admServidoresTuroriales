
const removeImports = require("next-remove-imports");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = removeImports()({
  // ✅  options...
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader"
    });
    return config;
  }
});
module.exports = nextConfig
