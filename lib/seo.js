const origin = "https://nexbridge.vn";
const topicMap = {
  "ai-infrastructure": ["AI Infrastructure"],
  automation: ["Industrial Networking & Automation"],
  "energy-storage-systems": ["Energy Storage Systems", "Renewable Energy & Grid Integration"],
  "engineering-consulting": ["Engineering Consulting & Process", "Automotive & EV Power Electronics", "Career & Culture"],
  "industrial-networking": ["Industrial Networking & Automation"],
  "robotics-motion-control": ["Robotics & Motion Control"],
  semiconductor: ["Semiconductor & Manufacturing", "PCB Design, Components & EMC"],
  "thermal-management": ["Thermal Management"],
  "pcb-design-pcba-vietnam": ["PCB Design, Components & EMC", "Semiconductor & Manufacturing"],
};

function canonical(url) {
  return new URL(url === "/index.html" ? "/" : url, origin).href;
}

function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

function schema(url, title, description, date, image, updated) {
  const article = url.startsWith("/knowledge/");
  const solution = url.startsWith("/solutions/");
  if (!article && !solution) return null;
  const address = canonical(url);
  const graph = [{
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonical("/") },
      { "@type": "ListItem", position: 2, name: article ? "Knowledge" : "Solutions", item: canonical(article ? "/knowledge.html" : "/solutions.html") },
      { "@type": "ListItem", position: 3, name: title, item: address },
    ],
  }];
  if (article) {
    const entry = { "@type": "Article", headline: title, description, url: address, mainEntityOfPage: address };
    if (date && Number.isFinite(new Date(date).getTime())) entry.datePublished = new Date(date).toISOString();
    if (updated && Number.isFinite(new Date(updated).getTime())) entry.dateModified = new Date(updated).toISOString();
    if (image) entry.image = new URL(image, origin).href;
    graph.push(entry);
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

const published = (page) => page.url && !page.data.draft && !page.data.noindex;
const editorialTags = new Set(["Technical Guides", "Engineering Journal", "Field Notes", "Lessons Learned"]);
const tagsOf = (tags) => [...new Set(Array.isArray(tags) ? tags : tags ? [tags] : [])].filter(tag => !editorialTags.has(tag));

function relatedArticles(pages, url, topic, series, tags) {
  const currentTags = new Set(tagsOf(tags));
  return pages.filter(published).filter(p => p.url !== url).map(p => ({
    page: p,
    score: (series && p.data.series === series ? 6 : 0) + (topic && p.data.topic === topic ? 4 : 0)
      + Math.min(3, tagsOf(p.data.tags).filter(tag => currentTags.has(tag)).length),
  })).filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score || a.page.url.localeCompare(b.page.url))
    .slice(0, 3).map(p => p.page);
}

function relatedSolutions(pages, topic) {
  return pages.filter(published).filter(p => (topicMap[p.fileSlug] || []).includes(topic));
}

function solutionArticles(pages, slug) {
  return pages.filter(published).filter(p => (topicMap[slug] || []).includes(p.data.topic)).slice(0, 3);
}

module.exports = { canonical, jsonLd, schema, relatedArticles, relatedSolutions, solutionArticles };
