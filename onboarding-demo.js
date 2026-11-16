const wizard = document.querySelector('#onboarding-wizard');
if (wizard) {
  const steps = ['first-name-step', 'role-step', 'audience-step', 'goals-step', 'source-step', 'ads-step', 'brand-review-step', 'competitors-step', 'first-posts-step'];
  const note = document.querySelector('#onboarding-note');
  const selected = { role: '', audience: '', goals: [], sources: [], ads: '' };
  let transitionTimer;

  function showStep(id, focusSelector) {
    window.clearTimeout(transitionTimer);
    steps.forEach((stepId) => {
      document.querySelector(`#${stepId}`).hidden = stepId !== id;
    });
    const progressIndex = id === 'first-posts-step' ? 3 : ['brand-review-step', 'competitors-step'].includes(id) ? 1 : 0;
    document.querySelectorAll('.setup-progress li').forEach((item, index) => {
      item.classList.toggle('current', index === progressIndex);
    });
    note.textContent = '';
    wizard.dataset.step = id;
    if (focusSelector) document.querySelector(focusSelector)?.focus();
  }

  function chooseSingle(group, index) {
    const options = [...document.querySelectorAll(`input[name="${group}"]`)];
    const option = options[index];
    if (!option) return;
    options.forEach((item) => { item.checked = false; });
    option.checked = true;
    options.forEach((item) => item.closest('.choice-card').classList.toggle('selected', item.checked));
    selected[group] = option.value;
    const nextStep = group === 'role' ? 'audience-step' : 'goals-step';
    transitionTimer = window.setTimeout(() => showStep(nextStep), 220);
  }

  document.querySelector('#first-name')?.addEventListener('input', (event) => {
    document.querySelector('#continue-name').disabled = event.currentTarget.value.trim().length === 0;
  });
  document.querySelector('#first-name-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    showStep('role-step', 'input[name="role"]');
  });

  document.querySelectorAll('input[name="role"]').forEach((input, index) => {
    input.addEventListener('change', () => chooseSingle('role', index));
  });
  document.querySelectorAll('input[name="audience"]').forEach((input, index) => {
    input.addEventListener('change', () => chooseSingle('audience', index));
  });

  const goalInputs = [...document.querySelectorAll('input[name="goal"]')];
  function updateGoals(input) {
    const picked = goalInputs.filter((item) => item.checked);
    if (picked.length > 3) input.checked = false;
    selected.goals = goalInputs.filter((item) => item.checked).map((item) => item.value);
    document.querySelector('#continue-goals').disabled = selected.goals.length === 0;
    document.querySelectorAll('.goals-grid .choice-card').forEach((card) => {
      const goal = card.querySelector('input');
      card.classList.toggle('selected', goal.checked);
      card.classList.toggle('main-goal', selected.goals[0] === goal.value && goal.checked);
    });
    document.querySelector('#goals-help').textContent = selected.goals.length
      ? 'Type a number to add or drop one, Enter to send'
      : 'You can also type a number to pick';
  }
  goalInputs.forEach((input) => input.addEventListener('change', () => updateGoals(input)));
  document.querySelector('#continue-goals')?.addEventListener('click', () => {
    showStep('source-step', 'input[name="source"]');
  });
  document.querySelector('#back-to-role')?.addEventListener('click', () => showStep('role-step', 'input[name="role"]'));
  document.querySelector('#back-to-audience')?.addEventListener('click', () => showStep('audience-step', 'input[name="audience"]'));

  const sourceInputs = [...document.querySelectorAll('input[name="source"]')];
  function updateSources() {
    selected.sources = sourceInputs.filter((item) => item.checked).map((item) => item.value);
    sourceInputs.forEach((item) => item.closest('.choice-card').classList.toggle('selected', item.checked));
    document.querySelector('#continue-source').disabled = selected.sources.length === 0;
    document.querySelector('#source-help').textContent = selected.sources.length
      ? 'Type a number to add or drop one, Enter to send'
      : 'You can also type a number to pick';
  }
  sourceInputs.forEach((input) => input.addEventListener('change', updateSources));
  document.querySelector('#continue-source')?.addEventListener('click', () => {
    showStep('ads-step', 'input[name="ads"]');
  });
  document.querySelector('#back-to-goals')?.addEventListener('click', () => showStep('goals-step', 'input[name="goal"]'));

  const adsInputs = [...document.querySelectorAll('input[name="ads"]')];
  adsInputs.forEach((input) => input.addEventListener('change', () => {
    adsInputs.forEach((item) => {
      item.checked = item === input;
      item.closest('.choice-card').classList.toggle('selected', item.checked);
    });
    selected.ads = input.value;
    transitionTimer = window.setTimeout(() => showStep('brand-review-step'), 220);
  }));
  document.querySelector('#back-to-source')?.addEventListener('click', () => showStep('source-step', 'input[name="source"]'));

  const reviewStep = document.querySelector('#brand-review-step');
  const editButtons = [...reviewStep.querySelectorAll('[data-edit]')];
  function closeEditors() {
    reviewStep.querySelectorAll('.inline-editor[data-editor]').forEach((form) => {
      form.hidden = true;
      form.closest('.review-card').classList.remove('editing');
      form.reset();
    });
    editButtons.forEach((button) => { button.disabled = false; });
  }
  editButtons.forEach((button) => button.addEventListener('click', () => {
    closeEditors();
    const form = reviewStep.querySelector(`[data-editor="${button.dataset.edit}"]`);
    form.hidden = false;
    form.closest('.review-card').classList.add('editing');
    editButtons.forEach((item) => { item.disabled = true; });
  }));
  reviewStep.querySelectorAll('.inline-editor[data-editor]').forEach((form) => {
    form.querySelector('[data-cancel-editor]')?.addEventListener('click', closeEditors);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      if (form.dataset.editor === 'brand') document.querySelector('#review-brand-name').textContent = data.get('brand-name');
      if (form.dataset.editor === 'positioning') document.querySelector('#review-positioning').textContent = data.get('positioning');
      if (form.dataset.editor === 'buyers') {
        const audience = data.get('buyer-type');
        document.querySelector('.buyer-summary').textContent = audience === 'Both'
          ? 'Sold to shoppers and businesses'
          : `Sold to ${audience.toLowerCase()}`;
      }
      closeEditors();
    });
  });
  document.querySelector('#continue-brand-review')?.addEventListener('click', () => showStep('competitors-step'));
  document.querySelector('#back-to-ads')?.addEventListener('click', () => showStep('ads-step'));

  const addProductForm = document.querySelector('#add-product-form');
  const addProductName = addProductForm.querySelector('[name="product-name"]');
  const addProductButton = addProductForm.querySelector('button[type="submit"]');
  const productCards = document.querySelector('#product-cards');
  function updateProductCount() {
    document.querySelector('#product-count').textContent = String(productCards.querySelectorAll('.product-card').length);
  }
  function createProductCard(name) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.product = name;
    const image = document.createElement('div');
    image.className = 'product-image-placeholder';
    image.setAttribute('aria-hidden', 'true');
    image.textContent = '↗';
    const copy = document.createElement('div');
    copy.className = 'product-copy';
    const title = document.createElement('b');
    title.textContent = name;
    const price = document.createElement('strong');
    price.textContent = 'No price listed';
    const description = document.createElement('p');
    description.textContent = '';
    const setPrice = document.createElement('button');
    setPrice.type = 'button';
    setPrice.textContent = 'Set price';
    setPrice.addEventListener('click', () => openPriceForm(card, false));
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove-product';
    remove.textContent = `Remove ${name}, not relevant`;
    remove.addEventListener('click', () => {
      if (window.confirm(`Remove ${name} from this local preview?`)) {
        card.remove();
        updateProductCount();
      }
    });
    copy.append(title, price, description, setPrice, remove);
    card.append(image, copy);
    productCards.append(card);
  }
  document.querySelector('#add-product-toggle')?.addEventListener('click', () => {
    addProductForm.hidden = false;
    addProductName.focus();
  });
  addProductForm.querySelector('[name="product-name"]').addEventListener('input', () => {
    addProductButton.disabled = addProductName.value.trim().length === 0;
  });
  addProductForm.querySelector('#add-demo-video')?.addEventListener('click', (event) => {
    const input = addProductForm.querySelector('[name="demo-video"]');
    input.hidden = false;
    input.focus();
    event.currentTarget.hidden = true;
  });
  document.querySelector('#cancel-add-product')?.addEventListener('click', () => {
    addProductForm.reset();
    addProductButton.disabled = true;
    addProductForm.hidden = true;
  });
  addProductForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!addProductForm.reportValidity()) return;
    createProductCard(addProductName.value.trim());
    addProductForm.reset();
    addProductButton.disabled = true;
    addProductForm.hidden = true;
    updateProductCount();
  });

  const priceForm = document.querySelector('#price-form');
  let priceCard;
  function openPriceForm(card, hasPrice) {
    priceCard = card;
    priceForm.hidden = false;
    priceForm.elements.amount.value = hasPrice ? '299' : '';
    priceForm.elements.currency.value = 'INR';
    priceForm.elements.basis.value = hasPrice ? 'Per month' : 'None';
    priceForm.elements['starting-price'].checked = hasPrice;
    priceForm.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  reviewStep.querySelectorAll('[data-price-product]').forEach((button) => {
    button.addEventListener('click', () => openPriceForm(button.closest('.product-card'), button.dataset.priceProduct === 'Rent Mate'));
  });
  document.querySelector('#cancel-price')?.addEventListener('click', () => { priceForm.hidden = true; });
  priceForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!priceForm.reportValidity() || !priceCard) return;
    const amount = priceForm.elements.amount.value;
    const basis = priceForm.elements.basis.value;
    const starting = priceForm.elements['starting-price'].checked ? 'From ' : '';
    priceCard.querySelector('.product-copy strong').textContent = `${starting}${priceForm.elements.currency.value} ${amount}${basis === 'None' ? '' : ` / ${basis.toLowerCase().replace('per ', '')}`}`;
    priceCard.querySelector('[data-price-product],button:not(.remove-product)').textContent = 'Edit price';
    priceForm.hidden = true;
  });
  productCards.querySelectorAll('[data-remove-product]').forEach((button) => button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    if (window.confirm(`Remove ${button.dataset.removeProduct} from this local preview?`)) {
      card.remove();
      updateProductCount();
    }
  }));

  const competitorData = [
    ['Rent a Friend', 'rentafriend.com', 'RA', 'Rent a Friend is a larger, established platonic-companionship marketplace that buyers in India can use to hire company for events, outings, hobbies and conversation.'],
    ['Bumble', 'bumble.com', 'B', 'Bumble is larger, and its friendship offering gives buyers an alternative way to find company for plans without booking a paid companion.'],
    ['Meetup', 'meetup.com', 'M', 'Meetup is larger and offers local groups and activities in India where buyers can find company for shared plans instead of hiring a companion.'],
    ['Kumpanio', 'kumpanio.com', 'K', 'Kumpanio lets people book verified activity buddies in Bengaluru for coffee, meals, movies, events, conferences, city outings, and conversations, the same paid, platonic in-person companionship job. (2,000+ bookings completed)'],
    ['QuickPartner', 'quickpartner.in', 'QP', 'QuickPartner is an India-wide marketplace for KYC- and background-verified companions, enabling profile selection, secure booking, payment, and reviews for event, travel, shopping, and conversation support.'],
    ['MeetReal', 'meetreal.in', 'ME', 'MeetReal directly offers ID-verified, platonic companions across India for dinner dates, social events, gym workouts, shopping, travel, and conversations, with hourly rates and booking payments. (1,000+ companions across India)'],
    ['LetMeBuddy', 'letmebuddy.com', 'L', 'LetMeBuddy offers photo-verified buddy profiles in India that customers can discover, chat with, and book for coffee catch-ups, city walks, events, shopping, fitness, networking, and platonic companionship.'],
    ['HireApartner', 'hireapartner.in', 'HA', 'HireApartner offers verified adult companions across India for movies, coffee, dinner, shopping, events and city outings.'],
    ['RentalFriend', 'rentalfriend.in', 'RE', 'RentalFriend offers verified, safety-focused platonic companionship for dinners, events, travel and conversation, closely matching Rent Mate’s purchase.'],
    ['Hire-a-Friend', 'hire-a-friend.com', 'HF', 'Hire-a-Friend offers verified companions for social activities and conversation with transparent hourly pricing and daytime bookings.'],
    ['Rent Him', 'renthimnow.com', 'RH', 'Rent Him gives women across India a verified-companion alternative for coffee dates, events, travel and quality time.'],
    ['KoPartner', 'kopartner.in', 'KP', 'KoPartner offers verified, consent-first professional companionship in numerous Indian cities, overlapping with buyers seeking safe social company.']
  ];
  const competitorGrid = document.querySelector('#competitor-grid');
  function renderCompetitors() {
    competitorGrid.replaceChildren();
    competitorData.forEach(([name, domain, initials, description], index) => {
      const card = document.createElement('article');
      card.className = 'competitor-card';
      const head = document.createElement('div');
      head.className = 'competitor-head';
      const logo = document.createElement('span');
      logo.className = 'competitor-logo';
      logo.textContent = initials;
      const identity = document.createElement('div');
      const title = document.createElement('b');
      title.textContent = name;
      const url = document.createElement('small');
      url.textContent = domain;
      identity.append(title, url);
      const number = document.createElement('kbd');
      number.textContent = index < 9 ? String(index + 1) : index === 9 ? '0' : '';
      const keepLabel = document.createElement('label');
      keepLabel.className = 'keep-competitor';
      const keep = document.createElement('input');
      keep.type = 'checkbox';
      keep.checked = true;
      keep.setAttribute('aria-label', `Keep ${name}`);
      keep.addEventListener('change', updateCompetitorCount);
      keepLabel.append(keep);
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = '×';
      remove.setAttribute('aria-label', `Remove ${name}`);
      remove.addEventListener('click', () => {
        if (window.confirm(`Remove ${name} from this local preview?`)) {
          card.remove();
          updateCompetitorCount();
        }
      });
      head.append(logo, identity, number, keepLabel, remove);
      const copy = document.createElement('p');
      copy.textContent = description;
      card.append(head, copy);
      competitorGrid.append(card);
    });
    updateCompetitorCount();
  }
  function updateCompetitorCount() {
    const kept = competitorGrid.querySelectorAll('.keep-competitor input:checked').length;
    document.querySelector('#competitor-count').textContent = String(kept);
    document.querySelector('#competitor-confirm-count').textContent = String(kept);
    document.querySelector('#add-competitor').disabled = kept >= 12;
  }
  renderCompetitors();
  document.querySelector('#add-competitor')?.addEventListener('click', () => {
    note.textContent = 'Add-competitor entry was not reachable while the live list was at its 12-item limit.';
  });
  document.querySelector('#confirm-competitors')?.addEventListener('click', () => {
    showStep('first-posts-step');
  });
  document.querySelector('#skip-competitors')?.addEventListener('click', () => {
    showStep('first-posts-step');
  });

  const postCards = [...document.querySelectorAll('.first-post-card')];
  const keptPosts = new Set();
  function updateFirstPosts() {
    postCards.forEach((card) => {
      const isKept = keptPosts.has(card.dataset.post);
      card.classList.toggle('kept', isKept);
      card.querySelector('[data-post-action="keep"]').disabled = !isKept && keptPosts.size >= 3;
    });
    document.querySelector('#first-post-count').textContent = String(keptPosts.size);
    document.querySelector('#finish-onboarding').disabled = keptPosts.size === 0;
  }
  document.querySelector('#first-posts-grid')?.addEventListener('click', (event) => {
    const action = event.target.closest('[data-post-action]');
    if (!action) return;
    const card = action.closest('.first-post-card');
    const id = card.dataset.post;
    if (action.dataset.postAction === 'keep') {
      if (keptPosts.has(id)) keptPosts.delete(id);
      else if (keptPosts.size < 3) keptPosts.add(id);
      card.classList.remove('skipped');
    } else {
      keptPosts.delete(id);
      card.classList.add('skipped');
    }
    updateFirstPosts();
  });
  document.querySelector('#finish-onboarding')?.addEventListener('click', () => {
    sessionStorage.setItem('fastlane-demo-posts', JSON.stringify([...keptPosts]));
    sessionStorage.setItem('fastlane-demo-campaign', 'draft');
    window.location.assign('/dashboard.html#home');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (!document.querySelector('#site-details-shade').hidden) closeDetails();
      if (!document.querySelector('#change-site-panel').hidden) closeChangePanel();
      return;
    }
    if (event.target.matches('input, textarea, select') || event.altKey || event.ctrlKey || event.metaKey) return;
    const activeStep = wizard.dataset.step;
    if (activeStep === 'role-step' && /^[1-9]$/.test(event.key)) chooseSingle('role', Number(event.key) - 1);
    if (activeStep === 'audience-step' && /^[1-3]$/.test(event.key)) chooseSingle('audience', Number(event.key) - 1);
    if (activeStep === 'goals-step' && /^[0-9]$/.test(event.key)) {
      const input = goalInputs.find((item) => (item.parentElement.querySelector('kbd')?.textContent || '') === event.key);
      if (input) {
        input.checked = !input.checked;
        updateGoals(input);
      }
    }
    if (activeStep === 'source-step' && /^[0-9]$/.test(event.key)) {
      const input = sourceInputs.find((item) => (item.parentElement.querySelector('kbd')?.textContent || '') === event.key);
      if (input) {
        input.checked = !input.checked;
        updateSources();
      }
    }
    if (activeStep === 'ads-step' && /^[1-2]$/.test(event.key)) {
      const input = adsInputs[Number(event.key) - 1];
      if (input) input.click();
    }
    if (activeStep === 'goals-step' && event.key === 'Enter' && !document.querySelector('#continue-goals').disabled) {
      document.querySelector('#continue-goals').click();
    }
    if (activeStep === 'source-step' && event.key === 'Enter' && !document.querySelector('#continue-source').disabled) {
      document.querySelector('#continue-source').click();
    }
  });

  const detailsShade = document.querySelector('#site-details-shade');
  function closeDetails() {
    detailsShade.hidden = true;
    document.querySelector('#site-details').focus();
  }
  document.querySelector('#site-details')?.addEventListener('click', () => {
    detailsShade.hidden = false;
    document.querySelector('#close-site-details').focus();
  });
  document.querySelector('#close-site-details')?.addEventListener('click', closeDetails);
  detailsShade?.addEventListener('click', (event) => {
    if (event.target === detailsShade) closeDetails();
  });

  const changePanel = document.querySelector('#change-site-panel');
  function closeChangePanel() {
    changePanel.hidden = true;
    document.querySelector('#change-site').focus();
  }
  document.querySelector('#change-site')?.addEventListener('click', () => {
    changePanel.hidden = false;
    document.querySelector('#change-site-input').focus();
  });
  document.querySelector('#cancel-change-site')?.addEventListener('click', closeChangePanel);
  document.querySelector('#change-site-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    closeChangePanel();
    note.textContent = 'This local preview cannot scan an external website.';
  });
}
