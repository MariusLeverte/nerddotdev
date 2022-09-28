const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "cdn.sanity.io",
      "avatars.githubusercontent.com",
      "p16-sign-va.tiktokcdn.com",
    ],
  },
});
