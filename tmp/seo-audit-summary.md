# NexBridge SEO audit — 27 September 2026

## Live site findings

- All 54 URLs listed in the live sitemap returned HTTP 200, a self-referencing canonical and one H1, without a noindex meta tag or X-Robots-Tag header.
- robots.txt and sitemap.xml returned HTTP 200. Only /admin/ is blocked by robots.txt.
- All sitemap pages are reachable through HTML links within two clicks from the homepage.
- HTTP and www variants redirect to HTTPS/non-www. A nonexistent test URL returns a real 404.
- /index.html and /solutions are duplicate entry URLs returning HTTP 200 with canonical tags pointing to / and /solutions.html respectively.
- The three supplied Knowledge URLs passed the HTTP, canonical, indexing-directive and internal-link checks. The 6-in-1 and Charging articles have corrupted opening paragraphs on the live site. The supplied BESS article does not have that corruption.
- Thirty local Knowledge articles have the same truncated paragraph/image-filename corruption. Their original paragraphs are recoverable from Git history.
- New CNC service page returns 404 on live; the current local changes have not been deployed.

## Changes prepared locally

- Restored the opening paragraphs of 30 articles from their original Git versions; preserved the current images, other paragraphs and publication dates.
- Recorded the actual revision date, 2026-09-27, for those 30 revised articles. The existing sitemap now emits lastmod for them; Article structured data and visible metadata also show the revision date.
- Added a regression check for leaked SVG filename fragments in article text and verification of Article dateModified.
- Changed five public clean-URL aliases from 200 rewrites to 301 redirects to their existing .html canonical URLs. Added a forced /index.html -> / redirect. These production routing changes require deployment and live verification; Eleventy's local server does not execute Netlify redirects.

## Search Console interpretation and next steps

- The screenshot shows 43 Discovered - currently not indexed URLs: Google knows the URLs but has not crawled them yet. A successful local SEO check cannot prove Google will index them.
- Three redirected URLs and three alternate URLs with an appropriate canonical may be expected exclusions; inspect their targets before treating them as errors.
- Deploy the corrected site, then verify sitemap.xml and the three example URLs on live. Confirm the redirects have no loops.
- Submit or resubmit https://nexbridge.vn/sitemap.xml in Search Console. Use URL Inspection > Test live URL for the three examples and key service pages; if accessible, request indexing for the priority pages.
- Review Crawl Stats > Host status and recent response errors to investigate crawl deferral. Current successful HTTP checks cannot rule out historical or Google-specific access problems.
- The root cause of Google's scheduling decisions cannot be established from the screenshot and public fetches alone. Content corruption is a confirmed quality issue, not a proven explanation for the 43 discovered URLs. No indexing date is guaranteed.

Sources: https://support.google.com/webmasters/answer/7440203 ; https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap ; https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

Raw live audit: live-seo-audit.json. Restored article list: restored-article-intros.json.
