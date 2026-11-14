/* No remote APIs, account data, persistence, or application submission. */
'use strict';
const DATA=window.CAMPUS_DATA;
const $=id=>document.getElementById(id);
const states=new Map();
let active=DATA.services.find(s=>s.id===location.hash.slice(1))||DATA.services[0];
const el=(tag,text,className)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;};
function state(){if(!states.has(active.id))states.set(active.id,{profile:{},materials:{}});return states.get(active.id);}
function renderNav(){
  const query=$('search').value.trim().toLowerCase();
  const list=$('service-list');list.replaceChildren();let group='';let count=0;
  for(const s of DATA.services){
    if(query&&!`${s.title} ${s.keywords} ${s.category}`.toLowerCase().includes(query))continue;
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
    select.onchange=()=>{const current=state();current.profile[key]=select.value===''?undefined:options[Number(select.value)];current.materials={};renderMaterials();};
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
    select.value=current.materials[m.id]||'unknown';select.onchange=()=>{current.materials[m.id]=select.value;renderResult();};row.append(select);list.append(row);
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
    if(source.excerpt_verified&&source.excerpt){const details=el('details');details.append(el('summary','查看所收录摘录'),el('blockquote',source.excerpt));item.append(details);}
    item.append(el('p',source.limitation,'source-meta'));box.append(item);
  }
}
function render(){
  renderNav();$('service-title').textContent=active.title;$('service-category').textContent=active.category;$('service-intro').textContent=active.intro;
  $('basis-note').textContent=active.material_basis==='handbook'?'以下依据所收录学生手册整理，部分流程标注为2024年。请先向所在学院或对应部门确认当前是否沿用，再安排办理。':'此处提供已收录的官方入口和需确认的问题。入口可访问不等于当期材料、资格或期限已经核实。';
  renderConditions();const flow=$('workflow');flow.replaceChildren();
  active.workflow.forEach((step,index)=>{const li=el('li');const body=el('div');body.append(el('strong',step.actor),el('span',step.action));li.append(el('span',String(index+1),'step-index'),body);flow.append(li);});
  $('workflow-section').hidden=!active.workflow.length;
  renderMaterials();const gaps=$('gaps');gaps.replaceChildren(...active.gaps.map(t=>el('li',t)));renderSources();$('status').textContent='';$('copy-fallback').hidden=true;
}
async function copyText(text,success){
  try{if(!navigator.clipboard)throw Error('unavailable');await navigator.clipboard.writeText(text);$('status').textContent=success;$('copy-fallback').hidden=true;}
  catch{const box=$('copy-fallback');box.value=text;box.hidden=false;box.focus();box.select();$('status').textContent='自动复制不可用，请复制上方已选中的内容。';}
}
function question(){
  const current=state();const lines=[`请使用江职通办，帮我了解“${active.title}”。`];
  for(const [key,value] of Object.entries(current.profile))if(value!==undefined)lines.push(`${active.condition_labels[key]||'具体情况'}：${value}。`);
  for(const m of visibleMaterials()){const status=current.materials[m.id];if(status==='have'||status==='missing')lines.push(`${status==='have'?'我已备有':'我尚未备有'}：${m.label}。`);}
  lines.push('请先核对原文和当前适用性，再说明下一步、需要补充或确认的材料，并给出来源；没有提到的材料请保留为未知。');return lines.join('\n');
}
$('search').addEventListener('input',renderNav);
$('reset').onclick=()=>{states.delete(active.id);renderConditions();renderMaterials();$('status').textContent='本事项的选择已重置。';};
$('share').onclick=()=>copyText(`${location.origin}${location.pathname}#${active.id}`,'事项链接已复制，不包含你的材料选择。');
$('copy-question').onclick=()=>copyText(question(),'咨询问题已复制，可回到 TeleAgent 中发送。');
window.addEventListener('hashchange',()=>{active=DATA.services.find(s=>s.id===location.hash.slice(1))||DATA.services[0];render();});
const levelNames={official_body:'正文已收录',official_entry:'入口或附件目录',official_image_excerpt:'校历原图摘录'};
$('official-count').textContent=`${DATA.official_library.length}条官网资料 · 来源可追溯`;
for(const record of DATA.official_library){
 const item=el('div',undefined,'library-record');const a=el('a',record.title+' ↗');a.href=record.url;a.target='_blank';a.rel='noopener noreferrer';item.append(el('span',levelNames[record.level],'source-kind'),a,el('p',`${record.publisher} · ${record.published_at||'未标发布日期'}${record.document_date?` · 正文落款 ${record.document_date}`:''}`,'source-meta'),el('p',record.scope,'source-meta'));$('official-library').append(item);
}
render();
