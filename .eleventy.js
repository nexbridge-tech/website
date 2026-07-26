const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  // CRITICAL: Eleventy doesn't read .yml files as data by default -
  // this teaches it to. Without this, every _data/*.yml file is silently ignored.
  eleventyConfig.addDataExtension("yml", (contents) => require("js-yaml").load(contents));

  // Site assets - these stay as plain files, not templates
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
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
      data: "_data",
      output: "_site",
    },
    templateFormats: ["md", "njk"],
    markdownTemplateEngine: "njk",
  };
};