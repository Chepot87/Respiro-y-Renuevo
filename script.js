const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function syncMenu() { navigation.inert = window.innerWidth <= 900 && !navigation.classList.contains('open'); }
function closeMenu() { navigation.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); syncMenu(); }
toggle.addEventListener('click', () => { const open = navigation.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); syncMenu(); });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); toggle.focus(); } });
window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
syncMenu();
const copy = {
  en: {
    skip:'Skip to main content', menu:'Menu', home:'Home', retreats:'Retreats & Events', private:'Private Experiences', about:'About', contact:"Let's connect",
    groupsLabel:'Together, with purpose', groupsTitle:'Who is this', groupsAccent:'for?', group1:'Birthdays & anniversaries', group2:'Friends & bachelorettes', group3:'Teams & companies', group4:'Community & educational groups', group5:'Families',
    trust:'All experiences are conducted by vetted, certified professionals. We work exclusively with locally owned venues and vendors.', ctaText:"Your group. Your intention. We'll take care of the rest.", cta:'Plan your experience',
    contactLabel:'It starts with a conversation', contactTitle:"Let's create", contactAccent:'your moment.', contactIntro:'Tell us about your group and the experience you have in mind.', name:'First & Last Name', email:'Email *', subject:'Subject *', vision:'Your vision, preferred dates, and estimated group size', phone:'Phone', submit:'Send inquiry', formNote:'Preview: this form is not connected yet and does not send inquiries.',
    footer:'Wellness with purpose. Community, education, and nature in Puerto Rico. Across the island, supporting 100% local venues and vendors.', terms:'Terms & Conditions', privacy:'Privacy Policy', accessibility:'Accessibility Statement'
  },
  es: {
    skip:'Saltar al contenido principal', menu:'Menú', home:'Inicio', retreats:'Retiros y eventos', private:'Experiencias privadas', about:'Nosotros', contact:'Conversemos',
    groupsLabel:'Juntos, con propósito', groupsTitle:'¿Para qué tipo de', groupsAccent:'grupos?', group1:'Cumpleaños y aniversarios', group2:'Amigas y despedidas de soltera', group3:'Equipos de trabajo y empresas', group4:'Comunidades e instituciones educativas', group5:'Familias',
    trust:'Todas las experiencias son facilitadas por profesionales certificados y evaluados. Trabajamos exclusivamente con proveedores y locaciones locales.', ctaText:'Tu grupo. Tu intención. Nosotros nos encargamos del resto.', cta:'Planifica tu experiencia',
    contactLabel:'Comienza con una conversación', contactTitle:'Vamos a crear', contactAccent:'tu momento.', contactIntro:'Cuéntanos sobre tu grupo y la experiencia que tienes en mente.', name:'Nombre y apellido', email:'Correo electrónico *', subject:'Asunto *', vision:'Tu idea, fechas preferidas y cantidad estimada de personas', phone:'Teléfono', submit:'Enviar consulta', formNote:'Vista previa: este formulario todavía no está conectado y no envía solicitudes.',
    footer:'Bienestar con propósito. Comunidad, educación y naturaleza en Puerto Rico. Trabajamos en toda la isla y apoyamos proveedores y locaciones 100% locales.', terms:'Términos y condiciones', privacy:'Política de privacidad', accessibility:'Declaración de accesibilidad'
  }
};
let language = 'en';
function setLanguage(next) {
  if (!copy[next]) return;
  language = next;
  document.documentElement.lang = next;
  document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = copy[next][element.dataset.i18n]; });
  document.querySelectorAll('[data-content-language]').forEach(element => { element.hidden = element.dataset.contentLanguage !== next; });
  document.querySelectorAll('[data-language]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.language === next)); });
  navigation.setAttribute('aria-label', next === 'es' ? 'Navegación principal' : 'Main navigation');
  const pageTitle = next === 'es' ? document.body.dataset.titleEs : document.body.dataset.titleEn;
  document.title = `${pageTitle || 'Respiro y Renuevo'} | Respiro y Renuevo`;
  try { localStorage.setItem('respiro-language', next); } catch { /* Switching works without storage. */ }
}
document.querySelectorAll('[data-language]').forEach(button => { button.addEventListener('click', () => setLanguage(button.dataset.language)); });
try { const saved = localStorage.getItem('respiro-language'); if (copy[saved]) setLanguage(saved); } catch { /* Default to English. */ }
document.querySelector('form')?.addEventListener('submit', event => { event.preventDefault(); document.querySelector('.form-status').textContent = copy[language].formNote; });

// Animate on entry without hiding content if JavaScript or observation is unavailable.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const entered = new WeakSet();
const activeEntrances = new Set();
if ('IntersectionObserver' in window && typeof Element.prototype.animate === 'function') {
  const entrances = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting || entered.has(target)) return;
      entered.add(target);
      entrances.unobserve(target);
      if (reducedMotion.matches) return;
      const siblings = Array.from(target.parentElement.children);
      const delay = target.classList.contains('detail-panel') ? (siblings.indexOf(target) % 2) * 70 : 0;
      const animation = target.animate(
        [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 550, delay, easing: 'cubic-bezier(.22,1,.36,1)' }
      );
      activeEntrances.add(animation);
      animation.finished.catch(() => {}).finally(() => activeEntrances.delete(animation));
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-intro, .detail-panel, .story-section, .groups-section, .section-cta, .contact-intro, form, .footer-brand').forEach(element => entrances.observe(element));
}
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) activeEntrances.forEach(animation => animation.cancel());
});
document.addEventListener('focusin', event => {
  activeEntrances.forEach(animation => { if (animation.effect.target.contains(event.target)) animation.finish(); });
});
const header = document.querySelector('.site-header');
let scrollFramePending = false;
function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 16); scrollFramePending = false; }
window.addEventListener('scroll', () => {
  if (!scrollFramePending) { scrollFramePending = true; requestAnimationFrame(updateHeader); }
}, { passive: true });
updateHeader();
