const { chromium } = require('./manufacturing-tools/node_modules/playwright');
const fs = require('node:fs');
(async () => {
 const browser = await chromium.launch({channel:'msedge',headless:true});
 const page = await browser.newPage();
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 fs.mkdirSync('tmp/manufacturing-qa',{recursive:true});
 const routes=['/','/solutions.html','/solutions/manufacturing-services-vietnam.html','/solutions/cnc-precision-machining-vietnam.html','/solutions/jigs-fixtures-vietnam.html','/solutions/pcb-design-pcba-vietnam.html'];
 for(const width of [1440,390,360]) {
  await page.setViewportSize({width,height:1000});
  for(const route of routes) {
   await page.goto('http://localhost:8097'+route,{waitUntil:'networkidle'});
   await page.evaluate(async()=>{for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
   const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src)}));
   if(state.overflow||state.broken.length)throw Error(JSON.stringify({width,route,...state}));
   if(route.includes('manufacturing-services') || (route==='/'&&width===390))await page.screenshot({path:'tmp/manufacturing-qa/'+width+'-'+(route==='/'?'home':'manufacturing')+'.png',fullPage:true});
  }
 }
 for(const service of ['manufacturing','cnc','jigs','pcba','invalid']){
  await page.goto('http://localhost:8097/contact.html?service='+service+'#project-inquiry',{waitUntil:'networkidle'});
  const value=await page.locator('#service-interest').inputValue();
  if(value!==(service==='invalid'?'general':service))throw Error('RFQ selection mismatch '+service);
 }
 await page.goto('http://localhost:8097/solutions/manufacturing-services-vietnam.html');
 await page.getByRole('link',{name:'Discuss Your Build'}).click();
 if(await page.locator('#service-interest').inputValue()!=='manufacturing')throw Error('CTA flow failed');
 await page.locator('#service-interest').selectOption('cnc');
 if(!(await page.locator('#project-message').getAttribute('placeholder')).includes('quantity'))throw Error('Form hint failed');
 if(errors.length)throw Error(errors.join('\n'));
 console.log('PASS: 18 responsive page checks, all images loaded, no horizontal overflow, RFQ defaults and CTA flow, no browser JS errors. No form submitted.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
