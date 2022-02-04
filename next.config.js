/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");

module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        "primary-color": "#9900FF",
        "border-radius-base": "2px",
      },
    },
  },
  images: {
    domains: ["images.pokemontcg.io"],
  },
  env: { POKEMONTCG_API_KEY: process.env.POKEMONTCG_API_KEY },
});
