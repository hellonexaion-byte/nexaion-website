/* NEXAION NAV CTA V6.1 */
(function(){
  function update(){
    document.querySelectorAll('header a, header button, nav a, nav button')
      .forEach(el => {
        if (/request audit/i.test(el.textContent || '')) {
          el.classList.add('nxa-primary-cta');
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', update);
  } else {
    update();
  }

  new MutationObserver(update).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
