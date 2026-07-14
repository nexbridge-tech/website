# NexBridge Admin Setup Guide

This adds a real admin panel for writing Knowledge articles — no more
asking Claude to hand-edit HTML for every new post. Everything else
(Home, Solutions, Industries, Partners, About, Contact) stays exactly
as it was: plain HTML files, edited the same way as before.

## What changed

- `knowledge.html` is no longer a finished page — it's now a **template**
  that lists whatever articles exist in `content/knowledge/`.
- New folders: `_includes/` (page templates), `content/knowledge/`
  (your articles, as markdown files), `admin/` (the login panel).
- New files: `.eleventy.js` (build config), `package.json`,
  `netlify.toml`, `.gitignore`, `.eleventyignore`.
- Your `assets/` folder is untouched — nothing here changes it.

## Step 1 — Test it locally first (important)

I was not able to run this build myself (no internet access in my
environment), so please test locally before deploying. In your project
folder:

```
npm install
npm start
```

This should start a local server (usually `http://localhost:8080`).
Check that:
- The homepage and other pages still look right
- `/knowledge.html` shows the 3 draft articles
- Clicking an article opens its own page

**If you get an error**, copy the exact error message and send it to
me — that's the fastest way for us to fix it together.

## Step 2 — Push to GitHub as usual

```
git add .
git commit -m "Add Eleventy build and admin CMS"
git push
```

## Step 3 — Move hosting to Netlify

Your site is currently on GitHub Pages (the `CNAME` file). To get the
admin panel working, it needs to move to Netlify, since that's what
powers the login system:

1. Sign up at netlify.com (free), connect your GitHub repo.
2. Netlify should auto-detect the build settings from `netlify.toml`
   (build command `npm run build`, publish folder `_site`). Deploy.
3. In Netlify's site settings → Domain management, add your domain
   `nexbridge.vn` and follow their DNS instructions (this replaces
   your current GitHub Pages DNS setup).

## Step 4 — Turn on the admin login

In Netlify's dashboard for this site:

1. Go to **Site settings → Identity** → click **Enable Identity**.
2. Under Identity settings, set registration to **Invite only** (so
   random people can't sign themselves up as admin).
3. Go to **Site settings → Identity → Services** → enable **Git Gateway**.
4. Go to the **Identity** tab → **Invite users** → invite your own
   email address. You'll get an email to set a password.

## Step 5 — Log in and write

Go to `nexbridge.vn/admin/`, log in, and you should see a "Knowledge
Articles" collection with the 3 draft posts already there. Try editing
one, or create a new one, and hit publish.

## Known limitations right now

- The `Draft` checkbox in the admin panel is currently just a label —
  it doesn't yet hide draft posts from the live site automatically.
  Everything you create will be publicly visible once published. If
  you want real draft/live separation, that's a quick follow-up.
- Social share images (`og-image.jpg`) still don't exist — see our
  earlier conversation about that.
- `robots.txt` / `sitemap.xml` reference `nexbridge.vn/knowledge.html`
  style URLs — these still work fine under the new build.
