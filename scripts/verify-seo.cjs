const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const seo = require("../lib/seo");

// Check relevance, exclusions and safe structured-data serialization.
const item = (url, data = {}) => ({ url, data });
const candidates = [
  item("/self", { topic: "PCB" }),
  item("/draft", { topic: "PCB", draft: true }),
  item("/private", { topic: "PCB", noindex: true }),
  item("/unrelated", { topic: "Other" }),
  item("/topic", { topic: "PCB" }),
  item("/series", { series: "Design" }),
  item("/tag", { tags: ["EMC"] }),
];
assert.deepEqual(seo.relatedArticles(candidates, "/self", "PCB", "Design", ["EMC"]).map(p => p.url), ["/series", "/topic", "/tag"]);
assert.equal(seo.canonical("/index.html"), "https://nexbridge.vn/");
assert.deepEqual(seo.relatedArticles([item("/other", { tags: ["Technical Guides"] })], "/self", "PCB", "", ["Technical Guides"]), []);
const hostileTitle = '</script><script>alert("x")</script>';
const serialized = seo.jsonLd(seo.schema("/knowledge/test.html", hostileTitle, 'A "quoted" description', new Date("2026-08-01")));
assert(!serialized.includes("</script>"));
assert.equal(JSON.parse(serialized)["@graph"][1].headline, hostileTitle);
const revised = seo.schema('/knowledge/revised.html', 'Revised article', 'Description', '2026-08-01', null, '2026-09-27')['@graph'][1];
assert.equal(revised.datePublished, '2026-08-01T00:00:00.000Z');
assert.equal(revised.dateModified, '2026-09-27T00:00:00.000Z');

const output = path.resolve(__dirname, "../_site");
const read = url => fs.readFileSync(path.join(output, url === "/" ? "index.html" : url), "utf8");
const sitemap = fs.readFileSync(path.join(output, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert(urls.length > 0, "Empty sitemap");
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URLs");
const pages = new Map();
const titles = new Set();
for (const url of urls) {
  const route = new URL(url).pathname;
  const html = read(route);
  pages.set(route, html);
  assert(!/<meta[^>]*noindex/i.test(html), `${route}: noindex in sitemap`);
  assert(html.includes(`<link rel="canonical" href="${url}">`), `${route}: canonical mismatch`);
  assert.equal([...html.matchAll(/<link rel="canonical"/g)].length, 1);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  assert(title && !titles.has(title), `${route}: missing/duplicate title`);
  titles.add(title);
  assert(html.match(/<meta name="description" content="([^"]+)"/), `${route}: empty description`);
  const image = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  assert(image, `${route}: missing social image`);
  const imageUrl = new URL(image);
  if (imageUrl.origin === "https://nexbridge.vn") assert(fs.existsSync(path.join(output, imageUrl.pathname)), `${route}: missing image file`);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${route}: expected one H1`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  if (/^\/(knowledge|solutions)\//.test(route)) {
    assert(schemas.some(s => s["@graph"]?.some(g => g["@type"] === "BreadcrumbList")), `${route}: missing breadcrumb schema`);
    assert(html.includes('aria-label="Breadcrumb"'), `${route}: missing visible breadcrumbs`);
  }
  if (route.startsWith("/knowledge/")) {
    assert(schemas.some(s => s["@graph"]?.some(g => g["@type"] === "Article")), `${route}: missing article schema`);
    const bodyText = (html.match(/<div class="article-body">([\s\S]*?)<\/div>/)?.[1] || "").replace(/<[^>]*>/g, " ");
    assert(!/(?:\.svg|\.vg)\)/.test(bodyText), `${route}: corrupted image filename in article text`);
  }
}

// Ensure a crawler starting at Home can reach every sitemap page using HTML links.
const visited = new Set();
const queue = ["/"];
while (queue.length) {
  const route = queue.shift();
  if (visited.has(route)) continue;
  visited.add(route);
  for (const [, href] of (pages.get(route) || "").matchAll(/href="([^"]+)"/g)) {
    const link = new URL(href.replace(/&amp;/g, "&"), "https://nexbridge.vn" + route);
    if (link.origin === "https://nexbridge.vn" && pages.has(link.pathname) && !visited.has(link.pathname)) queue.push(link.pathname);
  }
}
assert.deepEqual([...pages.keys()].filter(url => !visited.has(url)), [], "Pages unreachable from Home");
for (const route of ["/login.html", "/register.html", "/account.html", "/contact-success.html"]) {
  assert(!pages.has(route), `${route}: utility page in sitemap`);
  assert(/<meta[^>]*noindex/i.test(read(route)), `${route}: utility page missing noindex`);
}
console.log(`SEO checks passed: ${pages.size} pages; metadata, images, schema, sitemap, crawl reachability and related-content rules.`);
