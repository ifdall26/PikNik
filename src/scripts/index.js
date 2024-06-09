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

  const loginButton = document.querySelector('.btn-orange');
  const registerButton = document.querySelector('.btn-blue');
  const userEmailElement = document.getElementById('userEmail');
  const userProfileSection = document.getElementById('userProfile');
  const profilePopup = document.getElementById('profilePopup');
  const logoutButton = document.getElementById('logoutButton');
  const profileButton = document.getElementById('profileButton');

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userEmail = localStorage.getItem('userEmail');

  if (isLoggedIn) {
    loginButton.style.display = 'none';
    registerButton.style.display = 'none';
    userProfileSection.style.display = 'flex';
    userEmailElement.textContent = userEmail;
  } else {
    loginButton.style.display = 'block';
    registerButton.style.display = 'block';
    userProfileSection.style.display = 'none';
  }

  userProfileSection.addEventListener('click', () => {
    profilePopup.style.display = profilePopup.style.display === 'block' ? 'none' : 'block';
  });

  window.addEventListener('click', (event) => {
    if (!userProfileSection.contains(event.target)) {
      profilePopup.style.display = 'none';
    }
  });

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    alert('Logged out successfully');
    window.location.href = 'index.html';
  });

  loginButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

  registerButton.addEventListener('click', () => {
    window.location.href = 'register.html';
  });

  profileButton.addEventListener('click', () => {
    window.location.href = 'profil.html';
  });
});
