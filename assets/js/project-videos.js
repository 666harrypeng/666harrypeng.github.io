// Keep poster images until a teaser is visible; pause offscreen/background video.
(() => {
  const videos = Array.from(document.querySelectorAll('video.project-teaser'));
  if (!videos.length || !('IntersectionObserver' in window)) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const visible = new Map(videos.map(video => [video, false]));

  function update(video) {
    if (!visible.get(video) || document.hidden || reducedMotion.matches) {
      video.pause();
      return;
    }

    const source = video.querySelector('source[data-src]');
    if (source) {
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
      video.load();
    }
    // A browser may decline autoplay; the poster remains a usable fallback.
    video.play().catch(() => {});
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      visible.set(entry.target, entry.isIntersecting && entry.intersectionRatio >= 0.2);
      update(entry.target);
    });
  }, { threshold: [0, 0.2] });

  videos.forEach(video => observer.observe(video));
  document.addEventListener('visibilitychange', () => videos.forEach(update));
  reducedMotion.addEventListener('change', () => videos.forEach(update));
})();
