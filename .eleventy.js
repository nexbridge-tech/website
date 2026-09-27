const { DateTime } = require("luxon");
const seo = require("./lib/seo");

module.exports = function (eleventyConfig) {
  for (const [name, filter] of Object.entries(seo)) eleventyConfig.addFilter(name, filter);

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
  eleventyConfig.ignores.add("MEMBER_LIBRARY_SETUP.md");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("tmp/**");
  // Partner showcase is temporarily unpublished; keep its source for later.
  eleventyConfig.ignores.add("partners.njk");

  // Knowledge articles collection, newest first (drafts excluded)
  eleventyConfig.addCollection("knowledgeArticles", function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((item) => item.filePathStem.startsWith("/content/knowledge/") && !item.data.draft)
      .sort((a, b) => b.data.date - a.data.date);
  });

  // Fixed display order for Knowledge topic groups (biggest/most central first)
  const KNOWLEDGE_TOPIC_ORDER = [
    "Renewable Energy & Grid Integration",
    "Energy Storage Systems",
    "Automotive & EV Power Electronics",
    "PCB Design, Components & EMC",
    "Robotics & Motion Control",
    "Engineering Consulting & Process",
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

  // Simple Knowledge library grouped around the three core solution pillars.
  const KNOWLEDGE_SOLUTION_GROUPS = [
    {
      title: "System, Software & Hardware Engineering",
      slug: "engineering-design",
      description: "System architecture, software and hardware design, integration, validation and Automotive SPICE-aligned engineering practice.",
      topics: [
        "Renewable Energy & Grid Integration",
        "Energy Storage Systems",
        "Automotive & EV Power Electronics",
        "Robotics & Motion Control",
        "Engineering Consulting & Process",
        "Thermal Management",
        "AI Infrastructure",
        "Career & Culture",
      ],
    },
    {
      title: "Prototyping, PCBA & Component Supply",
      slug: "prototyping-supply",
      description: "PCB design, component selection, prototype builds, manufacturing quality and supply-chain engineering.",
      topics: ["PCB Design, Components & EMC", "Semiconductor & Manufacturing"],
    },
    {
      title: "ERP, MES & Factory Digitalization",
      slug: "factory-digitalization",
      description: "Factory connectivity, industrial data, automation integration and the foundations required for ERP/MES deployment.",
      topics: ["Industrial Networking & Automation"],
    },
  ];

  eleventyConfig.addCollection("knowledgeBySolution", function (collectionApi) {
    const articles = collectionApi
      .getAll()
      .filter((item) => item.filePathStem.startsWith("/content/knowledge/") && !item.data.draft);

    return KNOWLEDGE_SOLUTION_GROUPS.map((group) => ({
      ...group,
      articles: articles
        .filter((item) => group.topics.includes(item.data.topic))
        .sort((a, b) => b.data.date - a.data.date),
    })).filter((group) => group.articles.length > 0);
  });

  // Solution area detail subpages, for the sitemap
  eleventyConfig.addCollection("solutionPages", function (collectionApi) {
    return collectionApi.getAll().filter((item) => item.filePathStem.startsWith("/content/solutions/") && !item.data.draft && !item.data.noindex);
  });

  eleventyConfig.addCollection("indexablePages", (api) => api.getAll().filter(item =>
    item.url && (item.url === "/" || item.url.endsWith(".html")) && !item.data.noindex && !item.data.draft
  ));

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
