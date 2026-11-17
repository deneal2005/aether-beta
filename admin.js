(() => {
  'use strict';

  const STORAGE_KEY = 'fastlane-admin-preview-v1';
  const THEME_KEY = 'fastlane-admin-theme-v1';
  const PAGE_LABELS = {
    overview: 'Overview', analytics: 'Analytics', users: 'Users', customers: 'Customers',
    products: 'Products', orders: 'Orders', transactions: 'Transactions', reports: 'Reports',
    notifications: 'Notifications', settings: 'Settings'
  };
  const ICONS = {
    overview: '<rect x="3" y="3" width="6" height="6" rx="1.4"/><rect x="13" y="3" width="8" height="4" rx="1.4"/><rect x="13" y="11" width="8" height="10" rx="1.4"/><rect x="3" y="13" width="6" height="8" rx="1.4"/>',
    analytics: '<path d="M3 19V5M3 19h18"/><path d="m6 15 4-4 3 2 6-7"/><path d="M16 6h3v3"/>',
    users: '<path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-6A3.5 3.5 0 0 0 3 18.5V20"/><circle cx="9.5" cy="7" r="3.5"/><path d="M17 11a3.3 3.3 0 0 0 0-6.4M21 20v-1.5a3.5 3.5 0 0 0-2.7-3.4"/>',
    customers: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20v-1.4A4.6 4.6 0 0 1 7.1 14h3.8a4.6 4.6 0 0 1 4.6 4.6V20M17 4.8a3.5 3.5 0 0 1 0 6.4M18.3 14.3a4.6 4.6 0 0 1 3.2 4.3V20"/>',
    products: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4.5 7.7 7.5 4.2 7.5-4.2M12 12v9M8 5.3l8 4.5"/>',
    orders: '<path d="M4 4h16l-1.5 16h-13L4 4Z"/><path d="M8 8a4 4 0 0 0 8 0M8 4V3h8v1"/>',
    transactions: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
    reports: '<path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M8 13h8M8 17h8"/>',
    notifications: '<path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.2 1-1.2 2.1-1.5-.5a8 8 0 0 1-1.7 1l-.3 1.6h-2.4l-.3-1.6a8 8 0 0 1-1.8-1l-1.4.5-1.2-2.1 1.2-1.1a7 7 0 0 1 0-2l-1.2-1.1L8.1 10l1.4.5a8 8 0 0 1 1.8-1l.3-1.6H14l.3 1.6a8 8 0 0 1 1.7 1l1.5-.5 1.2 2.1-1.2 1.1a7 7 0 0 1-.1 1.8Z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    filter: '<path d="M4 6h16M7 12h10m-7 6h4"/><circle cx="8" cy="6" r="1.5"/><circle cx="15" cy="12" r="1.5"/><circle cx="11" cy="18" r="1.5"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9a2.5 2.5 0 1 1 4.2 1.8c-1.1 1-1.8 1.3-1.8 2.7M12 17h.01"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    dots: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    revenue: '<path d="M12 2v20M17 6.5c-.7-1.3-2.2-2-4.3-2-2.5 0-4.2 1.1-4.2 3s1.3 2.8 4.4 3.4c3 .6 4.4 1.6 4.4 3.5 0 2-1.8 3.4-4.6 3.4-2.2 0-4-.8-4.8-2.3"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    conversion: '<path d="M4 5h16M6 10h12m-9 5h6m-4 5h2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    bolt: '<path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z"/>'
  };

  const SEED_DATA = {
    users: [
      { id: 'USR-1048', name: 'Deneal Smith', email: 'deneal@fastlane.example', role: 'Owner', status: 'Active', joined: 'Nov 12, 2026' },
      { id: 'USR-1047', name: 'Maya Chen', email: 'maya@fastlane.example', role: 'Admin', status: 'Active', joined: 'Nov 10, 2026' },
      { id: 'USR-1046', name: 'Ishan Patel', email: 'ishan@fastlane.example', role: 'Member', status: 'Active', joined: 'Nov 08, 2026' },
      { id: 'USR-1045', name: 'Olivia Martin', email: 'olivia@fastlane.example', role: 'Member', status: 'Invited', joined: 'Nov 06, 2026' },
      { id: 'USR-1044', name: 'Noah Williams', email: 'noah@fastlane.example', role: 'Analyst', status: 'Active', joined: 'Nov 04, 2026' },
      { id: 'USR-1043', name: 'Ava Thompson', email: 'ava@fastlane.example', role: 'Member', status: 'Inactive', joined: 'Oct 29, 2026' },
      { id: 'USR-1042', name: 'Leo Garcia', email: 'leo@fastlane.example', role: 'Member', status: 'Active', joined: 'Oct 27, 2026' }
    ],
    customers: [
      { id: 'CUS-2081', name: 'Arjun Mehta', company: 'Northstar Labs', email: 'arjun@northstar.example', plan: 'Growth', status: 'Active', spend: 1840, created: 'Nov 14, 2026' },
      { id: 'CUS-2080', name: 'Sofia Wilson', company: 'Common Ground', email: 'sofia@commonground.example', plan: 'Pro', status: 'Active', spend: 5680, created: 'Nov 11, 2026' },
      { id: 'CUS-2079', name: 'Rohan Das', company: 'Paper Kite', email: 'rohan@paperkite.example', plan: 'Starter', status: 'Trial', spend: 290, created: 'Nov 09, 2026' },
      { id: 'CUS-2078', name: 'Elena Petrova', company: 'Peak Studio', email: 'elena@peakstudio.example', plan: 'Growth', status: 'Active', spend: 2350, created: 'Nov 06, 2026' },
      { id: 'CUS-2077', name: 'Ben Carter', company: 'Daybreak Co.', email: 'ben@daybreak.example', plan: 'Starter', status: 'Past due', spend: 580, created: 'Nov 02, 2026' },
      { id: 'CUS-2076', name: 'Aisha Khan', company: 'Lumen Health', email: 'aisha@lumen.example', plan: 'Pro', status: 'Active', spend: 6420, created: 'Oct 28, 2026' }
    ],
    products: [
      { id: 'PRD-3312', name: 'Growth workspace', category: 'Subscription', price: 79, stock: 999, sales: 248, status: 'Active', date: 'Nov 16, 2026' },
      { id: 'PRD-3311', name: 'Starter workspace', category: 'Subscription', price: 29, stock: 999, sales: 194, status: 'Active', date: 'Nov 15, 2026' },
      { id: 'PRD-3310', name: 'Pro workspace', category: 'Subscription', price: 199, stock: 999, sales: 126, status: 'Active', date: 'Nov 14, 2026' },
      { id: 'PRD-3309', name: 'Creative credits · 500', category: 'Add-on', price: 19, stock: 850, sales: 81, status: 'Active', date: 'Nov 12, 2026' },
      { id: 'PRD-3308', name: 'Warmed account', category: 'Service', price: 100, stock: 48, sales: 32, status: 'Limited', date: 'Nov 10, 2026' }
    ],
    orders: [
      { id: 'ORD-5419', customer: 'Arjun Mehta', product: 'Growth workspace', amount: 79, status: 'Paid', date: 'Nov 17, 2026' },
      { id: 'ORD-5418', customer: 'Sofia Wilson', product: 'Pro workspace', amount: 199, status: 'Paid', date: 'Nov 17, 2026' },
      { id: 'ORD-5417', customer: 'Rohan Das', product: 'Starter workspace', amount: 29, status: 'Pending', date: 'Nov 16, 2026' },
      { id: 'ORD-5416', customer: 'Elena Petrova', product: 'Growth workspace', amount: 79, status: 'Paid', date: 'Nov 16, 2026' },
      { id: 'ORD-5415', customer: 'Ben Carter', product: 'Creative credits · 500', amount: 19, status: 'Failed', date: 'Nov 15, 2026' },
      { id: 'ORD-5414', customer: 'Aisha Khan', product: 'Pro workspace', amount: 199, status: 'Paid', date: 'Nov 14, 2026' }
    ],
    transactions: [
      { id: 'TXN-88031', customer: 'Sofia Wilson', description: 'Pro workspace · Monthly', amount: 199, method: 'Visa ···· 4242', status: 'Completed', date: 'Nov 17, 2026' },
      { id: 'TXN-88030', customer: 'Arjun Mehta', description: 'Growth workspace · Monthly', amount: 79, method: 'Mastercard ···· 1088', status: 'Completed', date: 'Nov 17, 2026' },
      { id: 'TXN-88029', customer: 'Rohan Das', description: 'Starter workspace · Monthly', amount: 29, method: 'Visa ···· 8721', status: 'Pending', date: 'Nov 16, 2026' },
      { id: 'TXN-88028', customer: 'Elena Petrova', description: 'Growth workspace · Monthly', amount: 79, method: 'Amex ···· 3014', status: 'Completed', date: 'Nov 16, 2026' },
      { id: 'TXN-88027', customer: 'Ben Carter', description: 'Creative credits · 500', amount: 19, method: 'Visa ···· 6180', status: 'Failed', date: 'Nov 15, 2026' },
      { id: 'TXN-88026', customer: 'Aisha Khan', description: 'Pro workspace · Monthly', amount: 199, method: 'Mastercard ···· 4491', status: 'Completed', date: 'Nov 14, 2026' },
      { id: 'TXN-88025', customer: 'Maya Chen', description: 'Warmed account · Monthly', amount: 100, method: 'Visa ···· 4242', status: 'Completed', date: 'Nov 14, 2026' }
    ],
    notifications: [
      { id: 'NTF-901', title: 'Monthly revenue is up 12.8%', detail: 'Growth and Pro plans drove the increase this month.', time: '12 minutes ago', type: 'revenue', read: false },
      { id: 'NTF-900', title: 'New customer joined', detail: 'Arjun Mehta started a Growth workspace.', time: '48 minutes ago', type: 'customer', read: false },
      { id: 'NTF-899', title: 'Payment needs attention', detail: 'Order ORD-5415 could not be processed.', time: '2 hours ago', type: 'payment', read: false },
      { id: 'NTF-898', title: 'Weekly report is ready', detail: 'Your workspace summary for Nov 9–15 is available.', time: 'Yesterday', type: 'report', read: true }
    ],
    activities: [
      { title: 'New workspace created', detail: 'Arjun Mehta · Growth plan', time: '12 min ago', icon: '＋', tone: 'green' },
      { title: 'Payment received', detail: 'Sofia Wilson · $199.00', time: '48 min ago', icon: '$', tone: 'orange' },
      { title: 'Product updated', detail: 'Creative credits · 500', time: '2 hours ago', icon: '↗', tone: '' },
      { title: 'Team member invited', detail: 'olivia@fastlane.example', time: 'Yesterday', icon: '＋', tone: 'green' }
    ],
    settings: { name: 'Deneal Smith', email: 'deneal@fastlane.example', timezone: 'Asia/Kolkata', dateFormat: 'MMM D, YYYY', weeklyDigest: true, productUpdates: false, securityAlerts: true }
  };

  const ENTITY_DEFS = {
    users: {
      title: 'Users', singular: 'user', subtitle: 'Manage workspace access, roles, and invitations.', searchKeys: ['id', 'name', 'email', 'role', 'status'],
      fields: [
        { key: 'name', label: 'Full name', type: 'text', required: true },
        { key: 'email', label: 'Email address', type: 'email', required: true },
        { key: 'role', label: 'Role', type: 'select', options: ['Owner', 'Admin', 'Analyst', 'Member'] },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Invited', 'Inactive'] }
      ],
      columns: [
        { key: 'name', label: 'USER', render: (item) => personCell(item.name, item.email) },
        { key: 'role', label: 'ROLE' }, { key: 'status', label: 'STATUS', render: (item) => statusPill(item.status) }, { key: 'joined', label: 'JOINED' }
      ]
    },
    customers: {
      title: 'Customers', singular: 'customer', subtitle: 'Understand customer plans, value, and account health.', searchKeys: ['id', 'name', 'company', 'email', 'plan', 'status'],
      fields: [
        { key: 'name', label: 'Contact name', type: 'text', required: true },
        { key: 'company', label: 'Company', type: 'text', required: true },
        { key: 'email', label: 'Email address', type: 'email', required: true },
        { key: 'plan', label: 'Plan', type: 'select', options: ['Starter', 'Growth', 'Pro', 'Enterprise'] },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Trial', 'Past due', 'Cancelled'] },
        { key: 'spend', label: 'Lifetime value ($)', type: 'number', min: 0, step: 1, required: true }
      ],
      columns: [
        { key: 'name', label: 'CUSTOMER', render: (item) => personCell(item.name, item.email) }, { key: 'company', label: 'COMPANY' },
        { key: 'plan', label: 'PLAN' }, { key: 'spend', label: 'LIFETIME VALUE', render: (item) => `<span class="amount-cell">${currency(item.spend)}</span>` },
        { key: 'status', label: 'STATUS', render: (item) => statusPill(item.status) }
      ]
    },
    products: {
      title: 'Products', singular: 'product', subtitle: 'Keep pricing, availability, and product performance up to date.', searchKeys: ['id', 'name', 'category', 'status'],
      fields: [
        { key: 'name', label: 'Product name', type: 'text', required: true },
        { key: 'category', label: 'Category', type: 'select', options: ['Subscription', 'Add-on', 'Service'] },
        { key: 'price', label: 'Price ($)', type: 'number', min: 0, step: 0.01, required: true },
        { key: 'stock', label: 'Availability', type: 'number', min: 0, step: 1, required: true },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Limited', 'Archived'] }
      ],
      columns: [
        { key: 'name', label: 'PRODUCT', render: (item) => productCell(item.name, item.category) },
        { key: 'price', label: 'PRICE', render: (item) => `<span class="amount-cell">${currency(item.price)}</span>` },
        { key: 'stock', label: 'AVAILABLE', render: (item) => item.stock > 900 ? 'Unlimited' : escapeHtml(item.stock) },
        { key: 'sales', label: 'SALES', render: (item) => escapeHtml(item.sales ?? 0) },
        { key: 'status', label: 'STATUS', render: (item) => statusPill(item.status) }
      ]
    },
    orders: {
      title: 'Orders', singular: 'order', subtitle: 'Review incoming orders and payment progress.', searchKeys: ['id', 'customer', 'product', 'status'],
      fields: [
        { key: 'customer', label: 'Customer', type: 'text', required: true },
        { key: 'product', label: 'Product', type: 'text', required: true },
        { key: 'amount', label: 'Amount ($)', type: 'number', min: 0, step: 0.01, required: true },
        { key: 'status', label: 'Status', type: 'select', options: ['Paid', 'Pending', 'Failed', 'Refunded'] }
      ],
      columns: [
        { key: 'id', label: 'ORDER', render: (item) => `<span class="mono-label">${escapeHtml(item.id)}</span>` }, { key: 'customer', label: 'CUSTOMER', render: (item) => personCell(item.customer, item.date) },
        { key: 'product', label: 'PRODUCT' }, { key: 'amount', label: 'AMOUNT', render: (item) => `<span class="amount-cell">${currency(item.amount)}</span>` },
        { key: 'status', label: 'STATUS', render: (item) => statusPill(item.status) }
      ]
    },
    transactions: {
      title: 'Transactions', singular: 'transaction', subtitle: 'Track payments processed across your workspace.', searchKeys: ['id', 'customer', 'description', 'method', 'status'],
      fields: [
        { key: 'customer', label: 'Customer', type: 'text', required: true },
        { key: 'description', label: 'Description', type: 'text', required: true },
        { key: 'amount', label: 'Amount ($)', type: 'number', min: 0, step: 0.01, required: true },
        { key: 'method', label: 'Payment method', type: 'text', required: true },
        { key: 'status', label: 'Status', type: 'select', options: ['Completed', 'Pending', 'Failed', 'Refunded'] }
      ],
      columns: [
        { key: 'id', label: 'TRANSACTION', render: (item) => `<span class="mono-label">${escapeHtml(item.id)}</span>` },
        { key: 'customer', label: 'CUSTOMER' }, { key: 'description', label: 'DESCRIPTION' }, { key: 'method', label: 'PAYMENT METHOD' },
        { key: 'amount', label: 'AMOUNT', render: (item) => `<span class="amount-cell">${currency(item.amount)}</span>` },
        { key: 'status', label: 'STATUS', render: (item) => statusPill(item.status) }
      ]
    }
  };

  const RANGE_DATA = {
    week: {
      label: 'This week', labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      revenue: [18, 24, 20, 31, 27, 39, 42], previousRevenue: [15, 18, 22, 23, 24, 28, 31],
      users: [120, 146, 138, 172, 166, 198, 218], previousUsers: [102, 111, 127, 136, 147, 156, 169],
      totals: { revenue: 24180, mrr: 80210, users: 9528, customers: 2841, conversion: 4.86, churn: 4.11, churnChange: -0.12, revenueChange: 8.2, usersChange: 5.6 }
    },
    month: {
      label: 'This month', labels: ['Nov 1', 'Nov 5', 'Nov 9', 'Nov 13', 'Nov 17', 'Nov 21', 'Nov 25', 'Nov 29'],
      revenue: [28, 37, 32, 49, 45, 58, 54, 72], previousRevenue: [23, 28, 31, 34, 41, 42, 47, 51],
      users: [92, 114, 105, 141, 130, 158, 167, 196], previousUsers: [76, 89, 93, 105, 117, 121, 134, 149],
      totals: { revenue: 128640, mrr: 86420, users: 9528, customers: 2841, conversion: 4.86, churn: 4.26, churnChange: -0.31, revenueChange: 12.8, usersChange: 9.5 }
    },
    year: {
      label: 'This year', labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      revenue: [22, 25, 31, 29, 38, 42, 49, 48, 56, 62, 71, 75], previousRevenue: [18, 20, 24, 25, 28, 32, 34, 38, 40, 43, 49, 55],
      users: [76, 84, 97, 104, 119, 131, 147, 158, 171, 184, 205, 218], previousUsers: [62, 70, 76, 83, 91, 101, 112, 118, 130, 141, 156, 167],
      totals: { revenue: 1089640, mrr: 102860, users: 9528, customers: 2841, conversion: 4.72, churn: 4.82, churnChange: 0.22, revenueChange: 18.4, usersChange: 22.1 }
    }
  };

  const state = {
    page: location.hash.slice(1) || 'overview',
    range: 'month',
    chartMetric: 'revenue',
    productMetric: 'sales',
    data: loadData(),
    table: {},
    settingsTab: 'profile',
    pendingDelete: null,
    searchQuery: '',
    searchIndex: 0,
    popoverOwner: null,
    toastTimer: null
  };
  const main = document.querySelector('#main-content');
  const dialog = document.querySelector('#record-dialog');
  const floatingPanel = document.querySelector('#floating-panel');
  const globalSearch = document.querySelector('#global-search');

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function loadData() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!saved || saved.version !== 1) return { ...clone(SEED_DATA), version: 1 };
      return { ...clone(SEED_DATA), ...saved, version: 1 };
    } catch {
      return { ...clone(SEED_DATA), version: 1 };
    }
  }
  function persistData() {
    try {
      state.data.version = 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
      return true;
    } catch {
      showToast('Browser storage is unavailable. Changes will last until this tab closes.');
      return false;
    }
  }
  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  }
  function icon(name, className = '') {
    return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.help}</svg>`;
  }
  function currency(value) {
    const amount = Number(value) || 0;
    const maximumFractionDigits = amount % 1 ? 2 : 0;
    return state.data.settings.showUsd === false
      ? new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(amount)
      : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits }).format(amount);
  }
  function number(value) { return new Intl.NumberFormat('en-US').format(Number(value) || 0); }
  function shortNumber(value) {
    const amount = Number(value) || 0;
    return amount >= 1000000 ? `${(amount / 1000000).toFixed(1)}m` : amount >= 1000 ? `${(amount / 1000).toFixed(amount >= 100000 ? 0 : 1)}k` : String(amount);
  }
  function initials(name) { return String(name || '?').split(/\s+/).slice(0, 2).map((part) => part[0] || '').join('').toUpperCase(); }
  function avatarTone(name) {
    const tones = ['','coral','green'];
    let score = 0;
    for (const character of String(name)) score += character.charCodeAt(0);
    return tones[score % tones.length];
  }
  function personCell(name, detail = '') {
    return `<div class="person-cell"><span class="mini-avatar ${avatarTone(name)}">${escapeHtml(initials(name))}</span><span class="person-detail"><strong>${escapeHtml(name)}</strong><small>${escapeHtml(detail)}</small></span></div>`;
  }
  function productCell(name, detail = '') {
    return `<div class="person-cell"><span class="mini-avatar">${icon('products')}</span><span class="person-detail"><strong>${escapeHtml(name)}</strong><small>${escapeHtml(detail)}</small></span></div>`;
  }
  function statusPill(status) {
    const value = String(status || 'Active');
    const className = value.toLowerCase().replace(/[^a-z]+/g, '-');
    return `<span class="status-pill ${escapeHtml(className)}">${escapeHtml(value)}</span>`;
  }
  function showToast(message) {
    const toast = document.querySelector('#toast');
    toast.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2600);
  }
  function setTheme(theme) {
    const chosen = theme === 'dark' ? 'dark' : 'light';
    document.body.dataset.theme = chosen;
    const button = document.querySelector('[data-action="toggle-theme"]');
    button.setAttribute('aria-label', `Switch to ${chosen === 'dark' ? 'light' : 'dark'} mode`);
    button.querySelector('.theme-icon').textContent = chosen === 'dark' ? '☼' : '☾';
    try { localStorage.setItem(THEME_KEY, chosen); } catch { /* The dashboard remains usable without storage. */ }
  }
  function activeRange() { return RANGE_DATA[state.range] || RANGE_DATA.month; }
  function metricCard(title, value, change, context, iconName, tone = '', lowerIsBetter = false, changeUnit = '%') {
    const positive = lowerIsBetter ? Number(change) <= 0 : Number(change) >= 0;
    return `<article class="metric-card"><div class="metric-top"><span class="metric-title">${escapeHtml(title)}</span><span class="metric-icon ${tone}">${icon(iconName)}</span></div><strong class="metric-value">${value}</strong><div class="metric-bottom"><span class="metric-change ${positive ? '' : 'down'}">${Number(change) >= 0 ? '↗' : '↘'} ${Math.abs(Number(change)).toFixed(1)}${changeUnit}</span><span class="metric-context">${escapeHtml(context)}</span></div></article>`;
  }
  function points(values, width, height, min, max, left, top, bottom) {
    const plotHeight = height - top - bottom;
    const plotWidth = width - left - 8;
    return values.map((value, index) => ({
      x: left + (values.length === 1 ? 0 : (index / (values.length - 1)) * plotWidth),
      y: top + (1 - ((value - min) / (max - min || 1))) * plotHeight,
      value
    }));
  }
  function makeLine(pointsList) {
    return pointsList.map((point, index) => `${index ? 'L' : 'M'}${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(' ');
  }
  function renderLineChart() {
    const range = activeRange();
    const current = state.chartMetric === 'revenue' ? range.revenue : range.users;
    const previous = state.chartMetric === 'revenue' ? range.previousRevenue : range.previousUsers;
    const width = 760; const height = 244; const left = 44; const top = 12; const bottom = 31;
    const max = Math.ceil(Math.max(...current, ...previous) / 10) * 10;
    const min = 0;
    const currentPoints = points(current, width, height, min, max, left, top, bottom);
    const previousPoints = points(previous, width, height, min, max, left, top, bottom);
    const currentPath = makeLine(currentPoints);
    const previousPath = makeLine(previousPoints);
    const areaPath = `${currentPath} L${currentPoints.at(-1).x.toFixed(2)},${height-bottom} L${currentPoints[0].x.toFixed(2)},${height-bottom} Z`;
    const labelStep = Math.max(1, Math.ceil(range.labels.length / 8));
    const yLabels = Array.from({ length: 5 }, (_, index) => {
      const value = max - (max * index / 4);
      const y = top + ((height - top - bottom) * index / 4);
      const prefix = state.chartMetric === 'revenue' && state.data.settings.showUsd !== false ? '$' : '';
      return `<line class="chart-gridline" x1="${left}" y1="${y}" x2="${width-8}" y2="${y}"/><text class="chart-label" x="${left-9}" y="${y+3}" text-anchor="end">${state.chartMetric === 'revenue' ? `${prefix}${shortNumber(value * 1000)}` : shortNumber(value * 1000)}</text>`;
    }).join('');
    const xLabels = range.labels.map((label, index) => index % labelStep === 0 || index === range.labels.length-1
      ? `<text class="chart-label" x="${currentPoints[index].x}" y="${height-7}" text-anchor="middle">${escapeHtml(label)}</text>` : '').join('');
    const currentDots = currentPoints.map((point, index) => `<circle class="chart-point" cx="${point.x}" cy="${point.y}" r="3.2" tabindex="0" aria-label="${escapeHtml(range.labels[index])}: ${state.chartMetric === 'revenue' ? currency(point.value * 1000) : number(point.value * 1000) + ' users'}"><title>${escapeHtml(range.labels[index])}: ${state.chartMetric === 'revenue' ? currency(point.value * 1000) : number(point.value * 1000) + ' users'}</title></circle>`).join('');
    const previousDots = previousPoints.map((point, index) => `<circle class="chart-point secondary" cx="${point.x}" cy="${point.y}" r="2.2" tabindex="0" aria-label="Previous ${escapeHtml(range.labels[index])}: ${state.chartMetric === 'revenue' ? currency(point.value * 1000) : number(point.value * 1000) + ' users'}"><title>Previous ${escapeHtml(range.labels[index])}: ${state.chartMetric === 'revenue' ? currency(point.value * 1000) : number(point.value * 1000) + ' users'}</title></circle>`).join('');
    return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${state.chartMetric === 'revenue' ? 'Revenue' : 'Active users'} trend for ${escapeHtml(range.label)}"><defs><linearGradient id="revenue-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="var(--blue)" stop-opacity=".19"/><stop offset="100%" stop-color="var(--blue)" stop-opacity="0"/></linearGradient></defs>${yLabels}<path class="chart-area" d="${areaPath}"/><path class="chart-line secondary" d="${previousPath}"/><path class="chart-line" d="${currentPath}"/>${previousDots}${currentDots}${xLabels}</svg>`;
  }
  function renderProductBars() {
    const values = state.productMetric === 'sales' ? [248, 194, 126, 81, 32] : [39, 24, 20, 13, 4];
    const labels = state.productMetric === 'sales' ? ['Growth', 'Starter', 'Pro', 'Credits', 'Warmed'] : ['Growth', 'Starter', 'Pro', 'Credits', 'Warmed'];
    const max = Math.max(...values); const width = 430; const height = 194; const padLeft = 12; const baseline = 145; const barWidth = 43; const gap = 36;
    const bars = values.map((value, index) => {
      const x = padLeft + index * (barWidth + gap); const barHeight = 103 * value / max; const y = baseline - barHeight;
      const formatted = state.productMetric === 'sales' ? `${number(value)} sales` : `${currency(value * 1000)} revenue`;
      return `<rect class="bar-rect" x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" tabindex="0" aria-label="${escapeHtml(labels[index])}: ${escapeHtml(formatted)}"><title>${escapeHtml(labels[index])}: ${escapeHtml(formatted)}</title></rect><text class="bar-label" x="${x+barWidth/2}" y="${baseline+19}" text-anchor="middle">${escapeHtml(labels[index])}</text>`;
    }).join('');
    const grid = [0,1,2,3].map((index) => `<line class="chart-gridline" x1="0" y1="${baseline-index*34}" x2="${width}" y2="${baseline-index*34}"/>`).join('');
    return `<svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Product ${state.productMetric} comparison">${grid}${bars}</svg>`;
  }
  function renderDonut() {
    const segments = [38, 27, 21, 14];
    const colors = ['var(--blue)', 'var(--accent)', 'var(--green)', '#a17bda'];
    const radius = 62; const circumference = 2 * Math.PI * radius;
    let offset = 0;
    const arcs = segments.map((value, index) => {
      const length = circumference * value / 100;
      const arc = `<circle cx="100" cy="100" r="${radius}" fill="none" stroke="${colors[index]}" stroke-width="15" stroke-dasharray="${length} ${circumference-length}" stroke-dashoffset="${-offset}" transform="rotate(-90 100 100)" tabindex="0" aria-label="${['Growth','Starter','Pro','Enterprise'][index]}: ${value}%"><title>${['Growth','Starter','Pro','Enterprise'][index]}: ${value}%</title></circle>`;
      offset += length;
      return arc;
    }).join('');
    return `<svg class="chart-svg" viewBox="0 0 200 200" role="img" aria-label="Customer distribution by plan">${arcs}<text class="donut-center-title" x="100" y="95" text-anchor="middle">Active</text><text class="donut-center-value" x="100" y="119" text-anchor="middle">2,841</text></svg>`;
  }
  function transactionRows(items, limit = 5) {
    const rows = items.slice(0, limit);
    if (!rows.length) return '<tr><td class="empty-row" colspan="5">No transactions yet.</td></tr>';
    return rows.map((item) => `<tr><td><span class="mono-label">${escapeHtml(item.id)}</span></td><td>${personCell(item.customer, item.description)}</td><td>${escapeHtml(formatDate(item.date))}</td><td>${statusPill(item.status)}</td><td class="amount-cell">${currency(item.amount)}</td></tr>`).join('');
  }
  function renderActivity(items = state.data.activities) {
    return `<ul class="activity-list">${items.map((item) => `<li class="activity-item"><span class="activity-mark ${escapeHtml(item.tone || '')}">${escapeHtml(item.icon || '•')}</span><span class="activity-copy"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.detail)}</small></span><span class="activity-time">${escapeHtml(item.time)}</span></li>`).join('')}</ul>`;
  }
  function renderOrdersOverview() {
    const orders = state.data.orders;
    const totalValue = orders.reduce((sum, order) => sum + Number(order.amount || 0), 0);
    const statuses = [
      { name: 'Paid', tone: 'green' },
      { name: 'Pending', tone: 'orange' },
      { name: 'Failed', tone: 'red' }
    ];
    return `<section class="panel orders-overview"><div class="panel-heading"><div><h2>Orders overview</h2><p>Order volume and fulfillment status</p></div><button class="text-button" type="button" data-page="orders">View all orders</button></div><div class="orders-overview-total"><span>Total order value</span><strong>${currency(totalValue)}</strong><small>${number(orders.length)} orders in this browser preview</small></div><div class="order-summary-grid">${statuses.map(({name,tone}) => {
      const count = orders.filter((order) => order.status === name).length;
      const width = orders.length ? Math.round(count / orders.length * 100) : 0;
      return `<button class="order-summary-item" type="button" data-action="order-status" data-status="${name}" aria-label="Show ${count} ${name.toLowerCase()} orders"><span class="order-summary-label"><i class="${tone}"></i>${name}</span><strong>${number(count)}</strong><span class="order-progress"><i class="${tone}" style="width:${width}%"></i></span></button>`;
    }).join('')}</div></section>`;
  }
  function renderOverview() {
    const range = activeRange(); const total = range.totals;
    return `<div class="page-heading"><div><h1>Good morning, ${escapeHtml(state.data.settings.name.split(' ')[0])} <span aria-hidden="true">✦</span></h1><p>Here’s what’s happening with your workspace today.</p></div><div class="heading-actions"><label class="visually-hidden" for="date-range">Date range</label><select class="date-select" id="date-range" data-action="date-range"><option value="week" ${state.range==='week'?'selected':''}>This week</option><option value="month" ${state.range==='month'?'selected':''}>This month</option><option value="year" ${state.range==='year'?'selected':''}>This year</option></select><button class="button" type="button" data-action="export-overview">${icon('download')} Export</button></div></div>
      <section class="metrics-grid" aria-label="Key performance indicators">
        ${metricCard('Total revenue', currency(total.revenue), total.revenueChange, 'vs. previous period', 'revenue', 'orange')}
        ${metricCard('Monthly recurring revenue', currency(total.mrr), 11.6, 'vs. previous period', 'revenue', 'green')}
        ${metricCard('Active users', number(total.users), total.usersChange, 'vs. previous period', 'users')}
        ${metricCard('Total customers', number(total.customers), 6.4, 'vs. previous period', 'customers', 'green')}
        ${metricCard('Conversion rate', `${total.conversion.toFixed(2)}%`, 1.2, 'vs. previous period', 'target', 'red')}
      </section>
      <section class="dashboard-grid">
        <article class="panel"><div class="panel-heading"><div><h2>Performance overview</h2><p>Revenue and active users over the selected period</p></div><div class="chart-tabs" role="group" aria-label="Performance metric"><button class="chart-tab" type="button" data-action="chart-metric" data-metric="revenue" aria-pressed="${state.chartMetric==='revenue'}">Revenue</button><button class="chart-tab" type="button" data-action="chart-metric" data-metric="users" aria-pressed="${state.chartMetric==='users'}">Users</button></div></div><div class="chart-legend"><span class="legend-item"><i class="legend-swatch"></i>Current period</span><span class="legend-item"><i class="legend-swatch orange"></i>Previous period</span></div><div class="chart-wrap">${renderLineChart()}</div></article>
        <article class="panel"><div class="panel-heading"><div><h2>Customers by plan</h2><p>Plan mix across active workspaces</p></div><button class="text-button" type="button" data-page="customers">View customers</button></div><div class="chart-wrap donut-wrap">${renderDonut()}</div><div class="side-stat-list"><div class="side-stat"><i></i><span>Growth</span><strong>38% · 1,079</strong></div><div class="side-stat"><i class="orange"></i><span>Starter</span><strong>27% · 767</strong></div><div class="side-stat"><i class="green"></i><span>Pro</span><strong>21% · 597</strong></div><div class="side-stat"><i class="purple"></i><span>Enterprise</span><strong>14% · 398</strong></div></div></article>
      </section>
      <section class="dashboard-grid equal">
        <article class="panel"><div class="panel-heading"><div><h2>Conversion funnel</h2><p>From first visit to paid workspace</p></div><button class="text-button" type="button" data-page="analytics">Full analytics</button></div><div class="funnel-list">${[['Visitors', '48,290', 100], ['Sign-ups', '12,408', 69], ['Trials started', '5,862', 43], ['Paid plans', '2,841', 27]].map(([label,value,width])=>`<div class="funnel-row"><div><div class="funnel-meta"><span>${label}</span><strong>${value}</strong></div><div class="funnel-track"><span style="width:${width}%"></span></div></div><span>${width===100?'100%':`${Math.round(width/1.4)}%`}</span></div>`).join('')}</div></article>
        <article class="panel"><div class="panel-heading"><div><h2>Product performance</h2><p>Best performing products this month</p></div><div class="chart-tabs" role="group" aria-label="Product metric"><button class="chart-tab" type="button" data-action="product-metric" data-metric="sales" aria-pressed="${state.productMetric==='sales'}">Sales</button><button class="chart-tab" type="button" data-action="product-metric" data-metric="revenue" aria-pressed="${state.productMetric==='revenue'}">Revenue</button></div></div><div class="chart-wrap">${renderProductBars()}</div></article>
      </section>
      <section class="dashboard-grid equal">
        <article class="panel table-panel"><div class="table-toolbar"><h2>Recent transactions</h2><button class="text-button" type="button" data-page="transactions">View all</button></div><div class="table-scroll"><table class="data-table"><thead><tr><th>TRANSACTION</th><th>CUSTOMER</th><th>DATE</th><th>STATUS</th><th>AMOUNT</th></tr></thead><tbody>${transactionRows(state.data.transactions)}</tbody></table></div></article>
        <article class="panel"><div class="panel-heading"><div><h2>Recent activity</h2><p>Latest events across your workspace</p></div><button class="text-button" type="button" data-page="notifications">View all</button></div>${renderActivity()}</article>
      </section>
      ${renderOrdersOverview()}`;
  }

  function tableStateFor(entity) {
    if (!state.table[entity]) state.table[entity] = { query: '', status: 'all', sortKey: entity === 'users' || entity === 'customers' ? 'name' : 'date', direction: 'desc', page: 1 };
    return state.table[entity];
  }
  function getFilteredRows(entity) {
    const definition = ENTITY_DEFS[entity];
    const tableState = tableStateFor(entity);
    const query = tableState.query.trim().toLowerCase();
    let rows = state.data[entity].filter((record) => {
      const matchesQuery = !query || definition.searchKeys.some((key) => String(record[key] ?? '').toLowerCase().includes(query));
      const matchesStatus = tableState.status === 'all' || record.status === tableState.status;
      return matchesQuery && matchesStatus;
    });
    const sortKey = tableState.sortKey;
    rows = [...rows].sort((left, right) => {
      const a = left[sortKey] ?? ''; const b = right[sortKey] ?? '';
      const comparison = typeof a === 'number' || typeof b === 'number'
        ? Number(a) - Number(b)
        : String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
      return tableState.direction === 'asc' ? comparison : -comparison;
    });
    return rows;
  }
  function entitySummary(entity) {
    const records = state.data[entity];
    const def = ENTITY_DEFS[entity];
    let active = records.filter((record) => ['Active', 'Completed', 'Paid', 'Limited'].includes(record.status)).length;
    if (entity === 'products') active = records.filter((record) => record.status === 'Active').length;
    const totalValue = entity === 'customers' ? records.reduce((sum, record) => sum + Number(record.spend || 0), 0)
      : ['orders','transactions'].includes(entity) ? records.reduce((sum, record) => sum + Number(record.amount || 0), 0) : null;
    const secondLabel = entity === 'users' ? 'Active access' : entity === 'products' ? 'Active products' : entity === 'orders' ? 'Paid orders' : entity === 'transactions' ? 'Completed' : 'Active';
    const secondValue = entity === 'orders' ? records.filter((item) => item.status === 'Paid').length
      : entity === 'transactions' ? records.filter((item) => item.status === 'Completed').length : active;
    const totalLabel = entity === 'users' ? 'Workspace users' : entity === 'customers' ? 'Customer lifetime value' : entity === 'products' ? 'Listed products' : entity === 'orders' ? 'Order value' : 'Processed volume';
    const firstValue = totalValue === null ? number(records.length) : currency(totalValue);
    const thirdLabel = entity === 'users' ? 'Pending invites' : entity === 'customers' ? 'On trial' : entity === 'products' ? 'Units sold' : entity === 'orders' ? 'Pending orders' : 'Pending review';
    const thirdValue = entity === 'users' ? records.filter((item) => item.status === 'Invited').length
      : entity === 'customers' ? records.filter((item) => item.status === 'Trial').length
        : entity === 'products' ? number(records.reduce((sum,item)=>sum+Number(item.sales||0),0))
          : records.filter((item) => ['Pending','Failed','Past due'].includes(item.status)).length;
    return `<section class="entity-summary"><article class="summary-card"><small>${totalLabel}</small><strong>${firstValue}</strong><span>${number(records.length)} records in this preview</span></article><article class="summary-card"><small>${secondLabel}</small><strong>${number(secondValue)}</strong><span>${records.length ? Math.round(secondValue / records.length * 100) : 0}% of listed records</span></article><article class="summary-card"><small>${thirdLabel}</small><strong>${thirdValue}</strong><span>Updated just now</span></article></section>`;
  }
  function renderEntityTable(entity) {
    const def = ENTITY_DEFS[entity]; const tableState = tableStateFor(entity); const rows = getFilteredRows(entity);
    const pageSize = 5; const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
    tableState.page = Math.min(Math.max(1, tableState.page), pageCount);
    const start = (tableState.page - 1) * pageSize; const pageRows = rows.slice(start, start + pageSize);
    const statusOptions = [...new Set(state.data[entity].map((item) => item.status).filter(Boolean))].sort();
    const columns = def.columns.map((column) => `<th><button class="sort-button" type="button" data-action="sort-table" data-entity="${entity}" data-key="${column.key}" aria-label="Sort by ${escapeHtml(column.label.toLowerCase())}">${column.label}${tableState.sortKey === column.key ? (tableState.direction === 'asc' ? ' ↑' : ' ↓') : ''}</button></th>`).join('');
    const body = pageRows.length ? pageRows.map((record) => `<tr>${def.columns.map((column) => `<td>${column.render ? column.render(record) : ['date','created','joined'].includes(column.key) ? escapeHtml(formatDate(record[column.key])) : escapeHtml(record[column.key] ?? '—')}</td>`).join('')}<td><div class="row-actions"><button class="row-action" type="button" data-action="edit-record" data-entity="${entity}" data-id="${escapeHtml(record.id)}" aria-label="Edit ${escapeHtml(def.singular)} ${escapeHtml(record.name || record.id)}">✎</button><button class="row-action" type="button" data-action="delete-record" data-entity="${entity}" data-id="${escapeHtml(record.id)}" aria-label="Delete ${escapeHtml(def.singular)} ${escapeHtml(record.name || record.id)}">×</button></div></td></tr>`).join('')
      : `<tr><td class="empty-row" colspan="${def.columns.length + 1}">${rows.length ? 'No records on this page.' : `No ${escapeHtml(def.title.toLowerCase())} match these filters.`}</td></tr>`;
    const rangeStart = rows.length ? start + 1 : 0; const rangeEnd = Math.min(start + pageSize, rows.length);
    return `<section class="panel table-panel"><div class="table-toolbar"><div><h2>All ${escapeHtml(def.title.toLowerCase())}</h2><p>${number(rows.length)} matching records</p></div><div class="entity-toolbar"><label class="visually-hidden" for="entity-search">Search ${escapeHtml(def.title.toLowerCase())}</label><input class="search-control" id="entity-search" type="search" value="${escapeHtml(tableState.query)}" placeholder="Search ${escapeHtml(def.title.toLowerCase())}..."><label class="visually-hidden" for="status-filter">Filter by status</label><select class="select-control" id="status-filter"><option value="all">All statuses</option>${statusOptions.map((status) => `<option value="${escapeHtml(status)}" ${tableState.status===status?'selected':''}>${escapeHtml(status)}</option>`).join('')}</select><button class="button" type="button" data-action="export-entity" data-entity="${entity}">${icon('download')} Export</button></div></div><div class="table-scroll"><table class="data-table"><thead><tr>${columns}<th><span class="visually-hidden">ACTIONS</span></th></tr></thead><tbody>${body}</tbody></table></div><div class="table-footer"><span>Showing ${rangeStart}–${rangeEnd} of ${rows.length}</span><div class="pagination"><button class="page-button" type="button" data-action="page-prev" data-entity="${entity}" ${tableState.page<=1?'disabled':''} aria-label="Previous page">‹</button><span class="page-button current" aria-current="page">${tableState.page} / ${pageCount}</span><button class="page-button" type="button" data-action="page-next" data-entity="${entity}" ${tableState.page>=pageCount?'disabled':''} aria-label="Next page">›</button></div></div></section>`;
  }
  function renderEntityPage(entity) {
    const def = ENTITY_DEFS[entity];
    return `<div class="page-heading"><div><h1>${escapeHtml(def.title)}</h1><p>${escapeHtml(def.subtitle)}</p></div><div class="heading-actions"><button class="button" type="button" data-action="export-entity" data-entity="${entity}">${icon('download')} Export</button><button class="button button-primary" type="button" data-action="create-record" data-entity="${entity}">${icon('plus')} Add ${escapeHtml(def.singular)}</button></div></div>${entitySummary(entity)}${renderEntityTable(entity)}`;
  }
  function renderAnalytics() {
    const range = activeRange();
    return `<div class="page-heading"><div><h1>Analytics</h1><p>Explore growth, revenue, and customer behavior across your workspace.</p></div><div class="heading-actions"><label class="visually-hidden" for="date-range">Date range</label><select class="date-select" id="date-range" data-action="date-range"><option value="week" ${state.range==='week'?'selected':''}>This week</option><option value="month" ${state.range==='month'?'selected':''}>This month</option><option value="year" ${state.range==='year'?'selected':''}>This year</option></select><button class="button" type="button" data-action="export-overview">${icon('download')} Export report</button></div></div>
      <section class="metrics-grid">${metricCard('Revenue',currency(range.totals.revenue),range.totals.revenueChange,'selected period','revenue','orange')}${metricCard('Monthly recurring revenue',currency(range.totals.mrr),11.6,'selected period','revenue','green')}${metricCard('Active users',number(range.totals.users),range.totals.usersChange,'selected period','users')}${metricCard('Churn rate',`${range.totals.churn.toFixed(2)}%`,range.totals.churnChange,'vs. previous period','conversion','green',true,' pp')}${metricCard('Average revenue / user',currency(range.totals.revenue / range.totals.users),3.4,'selected period','target')}</section>
      <section class="dashboard-grid"><article class="panel"><div class="panel-heading"><div><h2>Growth trends</h2><p>${escapeHtml(range.label)} · Compare with previous period</p></div><div class="chart-tabs" role="group" aria-label="Growth metric"><button class="chart-tab" type="button" data-action="chart-metric" data-metric="revenue" aria-pressed="${state.chartMetric==='revenue'}">Revenue</button><button class="chart-tab" type="button" data-action="chart-metric" data-metric="users" aria-pressed="${state.chartMetric==='users'}">Users</button></div></div><div class="chart-legend"><span class="legend-item"><i class="legend-swatch"></i>Current period</span><span class="legend-item"><i class="legend-swatch orange"></i>Previous period</span></div>${renderLineChart()}</article><article class="panel"><div class="panel-heading"><div><h2>Plan distribution</h2><p>Active customers by subscription</p></div></div>${renderDonut()}<div class="side-stat-list"><div class="side-stat"><i></i><span>Growth</span><strong>38%</strong></div><div class="side-stat"><i class="orange"></i><span>Starter</span><strong>27%</strong></div><div class="side-stat"><i class="green"></i><span>Pro</span><strong>21%</strong></div><div class="side-stat"><i class="purple"></i><span>Enterprise</span><strong>14%</strong></div></div></article></section>
      <section class="dashboard-grid equal"><article class="panel"><div class="panel-heading"><div><h2>Product revenue</h2><p>Revenue contribution by product</p></div></div>${renderProductBars()}</article><article class="panel"><div class="panel-heading"><div><h2>Acquisition funnel</h2><p>Conversion through the customer journey</p></div></div><div class="funnel-list">${[['Website visits','48,290',100],['Sign-ups','12,408',69],['Trials started','5,862',43],['Paid customers','2,841',27]].map(([label,value,width])=>`<div class="funnel-row"><div><div class="funnel-meta"><span>${label}</span><strong>${value}</strong></div><div class="funnel-track"><span style="width:${width}%"></span></div></div><span>${width}%</span></div>`).join('')}</div><div class="inline-note">Conversion rates use the sample dataset in this preview. Connect production analytics before using these figures for decisions.</div></article></section>`;
  }
  function renderReports() {
    const reports = [
      ['revenue','Revenue summary','Monthly recurring revenue, plan mix, and payment volume.','orange','transactions'],
      ['customers','Customer roster','Customer plans, status, and lifetime value.','','customers'],
      ['products','Product performance','Product pricing, availability, and sales counts.','green','products'],
      ['orders','Orders and payments','Orders with amounts, statuses, and dates.','','orders'],
      ['users','Workspace members','Members, roles, invitations, and join dates.','green','users'],
      ['transactions','Transaction ledger','Payment methods and transaction outcomes.','orange','transactions']
    ];
    return `<div class="page-heading"><div><h1>Reports</h1><p>Download useful snapshots of the sample workspace data.</p></div><button class="button button-primary" type="button" data-action="export-overview">${icon('download')} Export overview</button></div><div class="inline-note" style="margin-bottom:15px">Reports use synthetic demo data. Downloads are generated in your browser and are not sent to a service.</div><section class="report-grid">${reports.map(([iconName,title,description,tone,entity])=>`<article class="report-card"><span class="report-icon ${tone}">${icon(iconName)}</span><h2>${title}</h2><p>${description}</p><button class="button" type="button" data-action="export-entity" data-entity="${entity}">${icon('download')} Download CSV</button></article>`).join('')}</section>`;
  }
  function renderNotifications() {
    const notifications = [...state.data.notifications];
    return `<div class="page-heading"><div><h1>Notifications</h1><p>Updates about workspace activity and billing.</p></div><div class="heading-actions"><button class="button" type="button" data-action="mark-all-read">${icon('check')} Mark all as read</button></div></div><section class="panel"><div class="panel-heading"><div><h2>All updates</h2><p>${notifications.filter((item)=>!item.read).length} unread</p></div></div><div class="notification-list">${notifications.length ? notifications.map((item)=>`<article class="notification-item ${item.read?'':'unread'}"><span class="notification-icon">${icon(item.type==='payment'?'transactions':item.type==='customer'?'customers':item.type==='report'?'reports':'revenue')}</span><div class="notification-copy"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.detail)}</p><small>${escapeHtml(item.time)}</small></div><div class="notification-controls">${item.read ? '' : `<button class="text-button" type="button" data-action="mark-read" data-id="${escapeHtml(item.id)}">Mark read</button>`}<button class="row-action" type="button" data-action="delete-notification" data-id="${escapeHtml(item.id)}" aria-label="Dismiss notification">×</button></div></article>`).join('') : '<div class="empty-row">You’re all caught up.</div>'}</div></section>`;
  }
  function renderSettings() {
    const settings = state.data.settings;
    const tabs = [['profile','Profile'],['preferences','Preferences'],['notifications','Notifications']];
    let content = '';
    if (state.settingsTab === 'profile') {
      content = `<form class="settings-form" data-form-entity="settings"><h2>Profile information</h2><p>Manage the information shown to people in this workspace.</p><div class="settings-fields"><div class="form-field"><label for="setting-name">Full name</label><input id="setting-name" name="name" value="${escapeHtml(settings.name)}" required maxlength="80"></div><div class="form-field"><label for="setting-email">Email address</label><input id="setting-email" name="email" type="email" value="${escapeHtml(settings.email)}" required></div><div class="form-field"><label for="setting-timezone">Time zone</label><select id="setting-timezone" name="timezone">${['Asia/Kolkata','America/Los_Angeles','America/New_York','Europe/London','UTC'].map((zone)=>`<option value="${zone}" ${settings.timezone===zone?'selected':''}>${zone.replace('_',' ')}</option>`).join('')}</select><small>Used when dating new records in this preview.</small></div><div class="form-field"><label for="setting-date-format">Date format</label><select id="setting-date-format" name="dateFormat">${['MMM D, YYYY','DD/MM/YYYY','YYYY-MM-DD'].map((format)=>`<option value="${format}" ${settings.dateFormat===format?'selected':''}>${format}</option>`).join('')}</select><small>Updates date labels in tables and exports.</small></div></div><div class="dialog-actions"><button class="button button-primary" type="submit">Save changes</button></div></form>`;
    } else if (state.settingsTab === 'preferences') {
      content = `<form class="settings-form" data-form-entity="settings"><h2>Workspace preferences</h2><p>Choose how this browser preview presents information.</p><div class="settings-row"><span><strong>Compact tables</strong><small>Use tighter row spacing in management pages.</small></span><input class="toggle" type="checkbox" name="compactTables" ${settings.compactTables?'checked':''} aria-label="Compact tables"></div><div class="settings-row"><span><strong>Show currency symbols</strong><small>Display the US dollar symbol with sample amounts.</small></span><input class="toggle" type="checkbox" name="showUsd" ${settings.showUsd!==false?'checked':''} aria-label="Show currency symbols"></div><div class="dialog-actions"><button class="button button-primary" type="submit">Save preferences</button></div></form><section class="reset-preview"><h2>Preview data</h2><p>Clear local demo edits and restore the original sample workspace.</p><button class="button" type="button" data-action="reset-preview">Reset sample data</button></section>`;
    } else {
      content = `<form class="settings-form" data-form-entity="settings"><h2>Notification preferences</h2><p>These settings are stored in this browser preview only.</p><div class="settings-row"><span><strong>Weekly performance digest</strong><small>A summary of workspace performance.</small></span><input class="toggle" type="checkbox" name="weeklyDigest" ${settings.weeklyDigest?'checked':''} aria-label="Weekly performance digest"></div><div class="settings-row"><span><strong>Product updates</strong><small>Notes about product improvements and new features.</small></span><input class="toggle" type="checkbox" name="productUpdates" ${settings.productUpdates?'checked':''} aria-label="Product updates"></div><div class="settings-row"><span><strong>Security alerts</strong><small>Important account and access events.</small></span><input class="toggle" type="checkbox" name="securityAlerts" ${settings.securityAlerts?'checked':''} aria-label="Security alerts"></div><div class="dialog-actions"><button class="button button-primary" type="submit">Save notification settings</button></div></form>`;
    }
    return `<div class="page-heading"><div><h1>Settings</h1><p>Personalize your workspace and notification preferences.</p></div><span class="environment-pill"><i></i> Local preview</span></div><section class="settings-layout"><div class="settings-tabs" role="group" aria-label="Settings sections">${tabs.map(([id,label])=>`<button class="settings-tab" type="button" data-action="settings-tab" data-tab="${id}" aria-pressed="${state.settingsTab===id}">${label}</button>`).join('')}</div><article class="panel">${content}<div class="inline-note">Edits are saved to local browser storage. They do not update a Fastlane account.</div></article></section>`;
  }
  function renderPage(shouldFocus = false) {
    if (!PAGE_LABELS[state.page]) state.page = 'overview';
    const label = PAGE_LABELS[state.page];
    document.body.classList.toggle('compact-tables', Boolean(state.data.settings.compactTables));
    document.title = `${label} · Fastlane Admin`;
    document.querySelector('#breadcrumb-current').textContent = label;
    document.querySelectorAll('[data-page]').forEach((link) => {
      const active = link.dataset.page === state.page;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
    });
    document.querySelectorAll('[data-count]').forEach((badge) => {
      const amount = state.data[badge.dataset.count]?.length || 0;
      badge.textContent = amount > 99 ? '99+' : String(amount);
      badge.hidden = amount === 0;
    });
    const page = state.page;
    if (page === 'overview') main.innerHTML = renderOverview();
    else if (page === 'analytics') main.innerHTML = renderAnalytics();
    else if (ENTITY_DEFS[page]) main.innerHTML = renderEntityPage(page);
    else if (page === 'reports') main.innerHTML = renderReports();
    else if (page === 'notifications') main.innerHTML = renderNotifications();
    else if (page === 'settings') main.innerHTML = renderSettings();
    updateProfileName();
    updateNotificationBadge();
    if (shouldFocus) main.focus({ preventScroll: true });
  }
  function updateProfileName() {
    const parts = String(state.data.settings.name || 'Deneal Smith').split(/\s+/);
    const firstName = parts[0] || 'Deneal';
    document.querySelector('.profile-copy strong').textContent = firstName;
    document.querySelector('.profile-avatar').textContent = initials(firstName);
  }
  function updateNotificationBadge() {
    document.querySelector('#notification-dot').hidden = !state.data.notifications.some((item) => !item.read);
  }
  function goToPage(page) {
    if (!PAGE_LABELS[page]) return;
    if (location.hash === `#${page}`) {
      state.page = page;
      renderPage(true);
    } else {
      location.hash = page;
    }
    closePopover();
    closeMobileNav();
  }

  function nextRecordId(entity) {
    const prefix = { users: 'USR', customers: 'CUS', products: 'PRD', orders: 'ORD', transactions: 'TXN' }[entity];
    const greatest = state.data[entity].reduce((max, item) => Math.max(max, Number(String(item.id).match(/(\d+)$/)?.[1]) || 0), 0);
    const width = entity === 'transactions' ? 5 : 4;
    return `${prefix}-${String(greatest + 1).padStart(width, '0')}`;
  }
  function todayLabel() {
    const settings = state.data.settings;
    const now = new Date();
    let parts;
    try {
      parts = new Intl.DateTimeFormat('en-US', {
        timeZone: settings.timezone || 'UTC', year: 'numeric', month: '2-digit', day: '2-digit'
      }).formatToParts(now);
    } catch {
      parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit'
      }).formatToParts(now);
    }
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    const date = new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day)));
    return formatDate(date);
  }
  function formatDate(value) {
    const text = String(value ?? '').trim();
    let year; let month; let day;
    let match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) [, year, month, day] = match.map(Number);
    else if ((match = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/))) {
      [, day, month, year] = match.map(Number);
    } else if ((match = text.match(/^([A-Za-z]{3,})\s+(\d{1,2}),\s*(\d{4})$/))) {
      [, , day, year] = match.map((part) => Number(part));
      const monthName = match[1].slice(0, 3).toLowerCase();
      month = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'].indexOf(monthName) + 1;
    } else if (value instanceof Date) {
      year = value.getUTCFullYear(); month = value.getUTCMonth() + 1; day = value.getUTCDate();
    } else {
      const parsed = new Date(value);
      if (Number.isNaN(parsed.getTime())) return text;
      year = parsed.getUTCFullYear(); month = parsed.getUTCMonth() + 1; day = parsed.getUTCDate();
    }
    const raw = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
    if (!year || month < 1 || month > 12 || day < 1 || day > 31 || Number.isNaN(raw.getTime())) return text;
    if (state.data.settings.dateFormat === 'YYYY-MM-DD') {
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
    if (state.data.settings.dateFormat === 'DD/MM/YYYY') {
      return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    }
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(raw);
  }
  function recordDefaults(entity) {
    if (entity === 'users') return { status: 'Active', role: 'Member', joined: todayLabel() };
    if (entity === 'customers') return { status: 'Trial', plan: 'Starter', spend: 0, created: todayLabel() };
    if (entity === 'products') return { status: 'Active', category: 'Subscription', stock: 0, sales: 0, date: todayLabel() };
    if (entity === 'orders') return { status: 'Pending', amount: 0, date: todayLabel() };
    return { status: 'Pending', amount: 0, method: 'Manual entry', date: todayLabel() };
  }
  function formField(field, record = {}) {
    const value = record[field.key] ?? '';
    const full = field.full ? ' full' : '';
    if (field.type === 'select') {
      return `<div class="form-field${full}"><label for="field-${escapeHtml(field.key)}">${escapeHtml(field.label)}</label><select id="field-${escapeHtml(field.key)}" name="${escapeHtml(field.key)}" ${field.required === false ? '' : 'required'}>${field.options.map((option) => `<option value="${escapeHtml(option)}" ${String(value)===option?'selected':''}>${escapeHtml(option)}</option>`).join('')}</select></div>`;
    }
    const min = field.min !== undefined ? `min="${field.min}"` : '';
    const step = field.step ? `step="${field.step}"` : '';
    const max = field.max ? `maxlength="${field.max}"` : '';
    return `<div class="form-field${full}"><label for="field-${escapeHtml(field.key)}">${escapeHtml(field.label)}</label><input id="field-${escapeHtml(field.key)}" name="${escapeHtml(field.key)}" type="${escapeHtml(field.type || 'text')}" value="${escapeHtml(value)}" ${field.required === false ? '' : 'required'} ${min} ${step} ${max}></div>`;
  }
  function showRecordForm(entity, recordId = '') {
    const definition = ENTITY_DEFS[entity];
    if (!definition) return;
    const existing = recordId ? state.data[entity].find((item) => item.id === recordId) : null;
    const record = existing || recordDefaults(entity);
    dialog.innerHTML = `<div class="dialog-header"><div><h2 id="dialog-title">${existing ? 'Edit' : 'Add'} ${escapeHtml(definition.singular)}</h2><p>Changes stay in this browser preview.</p></div><button class="dialog-close" type="button" data-action="close-dialog" aria-label="Close dialog">×</button></div><form class="dialog-form" data-form-entity="${entity}" data-record-id="${escapeHtml(existing?.id || '')}"><div class="dialog-fields">${definition.fields.map((field) => formField(field, record)).join('')}</div><div class="dialog-actions"><button class="button" type="button" data-action="close-dialog">Cancel</button><button class="button button-primary" type="submit">${existing ? 'Save changes' : `Add ${escapeHtml(definition.singular)}`}</button></div></form>`;
    dialog.showModal();
    dialog.querySelector('input,select')?.focus();
  }
  function showDeleteConfirmation(entity, recordId) {
    const definition = ENTITY_DEFS[entity];
    const record = state.data[entity]?.find((item) => item.id === recordId);
    if (!definition || !record) return;
    if (entity === 'users' && record.role === 'Owner' && state.data.users.filter((item) => item.role === 'Owner').length <= 1) {
      showToast('Keep at least one workspace owner.');
      return;
    }
    state.pendingDelete = { entity, id: recordId };
    const name = record.name || record.customer || record.id;
    dialog.innerHTML = `<div class="dialog-header"><div><h2 id="dialog-title">Delete ${escapeHtml(definition.singular)}?</h2><p>This only removes the record from this browser preview.</p></div><button class="dialog-close" type="button" data-action="close-dialog" aria-label="Close dialog">×</button></div><p class="confirm-copy">Are you sure you want to delete <strong>${escapeHtml(name)}</strong>? The record will be removed from the sample data saved in this browser.</p><div class="dialog-actions" style="padding:0 20px 20px"><button class="button" type="button" data-action="close-dialog">Cancel</button><button class="button button-primary" type="button" data-action="confirm-delete">Delete ${escapeHtml(definition.singular)}</button></div>`;
    dialog.showModal();
    dialog.querySelector('[data-action="confirm-delete"]')?.focus();
  }
  function handleEntitySubmit(form) {
    const entity = form.dataset.formEntity;
    const definition = ENTITY_DEFS[entity];
    if (!definition || !form.reportValidity()) return;
    const recordId = form.dataset.recordId;
    const existingIndex = state.data[entity].findIndex((item) => item.id === recordId);
    const current = existingIndex >= 0 ? state.data[entity][existingIndex] : null;
    const values = {};
    const formData = new FormData(form);
    definition.fields.forEach((field) => {
      if (field.type === 'number') values[field.key] = Number(formData.get(field.key));
      else values[field.key] = String(formData.get(field.key) || '').trim();
    });
    const merged = { ...recordDefaults(entity), ...current, ...values };
    if (current) state.data[entity][existingIndex] = merged;
    else state.data[entity].unshift({ ...merged, id: nextRecordId(entity) });
    state.data.activities.unshift({ title: current ? `${definition.singular[0].toUpperCase()}${definition.singular.slice(1)} updated` : `New ${definition.singular} added`, detail: values.name || values.customer || values.description || values.product || '', time: 'Just now', icon: current ? '↗' : '＋', tone: current ? 'orange' : 'green' });
    state.data.activities = state.data.activities.slice(0, 8);
    persistData();
    dialog.close();
    renderPage();
    showToast(`${definition.singular[0].toUpperCase()}${definition.singular.slice(1)} ${current ? 'updated' : 'added'} in this browser.`);
  }
  function handleSettingsSubmit(form) {
    const formData = new FormData(form);
    if (state.settingsTab === 'profile') {
      state.data.settings.name = String(formData.get('name') || '').trim();
      state.data.settings.email = String(formData.get('email') || '').trim();
      state.data.settings.timezone = String(formData.get('timezone') || 'UTC');
      state.data.settings.dateFormat = String(formData.get('dateFormat') || 'MMM D, YYYY');
    } else if (state.settingsTab === 'preferences') {
      state.data.settings.compactTables = formData.has('compactTables');
      state.data.settings.showUsd = formData.has('showUsd');
    } else {
      state.data.settings.weeklyDigest = formData.has('weeklyDigest');
      state.data.settings.productUpdates = formData.has('productUpdates');
      state.data.settings.securityAlerts = formData.has('securityAlerts');
    }
    persistData();
    renderPage();
    showToast('Settings saved in this browser.');
  }
  function confirmDelete() {
    if (!state.pendingDelete) return;
    const { entity, id } = state.pendingDelete;
    state.data[entity] = state.data[entity].filter((item) => item.id !== id);
    state.pendingDelete = null;
    persistData();
    dialog.close();
    renderPage();
    showToast('Record removed from this browser preview.');
  }
  function csvValue(value) {
    let text = String(value ?? '');
    if (/^\s*[=+@-]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  }
  function downloadCsv(filename, rows) {
    const csv = rows.map((row) => row.map(csvValue).join(',')).join('\r\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = filename; link.hidden = true;
    document.body.append(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(`${filename} downloaded.`);
  }
  function exportEntity(entity) {
    if (!ENTITY_DEFS[entity]) return;
    const fields = ENTITY_DEFS[entity].fields.map((field) => field.key);
    const keys = ['id', ...fields, ...(entity === 'users' ? ['joined'] : entity === 'customers' ? ['created'] : ['date'])];
    const rows = [keys, ...state.data[entity].map((record) => keys.map((key) => ['date','created','joined'].includes(key) ? formatDate(record[key]) : record[key] ?? ''))];
    downloadCsv(`fastlane-${entity}-${todayLabel().replaceAll(' ','-')}.csv`, rows);
  }
  function exportOverview() {
    const totals = activeRange().totals;
    downloadCsv(`fastlane-overview-${state.range}.csv`, [
      ['Metric','Value','Period'],
      ['Total revenue',totals.revenue,activeRange().label],
      ['Monthly recurring revenue',totals.mrr,activeRange().label],
      ['Active users',totals.users,activeRange().label],
      ['Total customers',totals.customers,activeRange().label],
      ['Conversion rate',`${totals.conversion}%`,activeRange().label]
    ]);
  }

  function setExpanded(button, expanded) {
    if (button) button.setAttribute('aria-expanded', String(expanded));
  }
  function positionPopover(anchor) {
    const rect = anchor.getBoundingClientRect();
    const panelWidth = Math.min(300, window.innerWidth - 20);
    const left = Math.max(10, Math.min(window.innerWidth - panelWidth - 10, rect.right - panelWidth));
    const top = Math.min(window.innerHeight - 70, rect.bottom + 8);
    floatingPanel.style.top = `${top}px`;
    floatingPanel.style.left = `${left}px`;
    floatingPanel.style.right = 'auto';
  }
  function openPopover(markup, owner, anchor) {
    if (state.popoverOwner === owner && !floatingPanel.hidden) {
      closePopover();
      return;
    }
    closePopover();
    state.popoverOwner = owner;
    floatingPanel.innerHTML = markup;
    floatingPanel.hidden = false;
    floatingPanel.setAttribute('role','region');
    floatingPanel.setAttribute('aria-label', owner === 'search' ? 'Search results' : owner === 'notifications' ? 'Notifications menu' : 'Profile menu');
    positionPopover(anchor);
    setExpanded(anchor, true);
  }
  function closePopover() {
    if (state.popoverOwner === 'notifications') setExpanded(document.querySelector('[data-action="notifications-popover"]'), false);
    if (state.popoverOwner === 'profile') setExpanded(document.querySelector('[data-action="profile-popover"]'), false);
    floatingPanel.hidden = true;
    floatingPanel.replaceChildren();
    floatingPanel.style.left = '';
    floatingPanel.style.top = '';
    floatingPanel.style.right = '';
    state.popoverOwner = null;
  }
  function renderNotificationsPopover() {
    const items = state.data.notifications.filter((item) => !item.read).slice(0, 4);
    return `<div class="floating-heading"><span>Notifications</span><button type="button" data-action="mark-all-read">Mark all read</button></div>${items.length ? items.map((item) => `<button class="floating-item" type="button" data-action="open-notification" data-id="${escapeHtml(item.id)}"><span class="notification-icon">${icon(item.type==='payment'?'transactions':item.type==='customer'?'customers':'revenue')}</span><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.detail)} · ${escapeHtml(item.time)}</small></span></button>`).join('') : '<div class="floating-empty">No unread updates.</div>'}<button class="text-button" style="width:100%;padding:9px" type="button" data-action="notifications-page">View all notifications</button>`;
  }
  function renderProfilePopover() {
    return `<div class="floating-heading"><span>${escapeHtml(state.data.settings.name)}</span><span class="status-pill">Owner</span></div><button class="floating-item" type="button" data-action="settings-route"><span class="notification-icon">${icon('settings')}</span><span><strong>Settings</strong><small>Profile and workspace preferences</small></span></button><button class="floating-item" type="button" data-action="help"><span class="notification-icon">${icon('help')}</span><span><strong>Help center</strong><small>About this dashboard preview</small></span></button>`;
  }
  function searchEntries(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return { pages: [], records: [] };
    const pages = Object.entries(PAGE_LABELS).filter(([key,label]) => `${key} ${label}`.toLowerCase().includes(normalized)).slice(0,5).map(([page,label]) => ({ page, title: label, detail: 'Open dashboard page', kind: 'page' }));
    const records = [];
    Object.entries(ENTITY_DEFS).forEach(([entity,definition]) => {
      state.data[entity].forEach((record) => {
        if (definition.searchKeys.some((key) => String(record[key] ?? '').toLowerCase().includes(normalized))) {
          records.push({ page: entity, title: record.name || record.customer || record.product || record.description || record.id, detail: `${definition.singular} · ${record.id}`, kind: 'record', query: record.name || record.customer || record.product || record.id });
        }
      });
    });
    return { pages, records: records.slice(0, 6) };
  }
  function renderSearchResults(query) {
    const results = searchEntries(query);
    if (!results.pages.length && !results.records.length) return '<div class="floating-empty">No matching pages or records.</div>';
    const render = (item, index) => `<button class="search-result" type="button" data-action="search-result" data-page="${escapeHtml(item.page)}" data-query="${escapeHtml(item.query || '')}" data-index="${index}">${icon(item.kind==='page'?'overview':item.page)}<span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.detail)}</small></span></button>`;
    let index = 0;
    const pageMarkup = results.pages.length ? `<div class="search-section-label">Pages</div>${results.pages.map((item)=>render(item,index++)).join('')}` : '';
    const recordMarkup = results.records.length ? `<div class="search-section-label">Records</div>${results.records.map((item)=>render(item,index++)).join('')}` : '';
    return `<div class="search-results" id="search-results" role="group" aria-label="Matching pages and records">${pageMarkup}${recordMarkup}</div>`;
  }
  function showSearchResults() {
    const query = globalSearch.value.trim();
    if (!query) { closePopover(); return; }
    state.searchQuery = query; state.searchIndex = 0;
    if (state.popoverOwner === 'search' && !floatingPanel.hidden) {
      floatingPanel.innerHTML = renderSearchResults(query);
      positionPopover(globalSearch.closest('.global-search'));
    } else {
      openPopover(renderSearchResults(query), 'search', globalSearch.closest('.global-search'));
    }
  }
  function selectSearchResult(button) {
    const page = button.dataset.page;
    const query = button.dataset.query;
    if (query && ENTITY_DEFS[page]) {
      const tableState = tableStateFor(page);
      tableState.query = query;
      tableState.page = 1;
    }
    globalSearch.value = '';
    closePopover();
    goToPage(page);
  }
  function showHelp() {
    dialog.innerHTML = `<div class="dialog-header"><div><h2 id="dialog-title">Fastlane Admin preview</h2><p>Explore the sample operations dashboard.</p></div><button class="dialog-close" type="button" data-action="close-dialog" aria-label="Close dialog">×</button></div><div class="confirm-copy">This is a standalone frontend preview with synthetic workspace data. Records you add, edit, or remove are saved in this browser only. No backend, billing, account connections, or production customer data are attached.</div><div class="dialog-actions" style="padding:0 20px 20px"><button class="button button-primary" type="button" data-action="close-dialog">Got it</button></div>`;
    dialog.showModal();
    dialog.querySelector('[data-action="close-dialog"]')?.focus();
  }
  function showPreviewResetConfirmation() {
    dialog.innerHTML = `<div class="dialog-header"><div><h2 id="dialog-title">Reset sample data?</h2><p>This only changes this browser preview.</p></div><button class="dialog-close" type="button" data-action="close-dialog" aria-label="Close dialog">×</button></div><p class="confirm-copy">Local record edits, notifications, profile settings, and activity history will return to the original sample workspace. This does not affect a Fastlane account.</p><div class="dialog-actions" style="padding:0 20px 20px"><button class="button" type="button" data-action="close-dialog">Cancel</button><button class="button button-primary" type="button" data-action="confirm-preview-reset">Reset sample data</button></div>`;
    dialog.showModal();
    dialog.querySelector('[data-action="close-dialog"]')?.focus();
  }
  function resetPreviewData() {
    state.data = { ...clone(SEED_DATA), version: 1 };
    state.table = {};
    state.range = 'month';
    state.chartMetric = 'revenue';
    state.productMetric = 'sales';
    persistData();
    dialog.close();
    renderPage();
    showToast('Sample workspace restored in this browser.');
  }
  function closeMobileNav(restoreFocus = false) {
    const wasOpen = document.body.classList.contains('mobile-nav-open');
    document.body.classList.remove('mobile-nav-open');
    document.querySelector('#sidebar-scrim').hidden = true;
    setExpanded(document.querySelector('#sidebar-toggle'), false);
    if (restoreFocus && wasOpen) document.querySelector('#sidebar-toggle').focus();
  }
  function toggleNavigation() {
    if (window.matchMedia('(max-width: 760px)').matches) {
      const open = !document.body.classList.contains('mobile-nav-open');
      document.body.classList.toggle('mobile-nav-open', open);
      document.querySelector('#sidebar-scrim').hidden = !open;
      setExpanded(document.querySelector('#sidebar-toggle'), open);
      if (open) document.querySelector('#sidebar a[data-page]')?.focus();
      else document.querySelector('#sidebar-toggle').focus();
      return;
    }
    const collapsed = document.body.classList.toggle('sidebar-collapsed');
    const button = document.querySelector('#collapse-sidebar');
    button.setAttribute('aria-pressed', String(collapsed));
    button.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
    button.querySelector('.nav-label').textContent = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
    try { localStorage.setItem('fastlane-admin-sidebar-collapsed', String(collapsed)); } catch { /* Optional preference. */ }
  }
  function renderAfterAction(selector) {
    renderPage();
    const focusTarget = typeof selector === 'function' ? selector() : document.querySelector(selector);
    focusTarget?.focus({ preventScroll: true });
  }
  function updateNotificationRead(id) {
    const notification = state.data.notifications.find((item) => item.id === id);
    if (!notification) return;
    notification.read = true;
    persistData();
    updateNotificationBadge();
  }
  function markAllRead() {
    state.data.notifications.forEach((item) => { item.read = true; });
    persistData();
    updateNotificationBadge();
    if (state.page === 'notifications') renderPage();
    else if (state.popoverOwner === 'notifications') {
      floatingPanel.innerHTML = renderNotificationsPopover();
      floatingPanel.querySelector('[data-action="mark-all-read"]')?.focus();
    }
    showToast('All notifications marked as read.');
  }
  function routeNotification(id) {
    updateNotificationRead(id);
    goToPage('notifications');
  }

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target.closest('button,a,[data-action],[data-page]') : null;
    if (!target) {
      if (!floatingPanel.hidden && !floatingPanel.contains(event.target)) closePopover();
      return;
    }
    if (target.closest('#floating-panel') && target.dataset.action === 'search-result') {
      selectSearchResult(target);
      return;
    }
    if (target.matches('[data-page]')) {
      if (target.tagName !== 'A') {
        event.preventDefault();
        goToPage(target.dataset.page);
      } else closeMobileNav();
      return;
    }
    const action = target.dataset.action;
    if (!action) {
      if (!floatingPanel.hidden && !floatingPanel.contains(target)) closePopover();
      return;
    }
    switch (action) {
      case 'toggle-theme': {
        const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        break;
      }
      case 'notifications-popover': openPopover(renderNotificationsPopover(), 'notifications', target); break;
      case 'profile-popover': openPopover(renderProfilePopover(), 'profile', target); break;
      case 'settings-route': goToPage('settings'); break;
      case 'reset-preview': showPreviewResetConfirmation(); break;
      case 'confirm-preview-reset': resetPreviewData(); break;
      case 'help': closePopover(); showHelp(); break;
      case 'notifications-page': goToPage('notifications'); break;
      case 'sidebar-toggle': toggleNavigation(); break;
      case 'collapse-sidebar': toggleNavigation(); break;
      case 'create-record': showRecordForm(target.dataset.entity); break;
      case 'edit-record': showRecordForm(target.dataset.entity, target.dataset.id); break;
      case 'delete-record': showDeleteConfirmation(target.dataset.entity, target.dataset.id); break;
      case 'close-dialog':
        state.pendingDelete = null;
        dialog.close();
        break;
      case 'confirm-delete': confirmDelete(); break;
      case 'export-entity': exportEntity(target.dataset.entity); break;
      case 'export-overview': exportOverview(); break;
      case 'chart-metric':
        state.chartMetric = target.dataset.metric;
        renderPage();
        break;
      case 'product-metric':
        state.productMetric = target.dataset.metric;
        renderPage();
        break;
      case 'order-status': {
        tableStateFor('orders').status = target.dataset.status;
        tableStateFor('orders').page = 1;
        goToPage('orders');
        break;
      }
      case 'sort-table': {
        const tableState = tableStateFor(target.dataset.entity);
        tableState.direction = tableState.sortKey === target.dataset.key && tableState.direction === 'asc' ? 'desc' : 'asc';
        tableState.sortKey = target.dataset.key;
        renderAfterAction(() => document.querySelector(`[data-action="sort-table"][data-entity="${target.dataset.entity}"][data-key="${target.dataset.key}"]`));
        break;
      }
      case 'page-prev': case 'page-next': {
        const entity = target.dataset.entity;
        const tableState = tableStateFor(entity);
        tableState.page += action === 'page-next' ? 1 : -1;
        renderAfterAction(() => document.querySelector(`[data-action="${action}"][data-entity="${entity}"]`));
        break;
      }
      case 'settings-tab':
        state.settingsTab = target.dataset.tab;
        renderAfterAction(() => document.querySelector(`[data-action="settings-tab"][data-tab="${state.settingsTab}"]`));
        break;
      case 'mark-read':
        updateNotificationRead(target.dataset.id);
        renderPage();
        showToast('Notification marked as read.');
        break;
      case 'mark-all-read': markAllRead(); break;
      case 'open-notification': routeNotification(target.dataset.id); break;
      case 'delete-notification':
        state.data.notifications = state.data.notifications.filter((item) => item.id !== target.dataset.id);
        persistData(); renderPage(); showToast('Notification dismissed.');
        break;
      case 'search-result': selectSearchResult(target); break;
      default:
        if (!floatingPanel.hidden && !floatingPanel.contains(target)) closePopover();
    }
  });

  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (form.dataset.formEntity === 'settings') {
      event.preventDefault();
      if (!form.reportValidity()) return;
      handleSettingsSubmit(form);
      return;
    }
    if (ENTITY_DEFS[form.dataset.formEntity]) {
      event.preventDefault();
      handleEntitySubmit(form);
    }
  });

  document.addEventListener('input', (event) => {
    if (event.target === globalSearch) {
      showSearchResults();
      return;
    }
    if (event.target.id === 'entity-search' && ENTITY_DEFS[state.page]) {
      const entity = state.page; const query = event.target.value; const start = event.target.selectionStart;
      tableStateFor(entity).query = query; tableStateFor(entity).page = 1;
      renderPage();
      const input = document.querySelector('#entity-search');
      input?.focus(); input?.setSelectionRange(start,start);
    }
  });
  document.addEventListener('change', (event) => {
    if (event.target.id === 'date-range') {
      state.range = event.target.value;
      renderPage();
      document.querySelector('#date-range')?.focus();
    }
    if (event.target.id === 'status-filter' && ENTITY_DEFS[state.page]) {
      const entity = state.page; const value = event.target.value;
      tableStateFor(entity).status = value; tableStateFor(entity).page = 1;
      renderPage(); document.querySelector('#status-filter')?.focus();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('mobile-nav-open')) {
      event.preventDefault(); closeMobileNav(true); return;
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault(); globalSearch.focus(); globalSearch.select();
      return;
    }
    if (event.key === '/' && !event.target.matches('input,textarea,select,[contenteditable=true]')) {
      event.preventDefault(); globalSearch.focus();
      return;
    }
    if (event.target === globalSearch) {
      if (event.key === 'Escape') { closePopover(); globalSearch.blur(); }
      if (event.key === 'Enter' && !floatingPanel.hidden) {
        const first = floatingPanel.querySelector('[data-action="search-result"]');
        if (first) { event.preventDefault(); selectSearchResult(first); }
      }
      if (event.key === 'ArrowDown' && !floatingPanel.hidden) {
        event.preventDefault(); floatingPanel.querySelector('[data-action="search-result"]')?.focus();
      }
    }
    if (event.key === 'Escape' && !floatingPanel.hidden) closePopover();
  });
  floatingPanel.addEventListener('keydown', (event) => {
    if (state.popoverOwner !== 'search') return;
    const results = [...floatingPanel.querySelectorAll('[data-action="search-result"]')];
    if (!results.length) {
      if (event.key === 'Escape') { event.preventDefault(); closePopover(); globalSearch.focus(); }
      return;
    }
    const current = results.indexOf(document.activeElement);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const next = event.key === 'ArrowDown'
        ? (current < 0 ? 0 : (current + 1) % results.length)
        : (current < 0 ? results.length - 1 : (current - 1 + results.length) % results.length);
      results[next].focus();
    } else if (event.key === 'Home') {
      event.preventDefault(); results[0].focus();
    } else if (event.key === 'End') {
      event.preventDefault(); results.at(-1).focus();
    } else if (event.key === 'Escape') {
      event.preventDefault(); closePopover(); globalSearch.focus();
    }
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) { state.pendingDelete = null; dialog.close(); }
  });
  dialog.addEventListener('close', () => { state.pendingDelete = null; });
  document.querySelector('#sidebar-scrim').addEventListener('click', () => closeMobileNav(true));
  document.querySelectorAll('[data-group-toggle]').forEach((button) => button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(expanded));
    document.querySelector(`[data-group="${button.dataset.groupToggle}"]`).hidden = !expanded;
  }));
  window.addEventListener('hashchange', () => {
    state.page = location.hash.slice(1) || 'overview';
    renderPage(true);
    closePopover();
  });
  window.addEventListener('resize', () => {
    if (state.popoverOwner) {
      const anchor = state.popoverOwner === 'notifications' ? document.querySelector('[data-action="notifications-popover"]')
        : state.popoverOwner === 'profile' ? document.querySelector('[data-action="profile-popover"]') : document.querySelector('.global-search');
      if (anchor) positionPopover(anchor);
    }
    if (!window.matchMedia('(max-width: 760px)').matches) closeMobileNav();
  });
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) { state.data = loadData(); renderPage(); }
    if (event.key === THEME_KEY && event.newValue) setTheme(event.newValue);
  });

  try {
    if (localStorage.getItem('fastlane-admin-sidebar-collapsed') === 'true') {
      document.body.classList.add('sidebar-collapsed');
      document.querySelector('#collapse-sidebar').setAttribute('aria-pressed','true');
      document.querySelector('#collapse-sidebar').setAttribute('aria-label','Expand sidebar');
      document.querySelector('#collapse-sidebar .nav-label').textContent = 'Expand sidebar';
    }
    setTheme(localStorage.getItem(THEME_KEY) || 'light');
  } catch {
    setTheme('light');
  }
  renderPage();
})();
