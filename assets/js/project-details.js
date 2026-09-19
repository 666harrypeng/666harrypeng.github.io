// Use the existing scroll plugin, with clearance for the sticky site header.
jQuery(function ($) {
  const links = $('.toc-inline a');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function configureContents() {
    links.smoothScroll({
      offset: -($('.masthead').outerHeight() || 0) - 12,
      speed: reducedMotion.matches ? 0 : 400,
    });
  }

  configureContents();
  window.addEventListener('resize', configureContents);
  reducedMotion.addEventListener('change', configureContents);

  const title = $('.project-detail .page__title').text().trim();
  $('.project-detail iframe').each(function (index) {
    if (!this.title) this.title = `${title} — video ${index + 1}`;
  });
});
