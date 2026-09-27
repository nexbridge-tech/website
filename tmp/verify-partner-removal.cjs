const fs=require('node:fs'),path=require('node:path');
const issues=[];
function scan(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())scan(p);else if(p.endsWith('.html')){const s=fs.readFileSync(p,'utf8');if(/href=["']\/?partners(?:\.html)?["']|MiTEX|Hoang Quan International|RARE Cooling Paint/.test(s))issues.push(p);}}}
scan('_site');
if(fs.existsSync('_site/partners.html'))issues.push('partners page still exists');
if(fs.readFileSync('_site/sitemap.xml','utf8').includes('/partners'))issues.push('sitemap');
if(issues.length)throw Error(issues.join(','));
console.log('PASS: no partner showcase, brand names, links or sitemap entry in public HTML.');
