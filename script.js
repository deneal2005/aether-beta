const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal:not(.hero .reveal)').forEach((element) => {
    element.classList.add('revealing');
    revealObserver.observe(element);
  });
}

const billingSwitch = document.querySelector('.switch');
const prices = document.querySelectorAll('.price b');

billingSwitch.addEventListener('click', () => {
  const yearly = billingSwitch.getAttribute('aria-checked') !== 'true';
  billingSwitch.setAttribute('aria-checked', String(yearly));
  document.querySelector('.selected-label').classList.toggle('selected-label', !yearly);
  document.querySelector('.billing-toggle > span:last-child').classList.toggle('selected-label', yearly);
  prices.forEach((price) => {
    price.textContent = `$${price.dataset[yearly ? 'year' : 'month']}`;
  });
});

const calendar = document.querySelector('.calendar-grid');
for (let day = 1; day <= 28; day += 1) {
  const cell = document.createElement('span');
  cell.textContent = day;
  if ([2, 4, 7, 9, 11, 14, 16, 18, 21, 23, 25, 28].includes(day)) cell.className = 'post-day';
  calendar.append(cell);
}

const newsTrack = document.querySelector('.news-track');
let newsIndex = 0;
document.querySelectorAll('[data-news]').forEach((button) => button.addEventListener('click', () => {
  const visible = window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 3 : 4;
  newsIndex = Math.max(0, Math.min(newsTrack.children.length - visible, newsIndex + (button.dataset.news === 'next' ? 1 : -1)));
  const step = newsTrack.children[0].getBoundingClientRect().width + 14;
  newsTrack.style.transform = `translateX(${-newsIndex * step}px)`;
}));

const quoteTrack = document.querySelector('.quote-track');
[...quoteTrack.children].forEach((card) => {
  const duplicate = card.cloneNode(true);
  duplicate.setAttribute('aria-hidden', 'true');
  quoteTrack.append(duplicate);
});
document.querySelectorAll('[data-quote]').forEach((button) => button.addEventListener('click', () => {
  const step = quoteTrack.children[0].getBoundingClientRect().width + 13;
  const direction = button.dataset.quote === 'next' ? 1 : -1;
  const current = Number(quoteTrack.dataset.offset || 0);
  const max = Math.max(0, quoteTrack.scrollWidth / 2 - quoteTrack.parentElement.clientWidth);
  const next = Math.max(0, Math.min(max, current + direction * step));
  quoteTrack.dataset.offset = String(next);
  quoteTrack.style.animation = 'none';
  quoteTrack.style.transform = `translateX(${-next}px)`;
}));
