/* NEXAION CINEMATIC V5 — layout fix, source text and routes preserved */
(function(){
 'use strict';
 document.documentElement.classList.add('nxa-cinematic');
 let done=false;
 function apply(){
  const heading=[...document.querySelectorAll('h1')].find(x=>x.textContent.includes('Architecting transparency'));
  if(!heading)return false;
  const hero=heading.closest('section')||heading.parentElement.parentElement;
  if(!hero)return false;
  hero.classList.add('nxa-cinematic-hero');
  // Revert decorative DOM insertion from older local passes.
  document.querySelectorAll('.nxa-ribbon-art').forEach(el=>el.remove());
  let brand=[...document.querySelectorAll('a')].find(a=>a.textContent.trim().toLowerCase()==='nexaion'||a.querySelector('.nxa-brand-img'));
  if(brand){
   const nav=brand.closest('header')||brand.closest('nav');if(nav)nav.classList.add('nxa-site-nav');
   let img=brand.querySelector('.nxa-brand-img');
   if(!img){img=document.createElement('img');img.className='nxa-brand-img';img.alt='NEXAION';brand.replaceChildren(img);}
   img.src='/assets/nexaion-exact-reference-header.png';
  }
  document.querySelectorAll('a,button').forEach(el=>{
   const t=el.textContent.trim();
   if(t.includes('Launch Forensic Supply Path Terminal')||t.includes('REQUEST AUDIT'))el.classList.add('nxa-primary-cta');
   if(t.includes('Request Institutional Access'))el.classList.add('nxa-secondary-cta');
  });
  if(!done){
   done=true;
   // Place heading at the original reference's upper hero position (roughly 60px below navigation).
   requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const nav=brand?.closest('header')||document.querySelector('header');
    const navBottom=nav?.getBoundingClientRect().bottom||120;
    const desiredTop=navBottom+72;
    const actualTop=heading.getBoundingClientRect().top;
    const lift=Math.max(0,Math.min(520,Math.round(actualTop-desiredTop)));
    if(lift>65){
     const originalMargin=parseFloat(getComputedStyle(hero).marginTop)||0;
     hero.style.setProperty('margin-top', (originalMargin-lift)+'px','important');
     document.documentElement.dataset.nxaHeroLift=String(lift);
    }
    console.log('NexAion V5 hero placement:',{actualTop,desiredTop,lift});
   }));
  }
  return true;
 }
 function boot(){if(apply())return;const ob=new MutationObserver(()=>{if(apply())ob.disconnect()});ob.observe(document.body,{subtree:true,childList:true});setTimeout(()=>ob.disconnect(),12000);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
