/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';

document.addEventListener('DOMContentLoaded', async () => {
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

  // Fetch and display destinasi data
  const destinasiData = await fetchDestinasiData();
  displayDestinasi(destinasiData);
});

async function fetchDestinasiData() {
  try {
    const response = await fetch('data/data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching destinasi data:', error);
  }
}

function displayDestinasi(data) {
  const infoDestinasiContainer = document.querySelector('.info-destinasi .container');
  const populerDestinasiContainer = document.querySelector('.populer-destinasi .container');

  infoDestinasiContainer.innerHTML = '';
  populerDestinasiContainer.innerHTML = '';

  data.forEach((destinasi, index) => {
    const cardInfo = `
      <div class="card card-info">
        <img src="${destinasi.gambar}" alt="${destinasi.nama_destinasi}">
        <div class="card-content">
          <h3><a href="#" class="detail-link" data-destinasi='${JSON.stringify(destinasi)}'>${destinasi.nama_destinasi}</a></h3>
          <p>${destinasi.deskripsi}</p>
        </div>
      </div>
    `;
    infoDestinasiContainer.innerHTML += cardInfo;

    if (index < 3) { // menampilkan 3 destinasi populer
      const cardPopuler = `
        <div class="card model-2">
          <div class="loc">
            <div class="location">Kota: ${destinasi.lokasi}</div>
            <h3>${destinasi.nama_destinasi}</h3>
          </div>
          <img src="${destinasi.gambar}" alt="${destinasi.nama_destinasi}">
          <div class="card-content">
            <div class="rating">Rating: <span>${destinasi.rating}</span></div>
            <p>${destinasi.deskripsi}</p>
          </div>
        </div>
      `;
      populerDestinasiContainer.innerHTML += cardPopuler;
    }
  });

  // Add event listeners to detail links
  const detailLinks = document.querySelectorAll('.detail-link');
  detailLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const destinasi = JSON.parse(event.target.getAttribute('data-destinasi'));
      localStorage.setItem('selectedDestinasi', JSON.stringify(destinasi));
      window.location.href = 'detail.html';
    });
  });
}
