const DEMO_EMAIL = 'demo@fastlane.local';
const DEMO_PASSWORD = 'fastlane-demo';

const form = document.querySelector('#login-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const valid = data.get('email') === DEMO_EMAIL && data.get('password') === DEMO_PASSWORD;
    if (valid) {
      sessionStorage.setItem('fastlane-demo-session', 'active');
      window.location.assign('/onboarding.html');
    } else {
      document.querySelector('.login-error').hidden = false;
    }
  });
}

if ((window.location.pathname.endsWith('/dashboard.html') || window.location.pathname.endsWith('/onboarding.html')) && sessionStorage.getItem('fastlane-demo-session') !== 'active') {
  window.location.replace('/login.html');
}

document.querySelector('#logout-button')?.addEventListener('click', () => {
  sessionStorage.removeItem('fastlane-demo-session');
  window.location.assign('/login.html');
});

const toast = document.querySelector('#toast');
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}
document.querySelector('#new-campaign')?.addEventListener('click', () => showToast('Campaign creation is a preview in this demo.'));
document.querySelector('#ask-senna')?.addEventListener('click', () => showToast('Senna is ready to help in this demo workspace.'));

