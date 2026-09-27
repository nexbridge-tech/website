const fs = require('node:fs');
const files=['index.njk','about.njk','search-index.11ty.js','_data/about.yml','_data/home.yml','_data/contact.yml','_data/solutions.yml',...fs.readdirSync('content/solutions').map(f=>'content/solutions/'+f)];
const replacements=[
 ['with one partner focused','with one team focused'],
 ['FOR INTERNATIONAL PARTNERS','FOR INTERNATIONAL PRODUCT TEAMS'],
 ['Your PCB Design &amp; PCBA Partner In Vietnam','PCB Design &amp; PCBA Support In Vietnam'],
 ['international partners','international product teams'],
 ['global partners','global customers'],
 ['global technology partners','global technology suppliers'],
 ['global technology partner','global technology supplier'],
 ['manufacturing partners','manufacturers'],
 ['manufacturing partner','manufacturer'],
 ['local build partners','local manufacturers'],
 ["selected partner's capabilities","selected manufacturer's capabilities"],
 ['partner capabilities','manufacturing capabilities'],
 ['customers and partners','customers'],
 ['new inquiries, partnerships or technical support','new inquiries or technical support'],
 ['New inquiry, partnership or technical support','New inquiry or technical support'],
 ['technologies and partners','technologies and suppliers'],
 ['as a partner that understands','as an engineering team that understands'],
 ['One Delivery Partner.','One Delivery Team.'],
 ['Your Engineering Partner.','Your Engineering Team.'],
 ['technology partners','technology suppliers'],
 ['technology partner','technology supplier'],
 ['PCBA partners','PCBA manufacturers'],
 ['components and partners','components and suppliers'],
 ['Partner Connection','Supplier Coordination'],
 ['through partners in Vietnam','through manufacturers in Vietnam']
];
for(const file of files){let s=fs.readFileSync(file,'utf8');for(const [a,b] of replacements)s=s.split(a).join(b);fs.writeFileSync(file,s);}
