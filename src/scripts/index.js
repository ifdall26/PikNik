import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';

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
