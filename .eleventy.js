const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  // CRITICAL: Eleventy doesn't read .yml files as data by default -
  // this teaches it to. Without this, every _data/*.yml file is silently ignored.
  eleventyConfig.addDataExtension("yml", (contents) => require("js-yaml").load(contents));

  // Site assets - these stay as plain files, not templates
  eleventyConfig.addPassthroughCopy("robots.txt");
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

  // Knowledge articles collection, newest first (drafts excluded)
  eleventyConfig.addCollection("knowledgeArticles", function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((item) => item.filePathStem.startsWith("/content/knowledge/") && !item.data.draft)
      .sort((a, b) => b.data.date - a.data.date);
  });

  // Fixed display order for Knowledge topic groups (biggest/most central first)
  const KNOWLEDGE_TOPIC_ORDER = [
    "Automotive & EV Power Electronics",
    "Engineering Consulting & Process",
    "Energy Storage Systems",
    "Semiconductor & Manufacturing",
    "Industrial Networking & Automation",
    "Career & Culture",
    "Thermal Management",
    "AI Infrastructure",
  ];

  // Knowledge articles grouped by primary topic, each group newest-first
  eleventyConfig.addCollection("knowledgeByTopic", function (collectionApi) {
    const articles = collectionApi
      .getAll()
      .filter((item) => item.filePathStem.startsWith("/content/knowledge/") && !item.data.draft);

    return KNOWLEDGE_TOPIC_ORDER.map((topic) => ({
      topic,
      articles: articles
        .filter((item) => item.data.topic === topic)
        .sort((a, b) => b.data.date - a.data.date),
    })).filter((group) => group.articles.length > 0);
  });

  // Solution area detail subpages, for the sitemap
  eleventyConfig.addCollection("solutionPages", function (collectionApi) {
    return collectionApi.getAll().filter((item) => item.filePathStem.startsWith("/content/solutions/"));
  });

  // Draft articles get no output page at all, not just hidden from listings
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => (data.draft ? false : data.permalink),
  });

  // Human-readable date filter, e.g. "July 1, 2026"
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat("LLLL d, yyyy");
  });

  // ISO date filter for sitemap <lastmod> values, e.g. "2026-07-01"
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat("yyyy-MM-dd");
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["md", "njk", "11ty.js"],
    markdownTemplateEngine: "njk",
  };
};