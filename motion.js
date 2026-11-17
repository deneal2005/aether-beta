(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const app = document.querySelector('#app-content');
  const animatedValues = new Map();
  const countFrames = new WeakMap();
  const pendingCounts = new WeakMap();
  const observedNumbers = new Set();
  const numberPattern = /^(\D*?)(-?\d[\d,]*(?:\.\d+)?)(\D*)$/;
  let navigationExit = null;

  document.documentElement.classList.add('motion-ready');

  const numberObserver = !reducedMotion.matches && 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        numberObserver.unobserve(entry.target);
        observedNumbers.delete(entry.target);
        const pending = pendingCounts.get(entry.target);
        if (pending) animateNumber(entry.target, ...pending);
      });
    }, { threshold: 0.2 })
    : null;

  function numberParts(text) {
    const match = text.match(numberPattern);
    if (!match) return null;
    const value = Number(match[2].replaceAll(',', ''));
    if (!Number.isFinite(value)) return null;
    return {
      prefix: match[1],
      value,
      suffix: match[3],
      decimals: (match[2].split('.')[1] || '').length
    };
  }

  function formatNumber(value, decimals) {
    const fixed = value.toFixed(decimals);
    const [integer, fraction] = fixed.split('.');
    const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return fraction ? `${grouped}.${fraction}` : grouped;
  }

  function animateNumber(element, key, target, start, parts) {
    const textNode = element.firstChild;
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE || element.childNodes.length !== 1) return;
    if (reducedMotion.matches) {
      textNode.nodeValue = `${parts.prefix}${formatNumber(target, parts.decimals)}${parts.suffix}`;
      return;
    }

    const oldFrame = countFrames.get(element);
    if (oldFrame) cancelAnimationFrame(oldFrame);

    const startedAt = performance.now();
    const duration = 720;
    const draw = (now) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - ((1 - progress) ** 3);
      const current = start + (target - start) * eased;
      textNode.nodeValue = `${parts.prefix}${formatNumber(current, parts.decimals)}${parts.suffix}`;
      if (progress < 1 && !reducedMotion.matches) {
        countFrames.set(element, requestAnimationFrame(draw));
        return;
      }
      textNode.nodeValue = `${parts.prefix}${formatNumber(target, parts.decimals)}${parts.suffix}`;
      countFrames.delete(element);
      animatedValues.set(key, { text: element.textContent.trim(), value: target });
    };
    countFrames.set(element, requestAnimationFrame(draw));
  }

  function animateNumbers(container, view, initial = false) {
    observedNumbers.forEach((element) => {
      if (element.isConnected) return;
      numberObserver?.unobserve(element);
      pendingCounts.delete(element);
      observedNumbers.delete(element);
    });
    const targets = container.querySelectorAll('.metric-card > b, .stat-grid > div > b');
    targets.forEach((element, index) => {
      const text = element.textContent.trim();
      const parts = numberParts(text);
      if (!parts) return;

      const cardLabel = element.closest('.metric-card')?.querySelector('small')?.textContent.trim()
        || element.closest('.stat-grid > div')?.querySelector('small')?.textContent.trim()
        || '';
      const key = `${view}:${cardLabel}:${index}`;
      const previous = animatedValues.get(key);
      if (previous?.text === text) return;

      const start = initial || !previous ? 0 : previous.value;
      animatedValues.set(key, { text, value: parts.value });
      if (!reducedMotion.matches && element.firstChild?.nodeType === Node.TEXT_NODE && element.childNodes.length === 1) {
        const animation = [key, parts.value, start, parts];
        if (numberObserver) {
          pendingCounts.set(element, animation);
          observedNumbers.add(element);
          numberObserver.observe(element);
        } else {
          animateNumber(element, ...animation);
        }
      }
    });
  }

  function enterWorkspaceView(view, animate = true) {
    if (!app) return;
    if (animate && !reducedMotion.matches) {
      app.classList.remove('motion-route-enter');
      requestAnimationFrame(() => app.classList.add('motion-route-enter'));
    }
    animateNumbers(app, `workspace:${view}`);
  }

  if (app) {
    let activeView = location.hash.slice(1) || 'home';
    document.addEventListener('fastlane:workspace-render', (event) => {
      const view = event.detail?.view || location.hash.slice(1) || 'home';
      const changedView = view !== activeView;
      activeView = view;
      const fallbackTransition = changedView && !event.detail?.nativeTransition;
      enterWorkspaceView(view, fallbackTransition || Boolean(event.detail?.transition));
    });
    enterWorkspaceView(activeView, true);
  }

  if (!app) animateNumbers(document, 'marketing', true);

  document.addEventListener('click', (event) => {
    if (reducedMotion.matches || event.defaultPrevented || event.button !== 0
      || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.target || link.hasAttribute('download') || typeof document.body.animate !== 'function') return;
    const destination = new URL(link.href, location.href);
    if (destination.origin !== location.origin || destination.pathname === location.pathname) return;

    event.preventDefault();
    navigationExit?.cancel();
    navigationExit = document.body.animate([
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' }
    ], { duration: 110, easing: 'ease-in' });
    navigationExit.onfinish = () => location.assign(destination.href);
  });

  let swipeStart = null;
  document.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch') return;
    const drawer = event.target.closest('.drawer-panel');
    if (!drawer) return;
    swipeStart = { x: event.clientX, y: event.clientY, pointerId: event.pointerId };
  });
  document.addEventListener('pointerup', (event) => {
    if (!swipeStart || event.pointerId !== swipeStart.pointerId) return;
    const deltaX = event.clientX - swipeStart.x;
    const deltaY = Math.abs(event.clientY - swipeStart.y);
    if (deltaX > 84 && deltaX > deltaY * 1.35) {
      document.dispatchEvent(new CustomEvent('fastlane:close-drawer'));
    }
    swipeStart = null;
  });
  document.addEventListener('pointercancel', () => { swipeStart = null; });
})();
