/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
      ? process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
      : "https://nerd.dev",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: "",
      },
    ],
  },
  exclude: ["/login"],
};
