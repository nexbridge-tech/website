const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  // Static pages that stay hand-coded HTML - just copy them through untouched
  eleventyConfig.addPassthroughCopy("index.html");
  eleventyConfig.addPassthroughCopy("solutions.html");
  eleventyConfig.addPassthroughCopy("industries.html");
  eleventyConfig.addPassthroughCopy("partners.html");
  eleventyConfig.addPassthroughCopy("about.html");
  eleventyConfig.addPassthroughCopy("contact.html");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  // Site assets
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("assets");

  // Decap CMS admin panel
  eleventyConfig.addPassthroughCopy("admin");

  // Never build these into pages - documentation only
  eleventyConfig.ignores.add("assets/**");
  eleventyConfig.ignores.add("ADMIN_SETUP.md");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("node_modules/**");

  // Knowledge articles collection, newest first
  eleventyConfig.addCollection("knowledgeArticles", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/knowledge/*.md")
      .sort((a, b) => b.data.date - a.data.date);
  });

  // Human-readable date filter, e.g. "July 1, 2026"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat("LLLL d, yyyy");
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
  };
};