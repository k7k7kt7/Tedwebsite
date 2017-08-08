const menuToggle = document.querySelector('.nav-menu__toggle');

menuToggle.addEventListener('click', (e) => {
  const menu = document.querySelector('.nav-menu');
  e.stopPropagation();
  e.preventDefault();
  menu.classList.toggle('nav-menu__open');
  document.body.classList.toggle('is-offcanvas');
  menuToggle.classList.toggle('is-offcanvas');
});
