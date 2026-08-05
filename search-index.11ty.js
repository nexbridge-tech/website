module.exports = class {
  data() {
    return {
      permalink: "search-index.json",
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const items = [];

    items.push(
      {
        title: "Home",
        url: "/index.html",
        description: "NexBridge Solutions — engineering-led sourcing and consulting for energy storage, EV power electronics, thermal management and industrial automation.",
        type: "Page",
      },
      {
        title: "Solutions",
        url: "/solutions.html",
        description: "Energy storage, thermal management, industrial networking, automation, AI infrastructure, semiconductor and engineering consulting.",
        type: "Page",
      },
      {
        title: "Industries",
        url: "/industries.html",
        description: "Industries NexBridge serves — energy, automotive, manufacturing and more.",
        type: "Page",
      },
      {
        title: "Knowledge",
        url: "/knowledge.html",
        description: "Engineering articles, technical guides and field notes from real projects.",
        type: "Page",
      },
      {
        title: "About",
        url: "/about.html",
        description: "About NexBridge Solutions — our mission, focus areas and how we work with customers and partners.",
        type: "Page",
      },
      {
        title: "Contact",
        url: "/contact.html",
        description: "Get in touch with NexBridge for new inquiries, partnerships or technical support.",
        type: "Page",
      }
    );

    for (const article of data.collections.knowledgeArticles || []) {
      items.push({
        title: article.data.title,
        url: article.url,
        description: article.data.excerpt || "",
        type: article.data.topic || "Article",
      });
    }

    for (const page of data.collections.solutionPages || []) {
      items.push({
        title: page.data.title,
        url: page.url,
        description: `Solutions · ${page.data.eyebrow || ""}`,
        type: "Solution",
      });
    }

    const withSearch = items.map((item) => ({
      ...item,
      search: `${item.title} ${item.description}`.toLowerCase(),
    }));

    return JSON.stringify(withSearch);
  }
};
