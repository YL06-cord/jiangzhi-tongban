/* Local source search and opt-in checklist storage; no application submission. */
'use strict';
const DATA=window.CAMPUS_DATA;
const $=id=>document.getElementById(id);
const states=new Map();
const savedItems=new Map();
const saveFailures=new Set();
const STORAGE_KEY='jiangzhi-checklists-v4';
let restoreNotice='';

let active=DATA.services.find(s=>s.id===location.hash.slice(1))||DATA.services[0];
const el=(tag,text,className)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;};
function state(){if(!states.has(active.id))states.set(active.id,{profile:{},materials:{}});return states.get(active.id);}
function renderNav(){
  const query=$('search').value.trim().toLowerCase();
  const list=$('service-list');list.replaceChildren();let group='';let count=0;
  for(const s of DATA.services){
    if(query&&!`${s.title} ${s.keywords}`.toLowerCase().includes(query)&&!CampusSearch.terms(query).some(t=>`${s.title} ${s.keywords}`.includes(t)))continue;
    count++;
    if(group!==s.category){group=s.category;list.append(el('p',group,'nav-group'));}
    const b=el('button',undefined,'service-button');b.type='button';b.setAttribute('aria-current',String(active.id===s.id));
    b.append(el('span',s.title),el('span','↗'));b.onclick=()=>{active=s;history.replaceState(null,'',`#${s.id}`);render();if(matchMedia('(max-width:650px)').matches)$('service-detail').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});};list.append(b);
  }
  $('empty').hidden=count>0;
}
function renderConditions(){
  const box=$('conditions');box.replaceChildren();
  for(const [key,options] of Object.entries(active.profile_options||{})){
    const label=el('label',active.condition_labels[key]||'具体情况','condition');
    const select=el('select');select.setAttribute('aria-label',active.condition_labels[key]||'具体情况');
    const first=el('option','请选择');first.value='';select.append(first);
    options.forEach((value,index)=>{const option=el('option',String(value));option.value=String(index);select.append(option);});
    const value=state().profile[key];select.value=value===undefined?'':String(options.indexOf(value));
    select.onchange=()=>{const current=state();current.profile[key]=select.value===''?undefined:options[Number(select.value)];current.materials={};renderMaterials();persistSaved();};
    label.append(select);box.append(label);
  }
}
function visibleMaterials(){return active.materials.filter(m=>!m.when||state().profile[m.when.field]===m.when.equals);}
function renderMaterials(){
  const list=$('materials');list.replaceChildren();const current=state();
  for(const m of active.materials){
    if(m.when&&current.profile[m.when.field]===undefined){list.append(el('p',`${m.label}：先选择具体情况，再判断是否适用。`,'condition-pending'));continue;}
    if(m.when&&current.profile[m.when.field]!==m.when.equals)continue;
    const row=el('label',undefined,'material');row.append(el('span',m.label,'material-title'));
    const select=el('select');select.setAttribute('aria-label',m.label);
    for(const [value,label] of [['unknown','未说明'],['have','已备有'],['missing','尚未备有']]){const o=el('option',label);o.value=value;select.append(o);}
    select.value=current.materials[m.id]||'unknown';select.onchange=()=>{current.materials[m.id]=select.value;renderResult();persistSaved();};row.append(select);list.append(row);
  }
  if(!active.materials.length)list.append(el('p','现有资料不足以列出完整材料清单，请先确认下方问题。','muted small'));
  renderResult();
}
function renderResult(){
  const ms=visibleMaterials();const current=state();let have=0,missing=0;
  ms.forEach(m=>{if(current.materials[m.id]==='have')have++;if(current.materials[m.id]==='missing')missing++;});
  const conditional=active.materials.filter(m=>m.when&&current.profile[m.when.field]===undefined).length;
  $('check-result').textContent=ms.length||conditional?`已备有 ${have} 项 · 尚未备有 ${missing} 项 · 未说明 ${ms.length-have-missing} 项${conditional?` · 待判断适用 ${conditional} 项`:''}。仅按手册对照，不能据此判定当前材料已齐全。`:'';
}
function renderSources(){
  const box=$('sources');box.replaceChildren();
  for(const source of active.sources){
    const item=el('div',undefined,'source');const title=el('div',undefined,'source-title');
    if(source.url){const a=el('a',source.title+' ↗');a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';title.append(a);}else title.textContent='《学生手册》'+source.title;
    item.append(el('span',source.url?'学校官网':'学生手册','source-kind'),title);
    const parts=[];if(source.printed_page)parts.push(`印刷第${source.printed_page}页 / PDF第${source.pdf_page}页`);if(source.published_at)parts.push(`资料标注：${source.published_at}`);if(source.document_date)parts.push(`正文落款：${source.document_date}`);item.append(el('p',parts.join(' · '),'source-meta'));
    if(source.pdf_page){const b=el('button','阅读本页全文与原图','text-button');b.type='button';b.onclick=()=>openSource('H'+String(source.pdf_page).padStart(3,'0'));item.append(b);}
    if(source.excerpt_verified&&source.excerpt){const details=el('details');details.append(el('summary','查看所收录摘录'),el('blockquote',source.excerpt));item.append(details);}
    item.append(el('p',source.limitation,'source-meta'));box.append(item);
  }
}
function renderActions(){
  const guide=DATA.actions.services[active.id];$('next-action').textContent=guide.first;
  const links=$('action-links');links.replaceChildren();
  for(const entry of guide.links){const a=el('a',entry.label+' ↗');a.href=entry.url;a.target='_blank';a.rel='noopener noreferrer';links.append(a);}
  const facts=$('action-facts');facts.replaceChildren();
  for(const [label,value] of [['先找谁',guide.who],['去哪办',guide.where],['什么时候',guide.when]]){const row=el('div');row.append(el('dt',label),el('dd',value));facts.append(row);}
  $('contact-details').hidden=!guide.contact;$('contact-details').open=false;$('contact-body').replaceChildren();
  if(guide.contact){const c=guide.contact;const phone=el('a',`${c.label}：${c.value}`);phone.href=c.href;const source=DATA.official_library.find(r=>r.id===c.source_id);const a=el('a','查看公开电话来源 ↗');a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';$('contact-body').append(phone,el('p',c.note),a);}
  $('office-status').textContent='';$('office-copy-fallback').hidden=true;
  $('action-evidence').textContent=`入口与联系资料整理：${guide.checked_at} · 适用范围见下方依据。`;
  const showCalendar=active.id==='S10-calendar';$('calendar-section').hidden=!showCalendar;
  $('calendar-items').replaceChildren();
  if(showCalendar)for(const item of DATA.actions.calendar.items){const row=el('div',undefined,'calendar-item');row.append(el('span',item.audience,'calendar-audience'),el('strong',item.label),el('span',item.date,'calendar-date'));$('calendar-items').append(row);}
}
function render(){
  renderNav();$('service-title').textContent=active.title;$('service-category').textContent=active.category;$('service-intro').textContent=active.intro;
  $('basis-note').textContent=active.material_basis==='handbook'?'以下依据所收录学生手册整理，部分流程标注为2024年。请先向所在学院或对应部门确认当前是否沿用，再安排办理。':'此处提供已收录的官方入口和需确认的问题。入口可访问不等于当期材料、资格或期限已经核实。';
  renderActions();renderConditions();const flow=$('workflow');flow.replaceChildren();
  active.workflow.forEach((step,index)=>{const li=el('li');const body=el('div');body.append(el('strong',step.actor),el('span',step.action));li.append(el('span',String(index+1),'step-index'),body);flow.append(li);});
  $('workflow-section').hidden=!active.workflow.length;
  renderMaterials();renderSaved();const gaps=$('gaps');gaps.replaceChildren(...active.gaps.map(t=>el('li',t)));renderSources();$('status').textContent='';$('copy-fallback').hidden=true;
}
async function copyText(text,success,statusId='status',fallbackId='copy-fallback'){
  try{if(!navigator.clipboard)throw Error('unavailable');await navigator.clipboard.writeText(text);$(statusId).textContent=success;$(fallbackId).hidden=true;}
  catch{const box=$(fallbackId);box.value=text;box.hidden=false;box.focus();box.select();$(statusId).textContent='自动复制不可用，请复制上方已选中的内容。';}
}
function question(){
  const current=state();const lines=[`请使用江职通办，帮我了解“${active.title}”。`];
  for(const [key,value] of Object.entries(current.profile))if(value!==undefined)lines.push(`${active.condition_labels[key]||'具体情况'}：${value}。`);
  for(const m of visibleMaterials()){const status=current.materials[m.id];if(status==='have'||status==='missing')lines.push(`${status==='have'?'我已备有':'我尚未备有'}：${m.label}。`);}
  lines.push('请先核对原文和当前适用性，再说明下一步、需要补充或确认的材料，并给出来源；没有提到的材料请保留为未知。');return lines.join('\n');
}
$('search').addEventListener('input',renderNav);
$('reset').onclick=()=>{states.delete(active.id);const previous=savedItems.get(active.id);savedItems.delete(active.id);const cleared=writeSaved();if(cleared)saveFailures.delete(active.id);else{if(previous)savedItems.set(active.id,previous);saveFailures.add(active.id);}renderConditions();renderMaterials();renderSaved();$('status').textContent=cleared?'本事项的选择和本机保存已重置。':'页面选择已重置，但本机保存未能清除；刷新后旧选择可能恢复。';};
$('share').onclick=()=>copyText(`${location.origin}${location.pathname}#${active.id}`,'事项链接已复制，不包含你的材料选择。');
$('copy-question').onclick=()=>copyText(question(),'咨询问题已复制，可回到 TeleAgent 中发送。');
$('copy-office-question').onclick=()=>copyText(DATA.actions.services[active.id].question,'询问话术已复制，可发送给负责老师。','office-status','office-copy-fallback');
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();active=DATA.services.find(s=>s.id===link.dataset.service);$('search').value='';history.replaceState(null,'',`#${active.id}`);render();
  $('service-title').focus({preventScroll:true});$('service-detail').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
}));
function followServiceHash(){const service=DATA.services.find(s=>s.id===location.hash.slice(1));if(!service)return;active=service;$('search').value='';render();$('service-title').focus({preventScroll:true});$('service-detail').scrollIntoView({behavior:'instant'});}
window.addEventListener('hashchange',followServiceHash);
const levelNames={official_body:'正文已收录',official_entry:'入口或附件目录',official_image_excerpt:'原图摘录'};
$('official-count').textContent=`${DATA.official_library.length}条官网资料 · 来源可追溯`;
for(const record of DATA.official_library){
 const item=el('div',undefined,'library-record');const a=el('a',record.title+' ↗');a.href=record.url;a.target='_blank';a.rel='noopener noreferrer';item.append(el('span',levelNames[record.level],'source-kind'),a,el('p',`${record.publisher} · ${record.published_at||'未标发布日期'}${record.document_date?` · 正文落款 ${record.document_date}`:''} · 读取 ${record.checked_at}`,'source-meta'),el('p',record.scope,'source-meta'));$('official-library').append(item);
}
restoreSaved();
render();
if(DATA.services.some(s=>s.id===location.hash.slice(1)))requestAnimationFrame(followServiceHash);

