const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const open = navigation.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); toggle.focus(); } });
window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
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
