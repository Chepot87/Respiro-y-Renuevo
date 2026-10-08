const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); toggle.focus(); } });
document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('.form-status').textContent = 'Esta es una vista previa local. Todavía no se envían solicitudes. / This local preview does not send inquiries yet.';
});
