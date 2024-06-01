import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';

// event listener untuk drawer button
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.getElementById('hamburgerButton');
  const navMenu = document.getElementById('navMenu');

  hamburgerButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
});

// eventlistener button login & daftar
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.querySelector('.btn-orange');
  const registerButton = document.querySelector('.btn-blue');

  loginButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

  registerButton.addEventListener('click', () => {
    window.location.href = 'register.html';
  });
});
