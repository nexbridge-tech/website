const fs=require('node:fs');
const {execFileSync}=require('node:child_process');
const restored=[];
for(const file of fs.readdirSync('content/knowledge')){
 const path='content/knowledge/'+file;
 const source=fs.readFileSync(path,'utf8');
 const bad=source.split(/\r?\n/).filter(line=>/svg\)|\.vg\)/.test(line)&&!line.startsWith('!'));
 if(!bad.length)continue;
 if(bad.length!==1)throw Error('Unexpected corruption '+path);
 const revisions=execFileSync('git',['log','--format=%H','--',path],{encoding:'utf8'}).trim().split('\n');
 let original;
 for(const revision of revisions){
  const historic=execFileSync('git',['show',revision+':'+path],{encoding:'utf8'});
  const body=historic.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'').trim();
  const first=body.split(/\r?\n\s*\r?\n/)[0];
  if(!/svg\)|\.vg\)/.test(first)&&first.slice(0,100)===bad[0].slice(0,100)){original=first;break;}
 }
 if(!original)throw Error('No original found: '+path);
 let next=source.replace(bad[0],original);
 if(!/^updated:/m.test(next))next=next.replace(/^(date:.*)$/m,'$1\nupdated: 2026-09-27');
 fs.writeFileSync(path,next);restored.push(file);
}
fs.writeFileSync('tmp/restored-article-intros.json',JSON.stringify(restored,null,2));
console.log('Restored original opening paragraphs in '+restored.length+' articles from Git history.');
