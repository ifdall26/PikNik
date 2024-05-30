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
