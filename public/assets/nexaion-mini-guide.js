/* NexAion local guide; no external requests or fabricated AI */
(()=>{'use strict';
 const DEST=[['Intelligence Terminal',/Programmatic supply chain forensic audit/i],['Supply path topology',/Supply Path Optimization.*Hop Topology/i],['Technology pillars',/Four pillars of digital advertising intelligence/i],['Intelligence dashboard',/The programmatic intelligence dashboard/i],['Revenue impact model',/Quantify your programmatic revenue leakage/i],['Threat matrix',/Supply Chain Vulnerabilities/i],['Standards',/IAB Tech Lab.*OpenRTB Protocol Compatibility/i],['About NexAion',/About Nexaion: The intelligence layer/i],['Pricing',/Predictable SaaS Pricing/i]];
 function init(){if(document.getElementById('nxa9-assistant'))return;
  const headings=[...document.querySelectorAll('h1,h2,h3,h4')];if(!headings.some(h=>/Architecting transparency/i.test(h.textContent)))return;
  const root=document.createElement('div');root.id='nxa9-assistant';
  const launch=document.createElement('button');launch.type='button';launch.className='nxa9-launch';launch.setAttribute('aria-label','Open NexAion website guide');launch.setAttribute('aria-expanded','false');
  const img=document.createElement('img');img.src='/assets/nexaion-mono-robot-v9.png';img.alt='NexAion mini assistant';img.loading='lazy';launch.append(img);
  const dialog=document.createElement('div');dialog.className='nxa9-dialog';dialog.hidden=true;dialog.setAttribute('role','dialog');dialog.setAttribute('aria-label','NexAion website guide');
  const top=document.createElement('div');top.className='nxa9-top';const title=document.createElement('strong');title.textContent='NexAion · Quick guide';const close=document.createElement('button');close.type='button';close.className='nxa9-close';close.textContent='Close ×';top.append(title,close);
  const desc=document.createElement('p');desc.textContent='Explore the NexAion website. This is a navigation guide, not a live AI chat.';
  const links=document.createElement('div');links.className='nxa9-links';
  const hide=()=>{dialog.hidden=true;launch.setAttribute('aria-expanded','false');launch.focus()};
  for(const [label,pattern] of DEST){const btn=document.createElement('button');btn.type='button';btn.textContent=label;btn.addEventListener('click',()=>{const h=[...document.querySelectorAll('h1,h2,h3,h4')].find(h=>pattern.test(h.textContent||''));if(h){h.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});hide()}else desc.textContent='Section unavailable on this page.'});links.append(btn)}
  const foot=document.createElement('div');foot.className='nxa9-foot';foot.textContent='For product support, use the website contact links.';
  dialog.append(top,desc,links,foot);root.append(dialog,launch);document.body.append(root);
  launch.addEventListener('click',()=>{dialog.hidden=!dialog.hidden;launch.setAttribute('aria-expanded',String(!dialog.hidden));if(!dialog.hidden)close.focus()});close.addEventListener('click',hide);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog.hidden)hide()});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
 if(!document.getElementById('nxa9-assistant')){let k=0;const t=setInterval(()=>{init();if(document.getElementById('nxa9-assistant')||++k>=20)clearInterval(t)},300)}
})();