'use strict';
let knowledge,loadingKnowledge,searchSequence=0,resultLimit=8,currentResults,currentDocument,readerTrigger;
const sourceLabel=d=>d.kind==='handbook'?`学生手册 · ${d.printed?'印刷第'+d.printed+'页 / ':''}PDF第${d.page}页`:`学校官网 · ${d.published||'未标发布日期'}${d.document_date?' · 正文落款 '+d.document_date:''}`;
async function loadKnowledge(){
 if(knowledge)return knowledge;if(loadingKnowledge)return loadingKnowledge;
 loadingKnowledge=(async()=>{const response=await fetch('knowledge.json?v=4.0.1');if(!response.ok)throw Error('load');const data=await response.json();if(!Array.isArray(data.documents)||data.documents.length!==270)throw Error('format');knowledge=data;
  for(const c of data.chapters){const option=el('option',c.title);option.value=String(c.pdf_start);$('chapter-select').append(option);}return data;
 })();try{return await loadingKnowledge;}finally{loadingKnowledge=null;}
}
function readerButton(id,label){const b=el('button',label,'text-button');b.type='button';b.onclick=()=>openSource(id);return b;}
async function openSource(id){
 try{const data=await loadKnowledge();const d=data.documents.find(r=>r.id===id);if(!d)throw Error('missing');currentDocument=d;
  $('action-status').textContent='';const dialog=$('source-reader');if(!dialog.open)readerTrigger=document.activeElement;
  $('reader-title').textContent=d.title;$('reader-meta').textContent=sourceLabel(d);$('reader-scope').textContent=d.scope+(d.checked?' · 资料读取 '+d.checked:'');$('reader-body').textContent=d.body;
  $('reader-actions').replaceChildren();$('reader-directory').replaceChildren();$('reader-directory').hidden=true;$('reader-status').textContent='';$('reader-copy-fallback').hidden=true;$('reader-help').hidden=d.kind==='handbook';$('reader-body').hidden=false;$('reader-note').hidden=true;$('page-image-box').hidden=true;$('page-image').removeAttribute('src');$('image-error').hidden=true;
  if(d.kind==='handbook'){
   const b=el('button','查看原页图片','quiet-button');b.type='button';b.onclick=()=>{const img=$('page-image');img.src=d.image;img.alt=`学生手册PDF第${d.page}页原页`;img.onerror=()=>{$('image-error').hidden=false;};$('page-image-box').hidden=false;};$('reader-actions').append(b);
   for(const [step,label] of [[-1,'上一页'],[1,'下一页']]){const btn=readerButton('H'+String(d.page+step).padStart(3,'0'),label);btn.disabled=d.page+step<1||d.page+step>253;$('reader-actions').append(btn);}
  }else{
   const a=el('a','打开学校原网页 ↗','quiet-button');a.href=d.url;a.target='_blank';a.rel='noopener noreferrer';
   const copy=el('button','复制官网地址','quiet-button');copy.type='button';copy.onclick=()=>copyText(d.url,'官网地址已复制。','reader-status','reader-copy-fallback');$('reader-actions').append(a,copy);
   if(d.id==='S6'){$('reader-note').hidden=false;$('reader-note').textContent='本站已收录表单发布页和附件名称，尚未取得申请表文件，不能在此下载或填写。请通过学校原网页获取；若打不开，可向辅导员或所在学院索取当前使用的补办换发表。';}
   if(d.directory){$('reader-directory').hidden=false;$('reader-body').hidden=true;$('reader-note').hidden=false;$('reader-note').textContent=`以下 ${d.directory.length} 个单位来自学校教学部门目录，仅用于查找学院与部门，不代表办理窗口。链接保留学校公布的地址；部分为HTTP网页。`;
    for(const entry of d.directory){const row=el('li');const link=el('a',entry.name+' ↗');link.href=entry.url;link.target='_blank';link.rel='noopener noreferrer';const b=el('button','复制地址','quiet-button');b.type='button';b.setAttribute('aria-label','复制'+entry.name+'地址');b.onclick=()=>copyText(entry.url,entry.name+'地址已复制。','reader-status','reader-copy-fallback');row.append(link,b);$('reader-directory').append(row);}
   }
  }
  $('reader-scroll').scrollTop=0;if(!dialog.open)dialog.showModal();$('reader-title').focus();
 }catch{$('knowledge-status').textContent='资料暂未加载成功，请检查网络后重试。';$('action-status').textContent='站内资料暂未加载成功，请检查网络后再次点击资料按钮。';$('knowledge-results').hidden=false;}
}
function renderSearchResults(){
 const {answers,documents,tokens}=currentResults;const box=$('search-documents');box.replaceChildren();const cards=$('answer-cards');cards.replaceChildren();
 const personal=/我的.*(通过|批准|余额|排名|分数是多少|成绩是多少)|帮我.*(提交|登录|审批|续借)/.test($('knowledge-query').value);
 if(personal)cards.append(el('p','这里可查规定与入口，无法读取个人成绩、申请状态或代办。下方资料用于了解办理要求。','basis-note'));
 for(const a of answers.slice(0,3)){const card=el('article',undefined,'answer-card');card.append(el('span','按已收录资料整理','source-kind'),el('h3',a.title),el('p',a.text));const links=el('div',undefined,'answer-links');
  for(const id of a.sources){const d=knowledge.documents.find(d=>d.id===id);if(d)links.append(readerButton(id,sourceLabel(d)));}
  if(a.service){const b=el('button','查看办事指引 →','primary-button');b.type='button';const service=a.id==='grade'&&!/复核|异议|有误|不对|有问题/.test($('knowledge-query').value)?'S05-query':a.service;b.onclick=()=>selectService(service);links.append(b);}card.append(links);cards.append(card);}
 for(const d of documents.slice(0,resultLimit)){const item=el('article',undefined,'search-result');item.append(el('span',sourceLabel(d),'source-kind'),readerButton(d.id,d.title),el('p',CampusSearch.snippet(d,tokens)),el('small',d.scope));box.append(item);}
 $('knowledge-status').textContent=documents.length?`找到 ${documents.length} 页/条相关资料，展示前 ${Math.min(resultLimit,documents.length)} 条。点击标题阅读全文。`:'暂未找到可靠匹配。请换一个具体关键词（例如“勤工助学”“医保”），或按目录查看手册。';
 $('load-more').hidden=documents.length<=resultLimit;
}
async function runSearch(){
 const sequence=++searchSequence;const query=$('knowledge-query').value.trim();$('knowledge-results').hidden=false;resultLimit=8;
 if(query.length<2){$('knowledge-status').textContent='请输入至少两个字，例如“学生证丢了怎么办”。';$('answer-cards').replaceChildren();$('search-documents').replaceChildren();$('load-more').hidden=true;return;}
 $('knowledge-status').textContent='正在检索手册与官方资料…';
 try{const data=await loadKnowledge();if(sequence!==searchSequence)return;currentResults=CampusSearch.search(data,query,$('source-filter').value);renderSearchResults();}
 catch{if(sequence===searchSequence){$('knowledge-status').textContent='资料加载失败，请检查网络后再次点击“查资料”。办事导航仍可使用。';$('answer-cards').replaceChildren();$('search-documents').replaceChildren();$('load-more').hidden=true;}}
}
$('knowledge-form').onsubmit=e=>{e.preventDefault();runSearch();};
$('source-filter').onchange=()=>{if($('knowledge-query').value.trim())runSearch();};
$('load-more').onclick=()=>{resultLimit+=12;renderSearchResults();};
$('browse-handbook').onclick=async()=>{try{await loadKnowledge();$('handbook-browser').hidden=false;$('chapter-select').focus();}catch{$('knowledge-results').hidden=false;$('knowledge-status').textContent='目录加载失败，请检查网络后重试。';}};
$('open-chapter').onclick=()=>openSource('H'+$('chapter-select').value.padStart(3,'0'));
$('page-form').onsubmit=e=>{e.preventDefault();const p=Number($('page-number').value);if(Number.isInteger(p)&&p>=1&&p<=253)openSource('H'+String(p).padStart(3,'0'));};
$('close-reader').onclick=()=>$('source-reader').close();
$('source-reader').addEventListener('close',()=>{if(readerTrigger?.isConnected)readerTrigger.focus({preventScroll:true});});
document.querySelectorAll('[data-query]').forEach(b=>b.onclick=()=>{$('knowledge-query').value=b.dataset.query;runSearch();});