function selectService(id){const s=DATA.services.find(s=>s.id===id);if(!s)return;active=s;$('search').value='';history.replaceState(null,'',`#${id}`);render();$('service-title').focus({preventScroll:true});$('service-detail').scrollIntoView({behavior:'instant'});}
function restoreSaved(){
 try{const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return;const data=JSON.parse(raw);if(data.version!==1||!Array.isArray(data.items))throw Error('version');
  for(const [id,entry] of data.items){const service=DATA.services.find(s=>s.id===id);if(!service||!entry||typeof entry!=='object')continue;const clean={profile:{},materials:{}};
   for(const [key,options] of Object.entries(service.profile_options||{}))if(options.includes(entry.profile?.[key]))clean.profile[key]=entry.profile[key];
   for(const material of service.materials)if(['have','missing','unknown'].includes(entry.materials?.[material.id]))clean.materials[material.id]=entry.materials[material.id];
   states.set(id,clean);savedItems.set(id,{profile:{...clean.profile},materials:{...clean.materials},updated:typeof entry.updated==='string'?entry.updated:''});
  }
 }catch{restoreNotice='旧保存无法读取，未恢复；重新保存本项可建立新记录。';}
}
function writeSaved(){try{if(savedItems.size)localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,items:[...savedItems]}));else localStorage.removeItem(STORAGE_KEY);return true;}catch{$('save-status').textContent='此浏览器无法保存，请下载清单留存。';return false;}}
function renderSaved(){const saved=savedItems.get(active.id);$('remove-checklist').hidden=!saved;$('save-checklist').textContent=saved?'更新本机保存':'保存本项到本机';$('save-status').textContent=saveFailures.has(active.id)?'最近修改无法保存，请下载清单留存；刷新可能恢复旧选择。':saved?`本机已保存 · ${saved.updated}。修改本项会同步保存，请办理前重新核对。`:restoreNotice;}
function persistSaved(){if(!savedItems.has(active.id))return;const previous=savedItems.get(active.id);savedItems.set(active.id,{profile:{...state().profile},materials:{...state().materials},updated:new Date().toLocaleString('zh-CN')});if(writeSaved())saveFailures.delete(active.id);else{savedItems.set(active.id,previous);saveFailures.add(active.id);}renderSaved();}
$('save-checklist').onclick=()=>{const previous=savedItems.get(active.id);savedItems.set(active.id,{profile:{...state().profile},materials:{...state().materials},updated:new Date().toLocaleString('zh-CN')});if(writeSaved()){restoreNotice='';saveFailures.delete(active.id);}else{if(previous)savedItems.set(active.id,previous);else savedItems.delete(active.id);saveFailures.add(active.id);}renderSaved();};
$('remove-checklist').onclick=()=>{const previous=savedItems.get(active.id);savedItems.delete(active.id);if(writeSaved()){saveFailures.delete(active.id);renderSaved();$('save-status').textContent='已删除本机保存；当前页面选择仍保留。';}else{savedItems.set(active.id,previous);saveFailures.add(active.id);$('save-status').textContent='本机保存未能删除，请检查浏览器存储权限后重试。';}};
function checklist(){
 const lines=[`江职通办 · ${active.title}`,`整理时间：${new Date().toLocaleString('zh-CN')}`,'学生服务作品，非学校官方办事系统。','',`下一步：${DATA.actions.services[active.id].first}`];
 for(const [key,value] of Object.entries(state().profile))if(value!==undefined)lines.push(`${active.condition_labels[key]||'具体情况'}：${value}`);
 lines.push('','材料对照（不代表当前材料已齐全）：');
 for(const m of active.materials){if(m.when&&state().profile[m.when.field]===undefined){lines.push(`[待判断适用] ${m.label}`);continue;}if(m.when&&state().profile[m.when.field]!==m.when.equals)continue;lines.push(`[${{have:'已备有',missing:'尚未备有',unknown:'未说明'}[state().materials[m.id]||'unknown']}] ${m.label}`);}
 if(!active.materials.length)lines.push('现有资料不足以列出完整清单，请向对应部门确认。');
 lines.push('','办理前确认：',...active.gaps.map(t=>'• '+t),'','依据：');
 for(const s of active.sources)lines.push(s.title+(s.pdf_page?`（印刷第${s.printed_page}页 / PDF第${s.pdf_page}页）`:''),s.url||'',s.limitation||'');
 lines.push('',`事项链接：${location.origin}${location.pathname}#${active.id}`,'手册和历史通知不等于当前受理要求；本清单不上传、不提交申请。');return lines.join('\n');
}
$('download-checklist').onclick=()=>{const url=URL.createObjectURL(new Blob(['\ufeff'+checklist()],{type:'text/plain;charset=utf-8'}));const a=el('a');a.href=url;a.download=`江职通办-${active.title}-办事清单.txt`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),15000);$('save-status').textContent='已发起下载，请查看浏览器下载记录。';};
