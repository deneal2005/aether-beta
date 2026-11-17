(() => {
  const app = document.querySelector('#app-content');
  if (!app) return;

  const overlay = document.querySelector('#fl-overlay');
  const dialogContent = document.querySelector('#dialog-content');
  const toast = document.querySelector('#fl-toast');
  const state = {
    view: location.hash.slice(1) || 'home',
    studioTab: 'overview',
    brandTab: 'profile',
    settingsTab: 'Account',
    campaignMode: 'review',
    campaignGoal: 'Fill more pay-per-meet companionship bookings from people seeking company.',
    campaignPost: 4,
    plannerStep: 0,
    plannerWeeks: 4,
    plannerPace: '1 a day',
    plannerRun: 'Organic posts',
    plannerFormats: ['Slideshow','Wall of text','Green screen','Video hook'],
    plannerAngles: ['Set Your Own Terms','Choose Each Booking','Get Secure Payouts','Offer What You Do','Build A Trusted Profile','Work Around Your Schedule'],
    plannerCampaigns: [],
    analyticsMode: 'organic',
    calendarMonth: new Date(2026, 10, 1),
    libraryFilter: 'All',
    studioKind: 'Video',
    studioSearch: '',
    studioFilter: 'All',
    radarFilter: 'All',
    radarSearch: '',
    settingsSection: 'You'
  };

  const competitors = [
    ['Rent a Friend', 'rentafriend.com', 'RA'], ['Bumble', 'bumble.com', 'B'], ['Meetup', 'meetup.com', 'M'],
    ['Kumpanio', 'kumpanio.com', 'K'], ['QuickPartner', 'quickpartner.in', 'QP'], ['MeetReal', 'meetreal.in', 'ME'],
    ['LetMeBuddy', 'letmebuddy.com', 'L'], ['HireApartner', 'hireapartner.in', 'HA'], ['RentalFriend', 'rentalfriend.in', 'RE'],
    ['Hire-a-Friend', 'hire-a-friend.com', 'HF'], ['Rent Him', 'renthimnow.com', 'RH'], ['KoPartner', 'kopartner.in', 'KP']
  ];
  const posts = [
    { day: 1, title: 'When you want to go to the concert, but nobody’s free', format: 'Video', angle: 'Choose Each Booking', caption: 'A plan can feel easier when someone verified is there to share it.', art: 'concert' },
    { day: 2, title: 'You wanted to go to the concert. The plan was never the problem.', format: 'Video', angle: 'Work Around Your Schedule', caption: 'Make room for the plans you have been putting off.', art: 'plans' },
    { day: 3, title: '4 low-pressure ways to rebuild your social confidence', format: 'Slideshow', angle: 'Offer What You Do', caption: 'Start with a small plan, a public place, and a verified companion.', art: 'confidence' }
  ];
  const allFormats = [
    ['General ad', 'A flexible, direct response video ad', 'assets/v2-ag1-car-yapper-poster.jpg', 'video'],
    ['Text over clip', 'A bold claim layered over a moving clip', 'assets/v2-ag1-chalkboard-poster.jpg', 'video'],
    ['Person on camera', 'A creator talks directly to camera', 'assets/v2-ag1-ai-podcast-poster.jpg', 'video'],
    ['Animated story', 'A short story told with animation', 'assets/v2-fmt-3d-animation-poster.jpg', 'video'],
    ['Built from footage', 'Use your demo video as the base', 'assets/v2-ag1-papermation-poster.jpg', 'video'],
    ['Notes app', 'A native-feeling static post', 'assets/v2-fmt-notes-app.webp', 'static'],
    ['Billboard', 'One clear claim in a bold layout', 'assets/v2-fmt-billboard.webp', 'static'],
    ['Tweet', 'A short post in a social format', 'assets/v2-fmt-tweet.webp', 'static'],
    ['Snack wrapped', 'A year-in-review style creative', 'assets/v2-fmt-snack-wrapped.webp', 'static'],
    ['Fitness summary', 'A data-led infographic layout', 'assets/v2-fmt-fitness-summary.webp', 'static'],
    ['MS Paint', 'A rough hand-drawn meme treatment', 'assets/v2-fmt-ms-paint.webp', 'static'],
    ['Product hero', 'A product-first campaign visual', 'assets/v2-fmt-product-hero-poster.jpg', 'video']
  ];
  const menuSettings = {
    You: ['Account'],
    'Workspace and plan': ['Workspaces', 'Members', 'Plan and spend', 'Activity'],
    Senna: ['What runs without you', 'Post choices', 'Post labels', 'Notifications', 'Language'],
    Connections: ['Integrations', 'API']
  };
  const viewLabels = { home: 'Home', campaigns: 'Campaigns', calendar: 'Calendar', 'campaign-detail': 'Starter campaign', 'campaign-planner':'Plan a campaign', studio: 'Studio', brand: 'Brand', radar: 'Competitor Radar', analytics: 'Analytics', warmed: 'Warmed accounts', settings: 'Settings', chat: 'New chat with Senna' };
  let toastTimer;
  let dialogReturnFocus = null;
  let drawerReturnFocus = null;

  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  function focusableWithin(container) {
    return [...container.querySelectorAll(focusableSelector)].filter((element) => !element.hidden && element.getClientRects().length > 0);
  }
  function trapTab(container, event) {
    const focusable = focusableWithin(container);
    if (!focusable.length) {
      event.preventDefault();
      container.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  }
  function restoreFocus(element) {
    if (element instanceof HTMLElement && element.isConnected && !element.hasAttribute('disabled')) element.focus();
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  }
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
  }
  function openDialog(markup) {
    if (overlay.hidden) dialogReturnFocus = document.activeElement;
    dialogContent.innerHTML = markup;
    overlay.hidden = false;
    const closeButton = overlay.querySelector('.dialog-close');
    if (closeButton) closeButton.focus();
    else overlay.querySelector('.fl-dialog')?.focus();
  }
  function closeDialog() {
    if (overlay.hidden) return;
    overlay.hidden = true;
    dialogContent.replaceChildren();
    restoreFocus(dialogReturnFocus);
    dialogReturnFocus = null;
  }
  function openDrawer(title, description, body) {
    const previousDrawer = document.querySelector('.drawer-panel');
    if (!previousDrawer) drawerReturnFocus = document.activeElement;
    previousDrawer?.remove();
    const drawer = document.createElement('aside');
    drawer.className = 'drawer-panel';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-label', title);
    drawer.setAttribute('tabindex', '-1');
    drawer.innerHTML = `<button class="drawer-close" data-action="close-drawer" aria-label="Close">×</button><h2>${escapeHTML(title)}</h2><p>${escapeHTML(description)}</p>${body}`;
    document.body.append(drawer);
    drawer.querySelector('.drawer-close').focus();
  }
  function closeDrawer(shouldRestoreFocus = true) {
    const drawer = document.querySelector('.drawer-panel');
    if (!drawer) return;
    drawer.remove();
    if (shouldRestoreFocus) restoreFocus(drawerReturnFocus);
    drawerReturnFocus = null;
  }
  function go(view) { location.hash = view; }
  function syncRoute() {
    state.view = location.hash.slice(1) || 'home';
    closeDrawer(false);
    render();
  }
  function setBreadcrumb() {
    const name = viewLabels[state.view] || 'Home';
    const crumb = document.querySelector('#breadcrumbs');
    crumb.innerHTML = `<span>Rent Mate</span><i>/</i><b>${escapeHTML(name)}</b>`;
    document.querySelectorAll('.fl-nav .nav-item').forEach((item) => {
      const view = item.dataset.view;
      item.classList.toggle('active', view === state.view || ((state.view === 'calendar' || state.view === 'campaign-detail') && view === 'campaigns') || (state.view === 'chat' && view === 'home'));
      if (item.classList.contains('active')) item.setAttribute('aria-current', 'page'); else item.removeAttribute('aria-current');
    });
  }
  function postArt(post, index) {
    const images = ['assets/POLQsOkfYAwgr8ekFVSSEy1Dw.jpg','assets/ZBNmFJXd200GE6SX493nUzTBxQ.jpg','assets/lrlxKDrbTsLCa3a9Y8PgdglcUB8.jpg'];
    return `<div class="post-art post-art-${escapeHTML(post.art)}"><img src="${images[index % images.length]}" alt=""><span>RENT MATE</span><b>${escapeHTML(post.title)}</b><i>${escapeHTML(post.format.toUpperCase())}</i></div>`;
  }
  function sennaComposer(className, description, attach = false) {
    const promptId = className === 'home-compose' ? 'home-prompt' : 'studio-prompt';
    return `<section class="${className}"><h1>What should Senna make for Rent Mate?</h1><p>${description}</p><div class="composer-box"><div class="composer-input"><textarea id="${promptId}" data-compose placeholder="Ask Senna for an ad, a campaign, or anything about Fastlane" aria-label="Message Senna"></textarea>${attach ? '<button class="composer-send" type="button" data-action="send-prompt" aria-label="Send" disabled>↑</button>' : ''}</div><div class="composer-row">${attach ? '<button class="composer-attach" type="button" data-action="upload" aria-label="Attach photos, videos or documents"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m7.2 10.8 5.2-5.2a2.4 2.4 0 0 1 3.4 3.4l-6.7 6.7a4 4 0 0 1-5.7-5.7l6.4-6.4"/></svg></button>' : ''}<label class="switch-label"><input type="checkbox" id="make-without-asking"><span>Make without asking</span></label>${['Image','Video','Script','Campaign'].map((name)=>`<button class="mini-chip" type="button" data-action="select-chip" aria-pressed="false">${name}</button>`).join('')}${attach ? '' : '<button class="button-primary studio-send" type="button" data-action="send-prompt" disabled>Send</button>'}</div>${attach ? '<p class="keyboard-hint"><kbd>Enter</kbd> to send · <kbd>Shift</kbd> <kbd>Enter</kbd> new line</p>' : ''}</div></section>`;
  }
  function homeView() {
    return `${sennaComposer('home-compose','Tell Senna what to make, paste a video to remix, or pick a format below. You see the price before anything is made.',true)}
      <section class="section home-next"><div class="section-head"><h2>Next up <span class="next-sort-icon" aria-hidden="true">⇅</span></h2><span class="muted tiny">Most urgent first</span></div><div class="next-up"><article class="next-card next-card-paused"><span class="next-icon" aria-hidden="true">▱</span><div><b>Posts are paused</b><small>You are out of credits, so nothing new is made or posted.</small></div><button class="button-primary" data-action="plans">See plans</button></article><article class="next-card next-card-campaign"><img class="next-thumb" src="assets/POLQsOkfYAwgr8ekFVSSEy1Dw.jpg" alt=""><div><b>Starter campaign</b><small>Connect an account, then launch</small></div><button class="text-link" data-action="campaign-detail">Launch</button></article></div></section>
      <section class="section home-recent"><div class="section-head"><div><h2>Recent creations</h2><p>Newest first, from chats, campaigns and Studio</p></div><button class="text-link" data-action="library">Library ›</button></div><div class="post-strip">${posts.map((post,index)=>`<article class="post-tile">${postArt(post,index)}<div class="post-copy"><small>${post.format.toUpperCase()} · DAY ${post.day}</small><b>${escapeHTML(post.title)}</b><div class="post-meta"><span>Starter campaign</span><span>Saved</span></div></div></article>`).join('')}</div></section>
      <section class="section home-formats"><div class="section-head"><div><h2>Start from a format</h2><p>Pick one and Senna makes it for you</p></div><button class="text-link" data-action="studio-create">All formats in Studio ›</button></div><div class="format-list">${[['◉','Talking Head'],['▣','Spokesperson'],['✳','Pixar'],['▤','Talking Animals'],['▧','Lego'],['◈','Felt'],['◉','Talking Objects'],['▦','Barbie']].map(([icon,name])=>`<button class="format-chip" data-action="format" data-format="${name}"><span class="format-thumb">${icon}</span>${name}</button>`).join('')}</div></section>
      <section class="section home-remix"><div class="section-head"><div><h2>Remix a competitor ad</h2><p>Ads from brands in your space</p></div><button class="text-link" data-action="radar">See all ›</button></div><div class="card-grid grid-3"><article class="panel remix-teaser"><span class="pill gray">VIDEO · META</span><h3>Hollywood City Tours</h3><p class="muted tiny">17 months running</p><button class="text-link" data-action="radar-remix">Open ad →</button></article><article class="panel remix-teaser"><span class="pill gray">VIDEO · INSTAGRAM</span><h3>Hollywood City Tours</h3><p class="muted tiny">9 months running</p><button class="text-link" data-action="radar-remix">Open ad →</button></article><article class="panel remix-teaser"><span class="pill gray">STATIC · META</span><h3>Ghost City Tours</h3><p class="muted tiny">6 months running</p><button class="text-link" data-action="radar-remix">Open ad →</button></article></div></section>
      <section class="section home-promote"><div class="section-head"><div><h2>Publish and promote</h2><p>Your campaigns, ads and posts, one click away</p></div></div><div class="card-grid grid-3"><article class="panel"><span class="pill orange">1 PLANNED</span><h3 class="home-card-title">Campaigns</h3><p class="muted tiny">Starter campaign</p><button class="text-link" data-action="campaigns">Open campaigns ›</button></article><article class="panel"><span class="pill gray">NO ADS RUNNING</span><h3 class="home-card-title">Meta ads</h3><p class="muted tiny">Connect an ad account to see your ads.</p><button class="text-link" data-action="connect">Open ads ›</button></article><article class="panel"><span class="pill gray">POSTING PAUSED</span><h3 class="home-card-title">Calendar</h3><p class="muted tiny">Nothing booked yet.</p><button class="text-link" data-action="calendar">Open calendar ›</button></article></div></section>`;
  }
  function campaignView() {
    const extraCampaigns = state.plannerCampaigns.map((name)=>`<article class="campaign-card campaign-card-extra"><span class="campaign-thumbnail campaign-thumbnail-empty">✳</span><div class="campaign-copy"><button class="campaign-title" data-action="campaign-detail">${escapeHTML(name)}</button><p>People earning through companionship · Organic</p><p class="campaign-warning">◆ Draft plan · Connect an account when you’re ready to launch.</p></div><span class="campaign-status">Planned</span><button class="button-outline" data-action="campaign-detail">Open campaign</button></article>`).join('');
    return `<div class="campaign-page-head"><div class="campaign-heading"><h1>Campaigns</h1><div class="campaign-goal"><span>Goal</span><span>${escapeHTML(state.campaignGoal)}</span><button class="goal-change" data-action="campaign-goal">Change</button></div><div class="campaign-status-row"><span>0 running</span><i>·</i><span>${1+state.plannerCampaigns.length} planned</span><button class="persona-chip" data-action="persona">1 persona</button></div></div><button class="button-primary" data-action="plan-campaign">Plan a campaign</button></div>
      <div class="tabs campaign-tabs"><button class="tab-button" data-action="campaign-tab" data-tab="campaigns" aria-selected="true">Campaigns</button><button class="tab-button" data-action="calendar">Calendar</button></div>
      <section class="campaign-needed"><p class="eyebrow">NEEDS YOU · ${1+state.plannerCampaigns.length}</p><article class="campaign-card"><img class="campaign-thumbnail" src="assets/POLQsOkfYAwgr8ekFVSSEy1Dw.jpg" alt=""><div class="campaign-copy"><button class="campaign-title" data-action="campaign-detail">Starter campaign</button><p>People earning through companionship · Organic</p><p class="campaign-warning">◆ Connect an account so the posts can go out. You can still make posts and download them from the Library without one.</p></div><span class="campaign-count">3 of 28 made · 25 drafts</span><span class="campaign-status">Planned</span><button class="button-outline" data-action="connect">Connect an account</button></article>${extraCampaigns}</section>`;
  }
  function dateKey(day) { return `${state.calendarMonth.getFullYear()}-${String(state.calendarMonth.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`; }
  function calendarView() {
    const monthName = state.calendarMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const firstDay = new Date(state.calendarMonth.getFullYear(), state.calendarMonth.getMonth(), 1).getDay();
    const daysInMonth = new Date(state.calendarMonth.getFullYear(), state.calendarMonth.getMonth()+1, 0).getDate();
    const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    let cells = labels.map((day) => `<div class="calendar-day-label">${day}</div>`).join('');
    const mondayOffset = (firstDay + 6) % 7;
    for (let blank=0; blank<mondayOffset; blank++) cells += '<div class="calendar-cell"></div>';
    for (let day=1; day<=daysInMonth; day++) {
      const inCampaign = state.calendarMonth.getFullYear() === 2026 && state.calendarMonth.getMonth() === 10 && day >= 17 && day <= 30;
      const postIndex = day - 17;
      const title = postIndex >= 0 && postIndex < 3 ? posts[postIndex].title : 'Draft post · ' + (postIndex + 1);
      cells += `<div class="calendar-cell"><span class="calendar-date">${day}</span>${inCampaign ? `<button class="calendar-post ${postIndex < 3 ? '' : 'draft'}" data-action="calendar-day" data-day="${day}">${escapeHTML(title.slice(0,35))}${title.length > 35 ? '…' : ''}</button>` : ''}</div>`;
    }
    return `<div class="page-header"><div><p class="eyebrow">POSTING SCHEDULE</p><h1>Calendar</h1><p>Starter campaign has not started. These are the days it would post if you started it today.</p></div><button class="button-outline" data-action="campaign-config">Configure campaign</button></div><section class="panel"><div class="calendar-toolbar"><div><button class="button-quiet" data-action="calendar-prev" aria-label="Previous month">←</button> <button class="button-quiet" data-action="calendar-next" aria-label="Next month">→</button> <h2 style="display:inline-block;margin-left:8px">${monthName}</h2></div><span class="pill">18:00 · Calcutta time</span></div><div class="calendar-grid">${cells}</div><div class="post-meta"><span>3 created</span><span>Drafts stay drafts until you make them.</span></div></section>`;
  }
  function weeksMarkup() {
    const formats = ['Wall of text','Wall of text','Slideshow','Slideshow','Wall of text','Green screen','Slideshow'];
    let html = '';
    for (let week=0; week<4; week++) {
      const startDay = 17 + week * 7;
      const days = Array.from({length:7},(_,index)=>startDay+index);
      html += `<article class="week-card"><div class="week-head"><b>Week ${week+1}</b><small>${week===0?'Tue 17 Nov to Mon 23 Nov':`Week of ${days[0] <= 30 ? days[0] : days[0]-30} ${days[0] <= 30 ? 'Nov':'Dec'}`} · 7 posts · 35 credits</small></div><div class="week-days">${days.map((day,index)=>{const offset=day-17;const created=offset<3; const format=formats[offset%formats.length];const shownDay=day<=30?day:day-30; return `<button class="week-day ${created?'created':''}" data-action="calendar-day" data-day="${day}"><small>${shownDay} ${day<=30?'Nov':'Dec'}</small>${format}${created?' · Made':' · Draft'}</button>`}).join('')}</div></article>`;
    }
    return html;
  }
  function campaignDetailView() {
    const post = posts[(state.campaignPost - 1) % posts.length];
    const isCreated = state.campaignPost <= 3;
    const title = isCreated ? post.title : `Draft post ${state.campaignPost}`;
    const viewSwitcher = `<div class="tabs"><button class="tab-button" data-action="campaign-mode" data-mode="review" aria-selected="${state.campaignMode==='review'}">Review</button><button class="tab-button" data-action="campaign-mode" data-mode="all" aria-selected="${state.campaignMode==='all'}">All posts 28</button></div>`;
    const toolbar = `<div class="page-header"><div><button class="text-link" data-action="campaigns">← Campaigns</button><h1 style="margin-top:8px">Starter campaign</h1><p>Draft · People earning through companionship · Organic</p></div><div class="page-actions"><button class="button-outline" data-action="campaign-config">Configure</button><button class="button-primary" data-action="connect">Connect accounts to launch</button></div></div><section class="panel"><div class="panel-heading"><div><h2>Your campaign’s posts</h2><p>3 of 28 created · drafts not made stay drafts.</p></div>${viewSwitcher}</div>${state.campaignMode==='review' ? `<div class="post-review"><div><div class="mock-creative">${isCreated ? postArt(post,state.campaignPost-1) : ''}<span class="mock-caption">${escapeHTML(title)}</span></div><div class="post-controls"><button class="button-quiet" data-action="prev-post" ${state.campaignPost<=1?'disabled':''}>← Previous</button><button class="button-quiet" data-action="next-post">Next →</button><button class="button-quiet" data-action="skip-post">Skip · Nothing charged</button><button class="button-quiet" data-action="swap-post">Swap</button><button class="button-quiet" data-action="edit-post">Edit</button><button class="button-primary" data-action="make-post" ${isCreated?'disabled':''}>Make · 5 credits</button></div></div><div><div class="panel-heading"><div><p class="eyebrow">POST ${state.campaignPost} OF 28</p><h2>${escapeHTML(title)}</h2></div><span class="pill ${isCreated?'green':'gray'}">${isCreated?'CREATED':'DRAFT'}</span></div><dl class="detail-list"><div><dt>Format</dt><dd>${isCreated?escapeHTML(post.format):'Slideshow'}</dd></div><div><dt>Angle</dt><dd>${isCreated?escapeHTML(post.angle):'Build A Trusted Profile'}</dd></div><div><dt>When</dt><dd>${state.campaignPost+16} Nov · 18:00 Calcutta</dd></div><div><dt>Caption</dt><dd>${isCreated?escapeHTML(post.caption):'Drafts are not made until you choose Make.'}</dd></div><div><dt>Account</dt><dd>No account connected</dd></div></dl><button class="button-outline" style="margin-top:13px" data-action="credits">Your credits · 0</button></div></div>` : `<div>${weeksMarkup()}</div>`}</section><section class="section card-grid grid-2"><article class="panel"><div class="panel-heading"><div><h2>About this campaign</h2><p>28 posts · 4 weeks · 6 angles</p></div><button class="button-quiet" data-action="persona">Open persona</button></div><div class="angle-list">${['Work Around Your Schedule · 5','Build A Trusted Profile · 5','Offer What You Do · 5','Get Secure Payouts · 5','Choose Each Booking · 4','Set Your Own Terms · 4'].map(x=>`<span class="angle-tag">${x}</span>`).join('')}</div></article><article class="panel"><div class="panel-heading"><div><h2>Your credits</h2><p>0 credits available · 125 needed to make the remaining drafts.</p></div><button class="button-quiet" data-action="credits">Details</button></div><button class="button-outline" data-action="plans">See plans</button></article></section>`;
    return toolbar + (state.plannerCampaigns.length ? `<section class="section panel"><div class="panel-heading"><div><p class="eyebrow">NEEDS YOU</p><h2>Additional plans</h2></div></div>${state.plannerCampaigns.map(name=>`<div class="product-row"><span class="product-icon">✳</span><div><b>${escapeHTML(name)}</b><small>Organic · No account yet · Draft plan</small></div><button class="button-quiet" data-action="campaign-detail">Review →</button></div>`).join('')}</section>` : '');
  }
  function studioTabs() {
    return `<div class="studio-top"><div class="studio-tabs">${['overview','create','library','blitz','influencers'].map((tab)=>`<button class="tab-button" data-action="studio-tab" data-tab="${tab}" aria-selected="${state.studioTab===tab}">${tab[0].toUpperCase()+tab.slice(1)}</button>`).join('')}</div></div>`;
  }
  function studioOverview() {
    const ownCards = [
      ['Upload your own','Post a video or photo with your caption','5 credits','assets/v2-fmt-product-hero-poster.jpg','upload'],
      ['Generate images','Make stills from a prompt or a reference','From 2 credits','assets/v2-fmt-product-hero-poster.jpg','studio-create'],
      ['Generate a video','Make a clip from a prompt or an image','From 20 credits','assets/v2-ag1-yapper-var1-poster.jpg','studio-create']
    ];
    const videoFormats = allFormats.filter((item)=>item[3]==='video').slice(0,6);
    const staticFormats = allFormats.filter((item)=>item[3]==='static');
    const formatCards = (items)=>items.map(([name,description,img])=>`<article class="studio-card" role="button" tabindex="0" data-action="format" data-format="${escapeHTML(name)}"><img src="${img}" alt=""><div class="studio-card-copy"><b>${escapeHTML(name)}</b><small>${escapeHTML(description)}</small></div></article>`).join('');
    return `${sennaComposer('studio-compose','Tell him, or pick an ad, a format or a trending post below. He shows the price before anything is made.')}
      <nav class="studio-shelf-nav" aria-label="Studio sections">${[['Formats','46','studio-formats'],['Static ads','21','studio-static-ads'],['Your latest','','studio-latest'],['Competitor ads','55','studio-competitor-ads'],['Trending','40','studio-trending']].map(([label,count,target])=>`<button type="button" data-action="studio-section" data-target="${target}"><span>${label}</span>${count?`<small>${count}</small>`:''}</button>`).join('')}</nav>
      <section class="studio-shelf" id="studio-make-your-own"><div class="section-head"><div><h2>Make your own <span class="count-badge">3</span></h2><p>Start from your own video or photo, or make one from a prompt.</p></div></div><div class="own-card-grid">${ownCards.map(([title,description,cost,img,action])=>`<button class="own-card" data-action="${action}"><span class="own-card-media"><img src="${img}" alt=""></span><span class="own-card-copy"><b>${title}</b><small>${description}</small><i>${cost}</i></span></button>`).join('')}</div></section>
      <section class="studio-shelf" id="studio-formats"><div class="section-head"><div><h2>Content formats <span class="count-badge">46</span></h2><p>Pick a format to start creating content.</p></div><button class="text-link" data-action="studio-create">All formats ›</button></div><p class="muted tiny">Generated video estimates assume a 15-second post; the cost follows the video’s length.</p><div class="studio-grid">${formatCards(videoFormats)}</div></section>
      <section class="studio-shelf" id="studio-static-ads"><div class="section-head"><div><h2>Static ads <span class="count-badge">21</span></h2><p>Pick a format to make a static ad.</p></div><button class="text-link" data-action="studio-create">All formats ›</button></div><div class="studio-grid">${formatCards(staticFormats)}</div></section>
      <section class="studio-shelf" id="studio-latest"><div class="section-head"><div><h2>Your latest</h2><p>From chats, campaigns and Studio, newest first</p></div><button class="text-link" data-action="studio-tab" data-tab="library">Library ›</button></div><div class="post-strip">${posts.map((post,index)=>`<article class="post-tile">${postArt(post,index)}<div class="post-copy"><small>${post.format} · Campaign post</small><b>${escapeHTML(post.title)}</b></div></article>`).join('')}</div></section>
      <section class="studio-shelf" id="studio-competitor-ads"><div class="section-head"><div><h2>Remix a competitor ad <span class="count-badge">55</span></h2><p>Your trial shows 10 ads across four competitors.</p></div><button class="text-link" data-action="radar">Open Radar ›</button></div><div class="card-grid grid-3"><article class="panel remix-teaser"><span class="pill gray">VIDEO · META</span><h3>Meetup</h3><p class="muted tiny">Join Local Groups & Make New Friends · 21 months running</p><button class="text-link" data-action="radar-remix">Remix ad ›</button></article><article class="panel remix-teaser"><span class="pill gray">VIDEO · INSTAGRAM</span><h3>Bumble</h3><p class="muted tiny">Dates, die so viben wie du · 38 days running</p><button class="text-link" data-action="radar-remix">Remix ad ›</button></article><article class="panel remix-teaser"><span class="pill gray">STATIC · INSTAGRAM</span><h3>LetMeBuddy</h3><p class="muted tiny">Book verified buddies for hobbies and mentorship</p><button class="text-link" data-action="radar-remix">Remix ad ›</button></article></div></section>
      <section class="studio-shelf" id="studio-trending"><div class="section-head"><div><h2>Trending posts <span class="count-badge">40</span></h2><p>Top organic posts in your niche this week.</p></div><button class="button-quiet" data-action="radar">Browse Radar</button></div><div class="panel trend-note">Trending inspiration is available with a paid plan.</div></section>`;
  }
  function studioCreate() {
    const query = state.studioSearch.trim().toLowerCase();
    const formats = allFormats.filter((item)=>item[3] === (state.studioKind==='Video'?'video':'static') && (!query || item[0].toLowerCase().includes(query)) && (state.studioFilter==='All' || (state.studioFilter==='Ready for Rent Mate' && item[0]!=='Built from footage') || (state.studioFilter==='Needs something' && item[0]==='Built from footage')));
    return `<div class="section-head"><div><p class="eyebrow">MAKE A NEW CREATIVE</p><h2>Choose a format</h2></div></div><div class="studio-toolbar"><div class="tabs"><button class="tab-button" data-action="studio-kind" data-kind="Video" aria-selected="${state.studioKind==='Video'}">Videos · 46</button><button class="tab-button" data-action="studio-kind" data-kind="Static" aria-selected="${state.studioKind==='Static'}">Static ads · 21</button></div><input class="field" style="max-width:220px" id="studio-search" placeholder="Search formats" value="${escapeHTML(state.studioSearch)}" aria-label="Search formats"></div><div class="filter-row">${['All','Ready for Rent Mate','Needs something'].map(filter=>`<button class="filter-chip" data-action="studio-filter" data-filter="${filter}" aria-pressed="${state.studioFilter===filter}">${filter}</button>`).join('')}</div><section class="studio-grid section">${formats.length?formats.map(([name,description,img])=>`<article class="studio-card" role="button" tabindex="0" data-action="format" data-format="${escapeHTML(name)}"><img src="${img}" alt="${escapeHTML(name)} example format"><div class="studio-card-copy"><b>${escapeHTML(name)}</b><small>${escapeHTML(description)}</small></div></article>`).join(''):'<p class="empty-note">No formats match this search.</p>'}</section><p class="muted tiny">Showing ${state.studioKind==='Video'?'46':'21'} formats · Example creatives are illustrative previews.</p>`;
  }
  function studioLibrary() {
    const items = posts.filter((_,index)=>['All','Ready','Media','Images','Clips','Hook clips','Audio'].includes(state.libraryFilter)||(state.libraryFilter==='Video'&&index<2)||(state.libraryFilter==='Slideshow'&&index===2));
    return `<div class="library-toolbar"><div class="library-filters">${['All','Ready','Scheduled','Posted','Video','Slideshow','Image'].map((filter)=>`<button class="filter-chip" data-action="library-filter" data-filter="${filter}" aria-pressed="${state.libraryFilter===filter}">${filter}</button>`).join('')}</div><button class="button-outline" data-action="connect">Select to ship</button></div><div class="library-toolbar"><div class="library-filters">${['Media','Images','Clips','Hook clips','Audio'].map((filter)=>`<button class="filter-chip" data-action="library-filter" data-filter="${filter}" aria-pressed="${state.libraryFilter===filter}">${filter}</button>`).join('')}</div><button class="button-quiet" data-action="upload">＋ Upload</button></div>${items.length?`<div class="library-grid">${items.map((post,index)=>`<article class="library-item">${postArt(post,index)}<div><b>${escapeHTML(post.title)}</b><small>${post.format} · Starter campaign · Saved</small><button class="text-link" data-action="edit-post" style="padding:8px 0 0">Open post →</button></div></article>`).join('')}</div>`:'<section class="panel empty-note">No items in this status yet.</section>'}<section class="section panel"><div class="panel-heading"><div><p class="eyebrow">CURATED SETS</p><h2>Two slideshow sets</h2></div><button class="button-quiet" data-action="upload">Browse inspiration</button></div><p class="muted tiny">Media filters include images, clips, hook clips and audio. Uploads are stored in your library.</p></section>`;
  }
  function studioBlitz() {
    return `<div class="page-header"><div><p class="eyebrow">DAILY REVIEW</p><h1>Blitz</h1><p>Daily suggestions are free to review. Keeping a post costs 5 credits.</p></div><button class="button-outline" data-action="blitz-config">Configure Blitz</button></div><section class="panel" style="max-width:700px;margin:0 auto"><div class="panel-heading"><div><p class="eyebrow">SUGGESTION 1 OF 1</p><h2>Make flexible hours the hook</h2><p>Slideshow · Work Around Your Schedule</p></div><button class="button-quiet" data-action="blitz-why">Why this content?</button></div>${postArt(posts[2],2)}<p class="muted tiny">Show companions how Rent Mate lets them set availability and choose which bookings fit.</p><div class="post-controls"><button class="button-quiet" data-action="blitz-skip">Reject</button><button class="button-quiet" data-action="edit-post">Edit</button><button class="button-primary" data-action="blitz-approve">Approve · 5 credits</button></div><div class="divider"></div><small class="muted">Review counters reset at midnight UTC. Keeping posts requires available credits.</small></section>`;
  }
  function studioInfluencers() {
    return `<section class="panel influencer-empty"><div class="influencer-collage" aria-hidden="true"><img class="influencer-photo photo-one" src="assets/Cb95Iu8xbpZqBi8tyAycpXpVmhk.jpg" alt=""><img class="influencer-photo photo-two" src="assets/XivMmgpidqC1ftvMQpuDShYcU.png" alt=""><img class="influencer-photo photo-three" src="assets/ZBNmFJXd200GE6SX493nUzTBxQ.jpg" alt=""><img class="influencer-photo photo-four" src="assets/lrlxKDrbTsLCa3a9Y8PgdglcUB8.jpg" alt=""><button class="influencer-add-tile" type="button" data-action="new-influencer" aria-label="Create an influencer"><span>＋</span></button></div><div class="influencer-empty-copy"><h2>Create your first influencer</h2><p>Pick a few traits. Senna trains a face that stays the same in every image and video.</p><div class="influencer-actions"><button class="button-primary" data-action="new-influencer">＋ New influencer</button><button class="text-link" data-action="influencer-examples">See it with influencers</button></div></div></section>`;
  }
  function studioView() {
    const content = { overview:studioOverview, create:studioCreate, library:studioLibrary, blitz:studioBlitz, influencers:studioInfluencers }[state.studioTab]();
    if (state.studioTab === 'influencers') return `<div class="studio-subpage-top"><button class="button-outline" data-action="studio-tab" data-tab="overview">‹ Studio</button><div><span>0 credits left</span><button class="button-outline" data-action="plans">See plans</button></div></div><div class="studio-subpage-title"><h1>Influencers</h1><p>People who front your posts with the same face every time.</p></div>${content}`;
    return `<div class="studio-page-head"><h1>Studio</h1><span>Rent Mate · Dating &amp; social apps · 0 credits</span></div>${studioTabs()}${content}`;
  }
  function brandProfile() {
    return `<section class="panel brand-profile-card"><div><p class="eyebrow">BRAND PROFILE</p><div class="brand-identity"><span class="brand-logo-box">RM</span><div><h2>Rent Mate</h2><p>rent-mate-beryl.vercel.app · India</p></div><button class="button-quiet" data-action="brand-edit">Edit</button></div><div class="swatches"><span class="swatch"><i style="--swatch:#f0a019"></i>#F0A019</span><span class="swatch"><i style="--swatch:#15233b"></i>#15233B</span></div></div><div class="brand-info"><div><small>BRAND VOICE</small><b>Legitimate · Straightforward · Protected</b></div><div><small>POST TIMEZONE</small><b>Calcutta · India Standard Time</b></div><div><small>WEBSITE SCAN</small><b>11 pages · 2 products</b></div><div><small>LAST REVIEWED</small><b>16 Nov 2026</b></div></div></section><section class="section card-grid grid-2"><article class="panel"><div class="panel-heading"><div><p class="eyebrow">POSITIONING</p><h2>Verified public companionship</h2></div><button class="button-quiet" data-action="brand-edit">Edit</button></div><p class="muted tiny">Legitimate, straightforward and protected companionship with safety controls for real-world plans.</p></article><article class="panel"><div class="panel-heading"><div><p class="eyebrow">WHO BUYS</p><h2>People seeking company</h2></div><button class="button-quiet" data-action="brand-edit">Edit</button></div><p class="muted tiny">Solo city residents, people attending events alone, visitors, confidence builders and workers seeking activity partners.</p></article></section>`;
  }
  function brandProducts() {
    return `<section class="panel"><div class="panel-heading"><div><p class="eyebrow">WHAT YOU SELL · 2 ITEMS</p><h2>Products and services</h2><p>Services can be reviewed here; only physical products go into posts and ads.</p></div><button class="button-outline" data-action="add-item">＋ Add an item</button></div><div class="product-row"><span class="product-icon">RM</span><div><b>Rent Mate</b><small>Marketplace for verified companionship · From ₹299 / month</small></div><strong>From ₹299 / month</strong><button class="button-quiet" data-action="brand-edit">Edit</button></div><div class="product-row"><span class="product-icon">✓</span><div><b>Verification membership</b><small>Companion verification membership with profile visibility and trust perks</small></div><strong>No price listed</strong><button class="button-quiet" data-action="brand-edit">Edit</button></div></section><section class="section panel"><div class="panel-heading"><div><h2>Price point</h2><p>Optional prices Senna may use in content.</p></div><button class="button-quiet" data-action="brand-edit">Edit</button></div><p class="muted tiny">Silver ₹299/mo · Gold ₹699/mo · Platinum ₹1,499/mo</p></section>`;
  }
  function brandCompetitors() {
    return `<section class="panel"><div class="panel-heading"><div><p class="eyebrow">COMPETITORS · 12 KEPT</p><h2>Brands in your strategy</h2><p>Competitor Radar uses these to find relevant ads.</p></div><button class="button-outline" data-action="add-item">＋ Add competitor</button></div>${competitors.map(([name,domain,initials])=>`<div class="competitor-row"><span class="competitor-avatar">${initials}</span><div><b>${name}</b><small>${domain}</small></div><span class="pill green">KEPT</span><button class="button-quiet" data-action="brand-edit">Edit</button></div>`).join('')}</section>`;
  }
  function brandMedia(label) {
    return `<section class="panel empty-state"><div class="gate-icon">＋</div><h2>${label}</h2><p>Upload files to give Senna more source material for Rent Mate posts. This local preview keeps uploads disabled.</p><button class="button-outline" data-action="upload">＋ Upload ${label.toLowerCase()}</button><small class="muted">${label==='Demo videos'?'MP4 or MOV · Up to 100 MB · Max 30 seconds':'Images JPG, PNG or WebP · Up to 10 MB · Videos MP4 or MOV · Up to 50 MB / 3 min'}</small></section>`;
  }
  function brandView() {
    const contents = {profile:brandProfile,products:brandProducts,competitors:brandCompetitors,'demo-videos':()=>brandMedia('Demo videos'),photos:()=>brandMedia('Photos and videos')};
    return `<div class="page-header"><div><p class="eyebrow">YOUR BRAND DATA</p><h1>Brand</h1><p>Keep the business, offers and visual sources up to date.</p></div><button class="button-quiet" data-action="site-scan">Change website</button></div><div class="tabs brand-tabs">${[['profile','Profile'],['products','Products'],['competitors','Competitors'],['demo-videos','Demo videos'],['photos','Photos / videos']].map(([id,label])=>`<button class="tab-button" data-action="brand-tab" data-tab="${id}" aria-selected="${state.brandTab===id}">${label}</button>`).join('')}</div>${contents[state.brandTab]()}`;
  }
  function radarView() {
    const radarAds=[['Bumble','Find someone to share the day with','assets/v2-static-99-problems.webp'],['Meetup','Find your people and make new plans nearby','assets/v2-fmt-tweet.webp'],['LetMeBuddy','A buddy for coffee, a walk, or an event','assets/v2-fmt-notes-app.webp'],['Meetup','Try something new with people in your city','assets/v2-fmt-billboard.webp'],['Bumble','Meet new friends on your own terms','assets/v2-static-noo-meme.webp'],['Kumpanio','A verified companion for the moments that matter','assets/v2-fmt-product-hero-poster.jpg']].filter(([brand,title])=>(state.radarFilter==='All'||state.radarFilter==='In your space'||brand===state.radarFilter)&&(!state.radarSearch||`${brand} ${title}`.toLowerCase().includes(state.radarSearch.toLowerCase())));
    return `<div class="page-header"><div><p class="eyebrow">SEE WHAT OTHERS ARE MAKING</p><h1>Competitor Radar</h1><p>${radarAds.length} of 52 ads from ${state.radarFilter==='All'?'4':'1'} brands · 12 competitors watched</p></div><button class="button-outline" data-action="add-item">＋ Add competitor</button></div><div class="radar-toolbar"><input class="field radar-search" id="radar-search" placeholder="Search ads" value="${escapeHTML(state.radarSearch)}" aria-label="Search ads"><button class="filter-chip" data-action="radar-sort" aria-pressed="true">Most relevant</button><button class="filter-chip" data-action="radar-settings">Filters</button>${[['All','All · 10'],['Bumble','Bumble · 3'],['Meetup','Meetup · 3'],['LetMeBuddy','LetMeBuddy · 1'],['In your space','In your space · 3']].map(([filter,label])=>`<button class="filter-chip" data-action="radar-filter" data-filter="${filter}" aria-pressed="${state.radarFilter===filter}">${label}</button>`).join('')}</div><div class="library-filters" style="margin:10px 0 14px">${['new friends','join local','local groups','social plans','verified companions','book a friend'].map(term=>`<button class="filter-chip ${state.radarSearch===term?'selected':''}" data-action="radar-keyword" data-term="${term}">${term}</button>`).join('')}</div><section class="radar-ads">${radarAds.map(([brand,title,img])=>`<article class="radar-ad"><img src="${img}" alt="Example competitor creative"><div class="radar-ad-copy"><small>${brand.toUpperCase()} · ORGANIC</small><b>${title}</b><p>Example creative from the current Radar feed.</p><button class="text-link" data-action="radar-remix">Remix for Rent Mate →</button></div></article>`).join('')||'<div class="panel empty-note">No ads match these filters.</div>'}</section><section class="section panel"><div class="panel-heading"><div><h2>More ads in your space</h2><p>52 ads across 12 brands. Some results are available on paid plans.</p></div><button class="button-outline" data-action="plans">See plans</button></div></section>`;
  }
  function analyticsView() {
    const organic = state.analyticsMode==='organic';
    return `<div class="page-header"><div><p class="eyebrow">PERFORMANCE</p><h1>Analytics</h1><p>Connect an account to see your numbers.</p></div><div class="analytics-toggle"><button data-action="analytics-mode" data-mode="paid" aria-pressed="${!organic}">Paid ads</button><button data-action="analytics-mode" data-mode="organic" aria-pressed="${organic}">Organic posts</button></div></div><section class="panel"><div class="panel-heading"><div><p class="eyebrow">${organic?'ORGANIC POSTS':'PAID ADS'}</p><h2>${organic?'No social account connected':'No Meta ad account connected'}</h2><p>Example data previews the metrics available after connecting.</p></div><button class="button-outline" data-action="connect">Connect account</button></div><div class="card-grid grid-4"><article class="metric-card"><small>${organic?'POSTS':'SPEND'}</small><b>${organic?'24':'$12,840'}</b><small class="metric-up">Example data · last 30 days</small></article><article class="metric-card"><small>${organic?'REACH':'REVENUE'}</small><b>${organic?'48.2K':'$68,420'}</b><small class="metric-up">Example data · last 30 days</small></article><article class="metric-card"><small>${organic?'ENGAGEMENT':'ROAS'}</small><b>${organic?'4.8%':'5.32x'}</b><small class="metric-up">Example data · last 30 days</small></article><article class="metric-card"><small>${organic?'FOLLOWERS':'ACTIVE ADS'}</small><b>${organic?'2,140':'24'}</b><small class="metric-up">Example data · last 30 days</small></article></div><div class="chart-placeholder section" role="img" aria-label="Illustrative performance chart"></div><p class="muted tiny">Illustrative sample metrics. Real results appear after connecting an account.</p></section>`;
  }
  function warmedView() {
    return `<div class="page-header"><div><p class="eyebrow">ACCOUNT MANAGEMENT</p><h1>Warmed accounts</h1><p>Real TikTok and Instagram accounts prepared and managed by Fastlane.</p></div><span class="pill orange">UPGRADE REQUIRED</span></div><section class="panel gate-card"><div class="gate-icon">♧</div><h2>Warmed accounts are not available on the free trial</h2><p>Buy an account, set the handle, bio, picture, country and niche, then our team warms it on a real device. Review each post before it goes out.</p><div class="gate-price">$100 / month + $1.50 per post</div><button class="button-primary" data-action="plans">See plans</button><p class="muted tiny">Cancel anytime · You review and approve posts before publishing.</p></section><section class="panel" style="max-width:720px;margin:20px auto"><div class="panel-heading"><div><p class="eyebrow">QUESTIONS</p><h2>Frequently asked</h2></div></div>${[['How much does a warmed account cost?','$100 per month for the account, plus $1.50 for each post uploaded.'],['How do I use an account?','It is connected in Fastlane settings and appears alongside your other publishing accounts.'],['How long does warming take?','Fastlane prepares the account on a real device before it is ready to post.'],['Can I choose what gets posted?','Yes. Posts wait for your review before they go out.'],['Can I cancel?','The plan can be cancelled at any time.']].map(([q,a],index)=>`<details class="faq-row" ${index===0?'open':''}><summary>${q}</summary><p>${a}</p></details>`).join('')}</section>`;
  }
  function settingContent(name) {
    const row = (title,desc,control='') => `<div class="settings-row"><div><b>${title}</b><small>${desc}</small></div>${control}</div>`;
    const toggle = (checked=false) => `<input class="toggle" type="checkbox" ${checked?'checked':''} aria-label="Toggle setting">`;
    switch(name) {
      case 'Account': return `<div class="panel-heading"><div><p class="eyebrow">YOU</p><h2>Account</h2></div></div>${row('Name','Deneal', '<button class="button-quiet" data-action="account-edit">Change</button>')}${row('Email','demo account · private in this preview','<button class="button-quiet" data-action="account-edit">Change</button>')}${row('Password','Update your sign-in details','<button class="button-quiet" data-action="account-edit">Change</button>')}${row('Appearance','Dark mode', '<select class="field"><option>Dark</option><option>Light</option><option>Device</option></select>')}${row('Timezone','Calcutta · India','<button class="button-quiet" data-action="account-edit">Change</button>')}${row('Region','India','<button class="button-quiet" data-action="account-edit">Change</button>')}${row('Delete account','Permanently remove your account','<button class="button-quiet" data-action="account-edit">View options</button>')}`;
      case 'Workspaces': return `<div class="panel-heading"><div><p class="eyebrow">WORKSPACE AND PLAN</p><h2>Workspaces · 1 of 3</h2></div><button class="button-outline" data-action="add-item">＋ New workspace</button></div>${row('Rent Mate','Owner · 0 connected accounts','<button class="button-quiet" data-action="account-edit">Rename</button>')}`;
      case 'Members': return `<div class="panel-heading"><div><p class="eyebrow">WORKSPACE AND PLAN</p><h2>Members · 1</h2></div><button class="button-outline" data-action="add-item">＋ Invite</button></div>${row('Deneal','Owner · all workspace controls','<span class="pill">OWNER</span>')}`;
      case 'Plan and spend': return `<div class="panel-heading"><div><p class="eyebrow">WORKSPACE AND PLAN</p><h2>Plan and spend</h2><p>Trial · 0 credits · 15 credits used</p></div><button class="button-primary" data-action="plans">Choose plans</button></div><section class="card-grid grid-3"><article class="metric-card"><small>CREDITS LEFT</small><b>0</b><small>Posts paused</small></article><article class="metric-card"><small>STARTER</small><b>$29</b><small>500 credits / month</small></article><article class="metric-card"><small>STORAGE</small><b>0 / 500 MB</b><small>Trial storage</small></article></section>${row('Starter campaign','3 posts created · 25 drafts still need 125 credits','<button class="button-quiet" data-action="credits">Details</button>')}`;
      case 'Activity': return `<div class="panel-heading"><div><p class="eyebrow">WORKSPACE AND PLAN</p><h2>Activity</h2></div></div>${row('Starter campaign added','28 templated · 3 posts created · nothing is posted until a channel is linked.','<span class="pill">CAMPAIGN</span>')}${posts.map((post)=>row(`Saved a ${post.format.toLowerCase()}: Day ${post.day} of Starter campaign`,post.title,'<span class="pill green">SAVED</span>')).join('')}`;
      case 'What runs without you': return `<div class="panel-heading"><div><p class="eyebrow">SENNA</p><h2>What runs without you</h2></div></div>${row('Credit cap per make','100 credits', '<input class="field" type="number" value="100" style="width:75px">')}${row('Daily credit cap','250 credits', '<input class="field" type="number" value="250" style="width:75px">')}${['TikTok','Instagram','YouTube Shorts'].map(platform=>row(`Auto-post to ${platform}`,'Asks first',toggle(false))).join('')}`;
      case 'Post choices': return `<div class="panel-heading"><div><p class="eyebrow">SENNA</p><h2>Post choices</h2></div></div>${row('Who appears in posts?','Anyone', '<select class="field"><option>Anyone</option><option>Women</option><option>Men</option></select>')}${row('Mention the brand','Sometimes',toggle(true))}${row('Use influencers','Sometimes',toggle(true))}${row('Caption style','Classic White on dark box', '<button class="button-quiet" data-action="account-edit">Change</button>')}${row('Post text style','No default text style selected','<button class="button-quiet" data-action="account-edit">Change</button>')}`;
      case 'Post labels': return `<div class="panel-heading"><div><p class="eyebrow">SENNA</p><h2>Post labels</h2></div></div>${row('AI-generated label','Use the platform’s AI disclosure setting',toggle(true))}${row('Warmed-account ad disclosure','Disclose as ads',toggle(false))}`;
      case 'Notifications': return `<div class="panel-heading"><div><p class="eyebrow">SENNA</p><h2>Notifications</h2><p>Workspace and personal notification preferences.</p></div></div>${['All email notifications','Failed posts','Disclosure review','Content ready','Daily digest','Urgent updates','Social accounts','Offers','Unfinished work','Usage cap','Device browser notifications'].map((label,index)=>row(label,index<8?'Email notifications':'Optional alerts',toggle(index<8))).join('')}`;
      case 'Language': return `<div class="panel-heading"><div><p class="eyebrow">SENNA</p><h2>Language</h2></div></div>${row('Display language','English','<select class="field"><option>English</option><option>हिन्दी</option><option>Español</option></select>')}`;
      case 'Integrations': return `<div class="panel-heading"><div><p class="eyebrow">CONNECTIONS</p><h2>Integrations · 0 of 10 connected</h2><p>Connect a social or ad account to publish and see real results.</p></div></div>${['TikTok','Instagram','YouTube','LinkedIn','Meta ads'].map(platform=>row(platform,'Not connected',`<button class="button-quiet" data-action="connect">Connect</button>`)).join('')}${row('Website visits','Allow website visit measurement',toggle(true))}${row('Account history','Let Fastlane read account history',toggle(true))}`;
      case 'API': return `<div class="panel-heading"><div><p class="eyebrow">CONNECTIONS</p><h2>API</h2><p>API credentials are not exposed in this local preview.</p></div></div><div class="empty-note">No keys are shown or stored here.</div><button class="button-outline" data-action="account-edit">API documentation</button>`;
      default: return `<div class="panel-heading"><h2>${escapeHTML(name)}</h2></div><div class="empty-note">Tour replay opens the workspace tour.</div>`;
    }
  }
  function settingsView() {
    const nav = Object.entries(menuSettings).map(([section,items])=>`<div class="settings-group"><small>${section.toUpperCase()}</small>${items.map(item=>`<button class="${state.settingsTab===item?'active':''}" data-action="settings-tab" data-tab="${item}">${item}</button>`).join('')}</div>`).join('');
    return `<div class="page-header"><div><p class="eyebrow">WORKSPACE PREFERENCES</p><h1>Settings</h1><p>Manage your account, workspace, Senna and connections.</p></div><button class="button-quiet" data-action="tour">Replay tour</button></div><div class="settings-layout"><nav class="settings-nav" aria-label="Settings sections">${nav}<button data-action="settings-tab" data-tab="Tour replay">Replay tour</button></nav><section class="panel settings-content">${settingContent(state.settingsTab)}</section></div>`;
  }
  function chatView() {
    return `<section class="chat-shell"><p class="eyebrow" style="text-align:center">NEW CHAT</p><h1>What are we working on?</h1><div class="chat-start"><textarea id="chat-prompt" placeholder="Ask Senna for an ad, a campaign, or anything about Fastlane" aria-label="Message Senna"></textarea><div class="composer-row"><button class="mini-chip" data-action="select-chip">Image</button><button class="mini-chip" data-action="select-chip">Video</button><button class="mini-chip" data-action="select-chip">Script</button><button class="mini-chip" data-action="select-chip">Campaign</button><span class="spacer"></span><button class="button-primary" data-action="send-prompt" disabled>Send</button></div></div><p class="eyebrow" style="text-align:center;margin-top:28px">OR START WITH ONE OF THESE</p><div class="chat-prompts">${['Make an image for People earning through companionship','Make a 15s video with a question hook','Write a script for Set Your Own Terms','Plan a campaign for People earning through companionship','Find new angles','How did last week go?','What is trending in my niche?','Which post did best?'].map(prompt=>`<button data-action="chat-prompt">${prompt}</button>`).join('')}</div><aside class="section panel"><div class="panel-heading"><div><p class="eyebrow">YOUR WORK</p><h2>3 made · Nothing in flight</h2></div><button class="text-link" data-action="activity">All activity →</button></div>${posts.map((post)=>`<p class="muted tiny">Saved a ${post.format.toLowerCase()}: Day ${post.day} of Starter campaign — ${escapeHTML(post.title)}</p>`).join('')}</aside></section>`;
  }
  function plannerView() {
    const stepTitles=['ANGLES','WHERE IT RUNS','ACCOUNTS','FORMAT AND PACE','REVIEW'];
    const step=state.plannerStep;
    const angleText={
      'Set Your Own Terms':'Companions set their own rates and availability on Rent Mate.',
      'Choose Each Booking':'You can approve or decline every booking request before communication starts.',
      'Get Secure Payouts':'Rent Mate provides secure payouts after companion bookings.',
      'Offer What You Do':'List companionship for coffee, tours, study, fitness, travel or networking.',
      'Build A Trusted Profile':'Verified bookings support reviews, profile visibility and recommendations.',
      'Work Around Your Schedule':'Choose your availability and offer public companionship on your own schedule.'
    };
    const selectedAngles=state.plannerAngles.map(a=>`<span class="angle-tag">${escapeHTML(a)}</span>`).join('');
    const selectedFormats=state.plannerFormats.map(a=>`<span class="angle-tag">${escapeHTML(a)}</span>`).join('');
    let content='';
    if(step===0) content=`<h2>Which angles does this campaign push?</h2><p class="muted tiny">At least 5, so posts don’t repeat.</p><div class="planner-options">${Object.entries(angleText).map(([name,description])=>`<label class="planner-option"><input type="checkbox" data-action="planner-angle" value="${escapeHTML(name)}" ${state.plannerAngles.includes(name)?'checked':''}><span><b>${escapeHTML(name)}</b><small>Hook: ${escapeHTML(description)} Why it works: Direct promise.</small></span><small>untested</small></label>`).join('')}</div>`;
    if(step===1) content=`<h2>Where does this campaign run?</h2><div class="planner-options">${['Organic posts','Ads only','Posts and ads'].map((name,index)=>`<label class="planner-option"><input type="radio" name="planner-run" data-action="planner-run" value="${name}" ${state.plannerRun===name?'checked':''}><span><b>${name}</b><small>${['The accounts you pick post for this campaign.','Ads run on your Meta ad account. Nothing is posted.','Posts from your accounts, plus ads from the same angles.'][index]}</small></span></label>`).join('')}</div>`;
    if(step===2) content=`<h2>Which accounts post it?</h2><p class="muted tiny">No accounts yet. Plan it now and connect one after; the campaign waits for an account before it starts.</p><div class="planner-inline"><label class="label">Platform<select class="field"><option>TikTok</option><option>Instagram</option><option>YouTube Shorts</option></select></label><label class="label">How many<select class="field"><option>1 account</option><option>2 accounts</option><option>3 accounts</option></select></label></div><div class="panel nested-panel"><b>Need an account?</b><p class="muted tiny">Warmed accounts are managed by Fastlane and need a paid plan.</p><button class="button-quiet" data-action="warmed">Buy warmed accounts</button></div>`;
    if(step===3) content=`<h2>What gets made, and how often?</h2><p class="eyebrow">FORMATS</p><div class="planner-format-row">${['Slideshow','Wall of text','Green screen','Video hook'].map(name=>`<label class="planner-pill"><input type="checkbox" data-action="planner-format" value="${name}" ${state.plannerFormats.includes(name)?'checked':''}>${name}</label>`).join('')}</div><p class="eyebrow section">CAMPAIGN LENGTH</p><div class="planner-length"><button class="button-outline" data-action="planner-weeks" data-delta="-1">−</button><b>${state.plannerWeeks} weeks</b><button class="button-outline" data-action="planner-weeks" data-delta="1">＋</button></div><p class="eyebrow section">HOW OFTEN EACH ACCOUNT POSTS</p><div class="planner-format-row">${['Every 3 days','Every 2 days','1 a day','2 a day','3 a day','Custom'].map(name=>`<label class="planner-pill"><input type="radio" name="planner-pace" data-action="planner-pace" value="${name}" ${state.plannerPace===name?'checked':''}>${name}</label>`).join('')}</div><div class="panel nested-panel">${state.plannerWeeks*7} posts each over ${state.plannerWeeks} weeks, once an account is on it.</div>`;
    if(step===4) content=`<p class="eyebrow">CAMPAIGN NAME</p><label class="label"><input class="field" id="planner-name" value="People earning through companionship · November" aria-label="Campaign name"></label><dl class="detail-list"><div><dt>Angles</dt><dd>${selectedAngles}</dd></div><div><dt>Runs on</dt><dd>${escapeHTML(state.plannerRun)}</dd></div><div><dt>Accounts</dt><dd>None yet</dd></div><div><dt>Formats</dt><dd>${selectedFormats}</dd></div><div><dt>Pace</dt><dd>${escapeHTML(state.plannerPace)} · ${state.plannerWeeks} weeks</dd></div><div><dt>Success looks like</dt><dd>${state.plannerWeeks*7} posts, 2 winners</dd></div></dl><div class="panel nested-panel">Adding this to the strategy does not start anything. The campaign waits for an account; add one on its page, then start it.</div>`;
    const nextLabel=step===4?'Add to strategy':'Confirm';
    return `<div class="planner-page"><div class="planner-title-row"><div><h1>Plan a campaign</h1><p><a href="#campaigns">Strategy</a> <span>›</span> People earning through companionship</p></div></div><section class="panel planner-panel"><div class="planner-count">${stepTitles[step]} · ${step+1} OF 5</div>${content}<div class="planner-actions"><button class="button-quiet" data-action="planner-back" ${step===0?'disabled':''}>Back</button><span class="spacer"></span><button class="button-primary" data-action="planner-next">${nextLabel}</button></div></section><div class="planner-step-dots">${['Angles','Accounts','Format and pace','Review'].map((label,index)=>`<span class="${(step<=1&&index===0)||(step===2&&index===1)||(step===3&&index===2)||(step===4&&index===3)?'active':''}">${label}</span>`).join('')}</div></div>`;
  }
  function render() {
    setBreadcrumb();
    document.title = `${viewLabels[state.view] || 'Home'} · Fastlane`;
    const view = {
      home:homeView,
      campaigns:campaignView,
      calendar:calendarView,
      'campaign-detail':campaignDetailView,
      'campaign-planner':plannerView,
      studio:studioView,
      brand:brandView,
      radar:radarView,
      analytics:analyticsView,
      warmed:warmedView,
      settings:settingsView,
      chat:chatView
    }[state.view] || homeView;
    app.innerHTML = view();
  }
  function showCredits() {
    openDrawer('Your credits','0 credits · 3 of 28 campaign posts made.',`<section class="drawer-section"><h3>CAMPAIGN</h3><div class="drawer-row"><span>Created posts</span><b>3</b></div><div class="drawer-row"><span>Drafts still to make</span><b>25 · 125 credits</b></div></section><section class="drawer-section"><h3>HOW IT WORKS</h3><p class="muted tiny">Nothing is made or charged until you choose Make. Launch asks for confirmation first. Drafts not made stay drafts.</p><p class="muted tiny">Review each post before it goes out. AI can make mistakes.</p></section><button class="button-primary" data-action="plans">See plans</button>`);
  }
  function showCampaignConfig() {
    openDrawer('Configure campaign','Starter campaign · Draft',`<section class="drawer-section"><h3>CAMPAIGN</h3><label class="label">Name<input class="field" value="Starter campaign" data-field="campaign-name"></label><div class="drawer-row"><span>Length</span><select><option>1 month · 28 posts</option><option>2 weeks · 14 posts</option><option>3 months · 84 posts</option></select></div><div class="drawer-row"><span>Timezone</span><select><option>India Standard Time · Kolkata</option><option>UTC</option></select></div></section><section class="drawer-section"><h3>HOW OFTEN EACH ACCOUNT POSTS</h3>${['Every 3 days','Every 2 days','1 a day','2 a day','3 a day','Custom'].map((option,index)=>`<label class="drawer-row"><span>${option}</span><input type="radio" name="pace" ${index===2?'checked':''}></label>`).join('')}</section><section class="drawer-section"><h3>ACCOUNTS AND ADS</h3><div class="drawer-row"><span>Accounts</span><b>None connected</b></div><div class="drawer-row"><span>Ads</span><b>None</b></div><div class="drawer-row"><span>Formats</span><b>Slideshow · Wall of text · Green screen</b></div></section><button class="button-outline" data-action="connect">Connect accounts</button>`);
  }
  function showPlans() {
    openDialog(`<p class="eyebrow">PLANS AND CREDITS</p><h2 id="dialog-title">Choose a plan</h2><p>Trial: 0 credits left. The local preview cannot buy a plan or credits.</p><div class="dialog-list">${[['Starter','$29 · 500 credits / month'],['Growth','$79 · 2,000 credits / month'],['Pro','$199 · 7,500 credits / month'],['Enterprise','Talk to the team']].map(([name,detail])=>`<button type="button" data-action="plan-details"><span><b>${name}</b><small>${detail}</small></span><span>→</span></button>`).join('')}</div><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Close</button></div>`);
  }
  function showConnect() {
    openDialog(`<p class="eyebrow">CONNECTIONS</p><h2 id="dialog-title">Connect an account</h2><p>Choose a channel to connect. Account authorization is disabled in this local clone; nothing will be shared.</p><div class="dialog-list">${['TikTok','Instagram','YouTube','LinkedIn','Meta ads'].map(name=>`<button type="button" data-action="connect-preview"><span><b>${name}</b><small>Not connected</small></span><span>Connect →</span></button>`).join('')}</div><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Cancel</button></div>`);
  }
  function showFormat(name) {
    const format = allFormats.find(item=>item[0]===name);
    const image = format?.[2] || 'assets/v2-fmt-product-hero-poster.jpg';
    openDialog(`<p class="eyebrow">FORMAT PREVIEW</p><h2 id="dialog-title">${escapeHTML(name)}</h2><p>Example output · ${escapeHTML(format?.[1]||'A format for your next post')}</p><img class="dialog-preview" src="${image}" alt="${escapeHTML(name)} example"><label class="label" for="format-notes">Anything Senna should know?</label><textarea class="field" id="format-notes" rows="3" placeholder="Add a brief or a detail to include"></textarea><p>12 credits · 0 available. Generation is unavailable in this preview.</p><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Close</button><button class="button-primary" disabled>Generate · 12 credits</button></div>`);
  }
  function openCampaignDay(day) {
    const index = day - 17;
    const date = new Date(2026, 10, day);
    const dateLabel = date.toLocaleDateString('en-US',{day:'numeric',month:'short'});
    const post = posts[index] || {title:`Draft post ${index+1}`,format:'Slideshow',angle:'Build A Trusted Profile',caption:'Not made yet.'};
    openDrawer(`${dateLabel} · Starter campaign`,index<3?'Created post':'Draft post',`<section class="drawer-section"><h3>POST DETAILS</h3><div class="drawer-row"><span>Time</span><b>18:00 · Calcutta</b></div><div class="drawer-row"><span>Title</span><b>${escapeHTML(post.title)}</b></div><div class="drawer-row"><span>Angle</span><b>${escapeHTML(post.angle)}</b></div><div class="drawer-row"><span>Format</span><b>${escapeHTML(post.format)}</b></div><div class="drawer-row"><span>Status</span><b>${index<3?'Created':'Draft'}</b></div></section><button class="button-outline" data-action="campaign-detail">Open post</button> <button class="button-quiet" data-action="edit-post">Edit caption</button>`);
  }
  function showSettingsEdit() {
    openDialog(`<p class="eyebrow">SETTINGS</p><h2 id="dialog-title">Edit setting</h2><p>This preference is shown for the local preview. Saving is not connected to an external account.</p><label class="label">Value<input class="field" placeholder="Enter a value"></label><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Cancel</button><button class="button-primary" data-action="save-preference">Save</button></div>`);
  }

  document.addEventListener('click', (event) => {
    const nav = event.target.closest('[data-view]');
    if (nav) return;
    const target = event.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    switch (action) {
      case 'campaigns': go('campaigns'); break;
      case 'calendar': go('calendar'); break;
      case 'campaign-detail': go('campaign-detail'); break;
      case 'radar': go('radar'); break;
      case 'activity': state.settingsTab='Activity'; go('settings'); break;
      case 'library': state.studioTab='library'; go('studio'); break;
      case 'studio-create': state.studioTab='create'; go('studio'); break;
      case 'plan-campaign': state.plannerStep=0; go('campaign-planner'); break;
      case 'campaign-config': showCampaignConfig(); break;
      case 'campaign-goal': openDialog(`<p class="eyebrow">CAMPAIGN GOAL</p><h2 id="dialog-title">Change your goal</h2><label class="label" for="campaign-goal-input">What are you working toward?</label><input class="field" id="campaign-goal-input" value="${escapeHTML(state.campaignGoal)}"><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Cancel</button><button class="button-primary" data-action="save-goal">Save goal</button></div>`); break;
      case 'persona': openDialog(`<p class="eyebrow">PERSONA</p><h2 id="dialog-title">People earning through companionship</h2><p>Adults who want to offer companion services on their own schedule and set their rates.</p><div class="dialog-list"><div><b>Wants</b><small>Flexible paid bookings</small></div><div><b>Barriers</b><small>Safe payments · clear plans · control over bookings</small></div><div><b>Buy journey</b><small>Profile → availability and rates → approve or decline → communicate after confirmation → secure payouts</small></div></div><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Close</button></div>`); break;
      case 'campaign-tab': break;
      case 'campaign-mode': state.campaignMode=target.dataset.mode; render(); break;
      case 'planner-next':
        if(state.plannerStep===0 && state.plannerAngles.length<5){showToast('Choose at least five angles.');break;}
        if(state.plannerStep===3 && state.plannerFormats.length===0){showToast('Choose at least one format.');break;}
        if(state.plannerStep<4){state.plannerStep+=1;render();break;}
        {const name=document.querySelector('#planner-name')?.value.trim()||'New campaign';state.plannerCampaigns.push(name);showToast('Added to the local strategy as a draft. It is not running.');go('campaigns');}
        break;
      case 'planner-back': state.plannerStep=Math.max(0,state.plannerStep-1);render();break;
      case 'planner-weeks': state.plannerWeeks=Math.min(12,Math.max(1,state.plannerWeeks+Number(target.dataset.delta)));render();break;
      case 'prev-post': state.campaignPost=Math.max(1,state.campaignPost-1); render(); break;
      case 'next-post': state.campaignPost=Math.min(28,state.campaignPost+1); render(); break;
      case 'skip-post': showToast('Post skipped in this local preview. Nothing was charged.'); break;
      case 'swap-post': openDialog(`<p class="eyebrow">SWAP FORMAT</p><h2 id="dialog-title">Try another format?</h2><p>Choose a format for this post. Making a replacement needs credits.</p><div class="dialog-list">${['Slideshow','Wall of text','Green screen','Video hook'].map(f=>`<button data-action="swap-format"><span>${f}</span><span>→</span></button>`).join('')}</div><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Cancel</button></div>`); break;
      case 'edit-post': openDialog(`<p class="eyebrow">EDIT POST</p><h2 id="dialog-title">Edit caption</h2><p>Changes stay in this local preview.</p><textarea class="field" id="caption-editor" rows="5">${escapeHTML(posts[(state.campaignPost-1)%posts.length].caption)}</textarea><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Cancel</button><button class="button-primary" data-action="save-caption">Save</button></div>`); break;
      case 'make-post': showCredits(); break;
      case 'credits': showCredits(); break;
      case 'plans': showPlans(); break;
      case 'connect': showConnect(); break;
      case 'connect-preview': showToast('Connection flow is not enabled in this local preview.'); break;
      case 'select-chip': target.setAttribute('aria-pressed',target.getAttribute('aria-pressed')!=='true'); break;
      case 'send-prompt': showToast('Senna is ready in this preview. Generation is not connected.'); break;
      case 'studio-tab': state.studioTab=target.dataset.tab; render(); break;
      case 'studio-section': document.getElementById(target.dataset.target)?.scrollIntoView({behavior:'smooth',block:'start'}); break;
      case 'studio-kind': state.studioKind=target.dataset.kind; render(); break;
      case 'studio-filter': state.studioFilter=target.dataset.filter; render(); break;
      case 'library-filter': state.libraryFilter=target.dataset.filter; render(); break;
      case 'format': showFormat(target.dataset.format); break;
      case 'upload': openDialog(`<p class="eyebrow">LIBRARY</p><h2 id="dialog-title">Upload media</h2><p>Uploads are disabled in this local preview. In Fastlane, images and video are stored in your workspace library.</p><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Close</button></div>`); break;
      case 'blitz-config': openDrawer('Configure Blitz','Set what daily suggestions can use.',`<section class="drawer-section"><h3>VOICE AND ANGLES</h3>${['Work Around Your Schedule','Build A Trusted Profile','Offer What You Do','Get Secure Payouts','Choose Each Booking','Set Your Own Terms'].map(a=>`<label class="drawer-row"><span>${a}</span><input type="checkbox" checked></label>`).join('')}</section><section class="drawer-section"><h3>CONTENT MIX</h3><div class="drawer-row"><span>Slideshow</span><b>25%</b></div><div class="drawer-row"><span>Wall of text</span><b>25%</b></div><div class="drawer-row"><span>Green screen</span><b>25%</b></div><div class="drawer-row"><span>Hook demo</span><b>25%</b></div></section><section class="drawer-section"><h3>VISUAL SOURCES</h3><div class="drawer-row"><span>Image sets</span><b>2</b></div><div class="drawer-row"><span>Own media mix</span><b>50%</b></div></section>`); break;
      case 'blitz-why': openDialog(`<p class="eyebrow">WHY THIS CONTENT</p><h2 id="dialog-title">Make flexible hours the hook</h2><p>This angle focuses on companions who want to set their own availability and choose bookings that fit.</p><div class="dialog-list"><div><b>Why it fits</b><small>Direct promise · Work Around Your Schedule</small></div><div><b>Audience barrier</b><small>Wants control over the plans and their time.</small></div></div><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Close</button></div>`); break;
      case 'blitz-approve': showCredits(); break;
      case 'blitz-skip': showToast('Suggestion skipped in this preview.'); break;
      case 'new-influencer': openDialog(`<p class="eyebrow">NEW INFLUENCER · 1 OF 4</p><h2 id="dialog-title">Choose a base image</h2><p>Choose how to create a character. Creating one costs credits; generation is not enabled here.</p><div class="dialog-list"><button data-action="influencer-option"><span><b>Generate base image</b><small>4 credits for the image · 984 credits for an influencer</small></span><span>→</span></button><button data-action="influencer-option"><span><b>Upload your own</b><small>Use an image from your files</small></span><span>→</span></button><button data-action="influencer-option"><span><b>Pick from gallery</b><small>Start with an existing character</small></span><span>→</span></button></div><label class="label">Name<input class="field" placeholder="Name this influencer"></label><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Cancel</button><button class="button-primary" data-action="influencer-next">Continue</button></div>`); break;
      case 'influencer-examples': openDialog(`<p class="eyebrow">INFLUENCER EXAMPLES</p><h2 id="dialog-title">See it with influencers</h2><p>Consistent characters keep the same face across image and video posts.</p><div class="influencer-example-grid"><img src="assets/Cb95Iu8xbpZqBi8tyAycpXpVmhk.jpg" alt="Example character"><img src="assets/XivMmgpidqC1ftvMQpuDShYcU.png" alt="Example character"><img src="assets/ZBNmFJXd200GE6SX493nUzTBxQ.jpg" alt="Example character"></div><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Close</button><button class="button-primary" data-action="new-influencer">New influencer</button></div>`); break;
      case 'influencer-option': target.classList.toggle('selected'); break;
      case 'influencer-next': showToast('Character generation needs credits and is unavailable in this preview.'); break;
      case 'brand-tab': state.brandTab=target.dataset.tab; render(); break;
      case 'brand-edit': case 'add-item': case 'site-scan': case 'account-edit': showSettingsEdit(); break;
      case 'radar-filter': state.radarFilter=target.dataset.filter; if(!overlay.hidden) closeDialog(); render(); break;
      case 'radar-keyword': state.radarSearch=target.dataset.term; render(); break;
      case 'radar-sort': showToast('Showing the most relevant ads first.'); break;
      case 'radar-settings': openDialog(`<p class="eyebrow">RADAR FILTERS</p><h2 id="dialog-title">Filter ads</h2><p>Use the brand chips and search field to narrow the visible preview.</p><div class="dialog-list">${['All','Bumble','Meetup','LetMeBuddy','In your space'].map(filter=>`<button data-action="radar-filter" data-filter="${filter}"><span>${filter}</span><span>${state.radarFilter===filter?'✓':'→'}</span></button>`).join('')}</div><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Close</button></div>`); break;
      case 'radar-remix': openDialog(`<p class="eyebrow">REMIX</p><h2 id="dialog-title">Remix for Rent Mate</h2><p>Review a competitor idea, then adapt it to your brand. Remix generation needs credits and is unavailable in this preview.</p><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Close</button><button class="button-primary" data-action="plans">See plans</button></div>`); break;
      case 'analytics-mode': state.analyticsMode=target.dataset.mode; render(); break;
      case 'calendar-day': openCampaignDay(Number(target.dataset.day)); break;
      case 'calendar-prev': state.calendarMonth=new Date(state.calendarMonth.getFullYear(),state.calendarMonth.getMonth()-1,1); render(); break;
      case 'calendar-next': state.calendarMonth=new Date(state.calendarMonth.getFullYear(),state.calendarMonth.getMonth()+1,1); render(); break;
      case 'settings-tab': state.settingsTab=target.dataset.tab; render(); break;
      case 'tour': showToast('Workspace tour replay is not available in this local preview.'); break;
      case 'profile-menu': openDialog(`<p class="eyebrow">ACCOUNT</p><h2 id="dialog-title">Deneal</h2><p>Rent Mate workspace · Owner</p><div class="dialog-list"><button data-action="settings"><span>Settings</span><span>→</span></button><button data-action="refer"><span>Refer and earn</span><span>→</span></button><button data-action="help"><span>Support</span><span>→</span></button><button data-action="sign-out"><span>Sign out</span><span>↗</span></button></div>`); break;
      case 'settings': go('settings'); closeDialog(); break;
      case 'warmed': go('warmed'); document.querySelector('.drawer-panel')?.remove(); break;
      case 'refer': openDialog(`<p class="eyebrow">REFER AND EARN</p><h2 id="dialog-title">Invite a friend</h2><p>Referral details are not configured in this preview.</p><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Close</button></div>`); break;
      case 'help': openDialog(`<p class="eyebrow">SUPPORT</p><h2 id="dialog-title">How can we help?</h2><p>Support options shown in Fastlane include help articles and contacting the team. This preview does not send a message.</p><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Close</button></div>`); break;
      case 'new-chat': case 'chat': go('chat'); break;
      case 'chat-prompt': document.querySelector('#chat-prompt').value=target.textContent.trim(); document.querySelector('#chat-prompt').focus(); break;
      case 'close-dialog': closeDialog(); break;
      case 'close-drawer': closeDrawer(); break;
      case 'save-caption': {
        const caption = document.querySelector('#caption-editor').value;
        posts[(state.campaignPost-1)%posts.length].caption=caption;
        closeDialog();
        showToast('Caption saved in this local preview.');
        break;
      }
      case 'save-preference': closeDialog(); showToast('Saved in this local preview.'); break;
      case 'save-goal': state.campaignGoal=document.querySelector('#campaign-goal-input')?.value.trim()||state.campaignGoal; closeDialog(); render(); showToast('Campaign goal saved in this preview.'); break;
      case 'swap-format': closeDialog(); showToast('Format preference updated in this preview.'); break;
      case 'plan-details': showToast('Plan selection is not connected to billing.'); break;
      case 'later': target.closest('.version-card')?.remove(); break;
      case 'refresh': showToast('This local preview is already on the latest version.'); break;
      case 'sign-out': sessionStorage.removeItem('fastlane-demo-session'); location.assign('/login.html'); break;
      case 'journey': break;
      case 'blitz': state.studioTab='blitz'; go('studio'); break;
      default: break;
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target.matches('[data-compose],#chat-prompt')) {
      const send = event.target.closest('.composer-box,.chat-start')?.querySelector('[data-action="send-prompt"]');
      if (send) send.disabled = event.target.value.trim().length === 0;
    }
    if (event.target.id === 'studio-search') {
      const start=event.target.selectionStart;
      state.studioSearch=event.target.value;
      render();
      const updated=document.querySelector('#studio-search');
      updated?.focus();
      updated?.setSelectionRange(start,start);
    }
    if (event.target.id === 'radar-search') {
      const start=event.target.selectionStart;
      state.radarSearch=event.target.value;
      render();
      const updated=document.querySelector('#radar-search');
      updated?.focus();
      updated?.setSelectionRange(start,start);
    }
  });
  document.addEventListener('change', (event) => {
    const control=event.target;
    if(control.matches('[data-action="planner-angle"]')){
      state.plannerAngles=Array.from(document.querySelectorAll('[data-action="planner-angle"]:checked')).map(input=>input.value);
    }
    if(control.matches('[data-action="planner-run"]')) state.plannerRun=control.value;
    if(control.matches('[data-action="planner-format"]')){
      state.plannerFormats=Array.from(document.querySelectorAll('[data-action="planner-format"]:checked')).map(input=>input.value);
    }
    if(control.matches('[data-action="planner-pace"]')) state.plannerPace=control.value;
  });
  document.addEventListener('keydown', (event) => {
    const activeDialog = !overlay.hidden ? overlay.querySelector('.fl-dialog') : document.querySelector('.drawer-panel');
    if (event.key === 'Escape' && activeDialog) {
      event.preventDefault();
      if (!overlay.hidden) closeDialog();
      else closeDrawer();
      return;
    }
    if (event.key === 'Tab' && activeDialog) trapTab(activeDialog, event);
    if (event.key === 'Enter' && !event.shiftKey && event.target.matches('[data-compose],#chat-prompt')) {
      event.preventDefault();
      event.target.closest('.composer-box,.chat-start')?.querySelector('[data-action="send-prompt"]:not(:disabled)')?.click();
    }
    if ((event.key==='Enter'||event.key===' ') && event.target.matches('.studio-card[role="button"]')) showFormat(event.target.dataset.format);
  });
  overlay.addEventListener('click',(event)=>{if(event.target===overlay)closeDialog();});
  document.querySelector('#workspace-switch')?.addEventListener('click',()=>openDialog(`<p class="eyebrow">WORKSPACES</p><h2 id="dialog-title">Choose a workspace</h2><div class="dialog-list"><button data-action="close-dialog"><span><b>Rent Mate</b><small>Current workspace</small></span><span>✓</span></button><button data-action="plan-details"><span><b>＋ New workspace</b><small>1 of 3 available on this plan</small></span><span>→</span></button></div><div class="dialog-actions"><button class="button-outline" data-action="close-dialog">Close</button></div>`));
  window.addEventListener('hashchange',syncRoute);
  if (sessionStorage.getItem('fastlane-demo-session') === 'active') render();
})();
