// Supplement the template's overflow menu with dismissal and accessible state.
(() => {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const button = nav.querySelector('button');
  const menu = nav.querySelector('.hidden-links');

  function sync() {
    const open = !menu.classList.contains('hidden');
    button.setAttribute('aria-expanded', String(open));
    button.classList.toggle('close', open);
  }

  function close() {
    menu.classList.add('hidden');
    sync();
  }

  // The bundled menu handler runs first and performs the actual toggle.
  button.addEventListener('click', sync);
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target)) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.classList.contains('hidden')) {
      close();
      button.focus();
    }
  });
  window.addEventListener('resize', sync);
  sync();
})();
