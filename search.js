'use strict';
(function(root){
 const normalize=s=>String(s).toLowerCase().replace(/[\s\p{P}]/gu,'');
 const noise=new Set(['什么','怎么','如何','哪里','在哪','可以','不能','是否','现在','今年','我的','我要','帮我','请问','需要','申请','时候','同学','学校','学生','大学','办法','管理','进行','相关','要求','了吗','能否','怎么办','查询']);
 const aliases=[['丢了','遗失','补办'],['分数','成绩'],['寝室','宿舍'],['网课','选修'],['挂科','不及格','补考'],['借几本','借书'],['暑假','校历'],['寒假','校历'],['放假','校历'],['期末','考试'],['水龙头','维修'],['漏水','维修'],['请假','请销假']];
 function terms(query){
  const q=normalize(query);const tokens=new Set();
  for(const segment of q.match(/[\p{Script=Han}]+|[a-z0-9]+/gu)||[]){
   if(/^[a-z0-9]+$/.test(segment)){tokens.add(segment);continue;}
   for(let i=0;i<segment.length-1;i++){const t=segment.slice(i,i+2);if(!noise.has(t))tokens.add(t);}
  }
  for(const group of aliases)if(group.some(t=>q.includes(t)))for(const t of group)tokens.add(t);
  return [...tokens];
 }
 function search(data,query,kind='all'){
  const q=normalize(query);if(q.length<2||noise.has(q))return {answers:[],documents:[],tokens:[]};
  const tokens=terms(q);const answers=data.answers.map(a=>({a,score:a.groups.every(g=>g.some(t=>q.includes(t)))?a.groups.flat().filter(t=>q.includes(t)).reduce((s,t)=>s+t.length,0):0})).filter(r=>r.score).sort((a,b)=>b.score-a.score).map(r=>r.a);
  const boosts=new Map();answers.forEach((a,i)=>a.sources.forEach((id,j)=>boosts.set(id,Math.max(boosts.get(id)||0,80-i*5-j))));
  const documents=data.documents.filter(d=>kind==='all'||d.kind===kind).map(d=>{
   const title=normalize(d.title),body=normalize(d.body);let score=boosts.get(d.id)||0;
   if(title.includes(q))score+=60;if(body.includes(q))score+=30;
   for(const t of tokens){if(title.includes(t))score+=4;if(body.includes(t))score+=1;}
   return {doc:d,score};
  }).filter(r=>r.score>=Math.max(3,Math.min(7,tokens.length*.4))).sort((a,b)=>b.score-a.score||String(a.doc.id).localeCompare(String(b.doc.id))).map(r=>r.doc);
  return {answers:kind==='all'?answers:[],documents,tokens};
 }
 function snippet(doc,tokens){
  const body=doc.body.replace(/\s+/g,' ');let at=-1;
  for(const t of [...tokens].sort((a,b)=>b.length-a.length)){at=body.indexOf(t);if(at>=0)break;}
  const start=Math.max(0,at-36);return (start?'…':'')+body.slice(start,start+170)+(start+170<body.length?'…':'');
 }
 root.CampusSearch={search,terms,snippet};
 if(typeof module!=='undefined')module.exports=root.CampusSearch;
})(typeof window==='undefined'?globalThis:window);
