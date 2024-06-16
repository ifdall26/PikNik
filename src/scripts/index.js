/* eslint-disable no-undef */
/* eslint-disable implicit-arrow-linebreak */
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

  // Add event listener for search bar
  const searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = destinasiData.filter((destinasi) =>
      destinasi.nama_destinasi.toLowerCase().includes(searchTerm)
      || destinasi.lokasi.toLowerCase().includes(searchTerm)
      || destinasi.deskripsi.toLowerCase().includes(searchTerm));
    displayFilteredDestinasi(filteredData);
  });
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

  // Sort data by rating in descending order
  const sortedData = data.sort((a, b) => b.rating - a.rating);

  infoDestinasiContainer.innerHTML = '';
  populerDestinasiContainer.innerHTML = '';

  // Display all destinasi
  sortedData.forEach((destinasi) => {
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
  });

  // Display top 3 rated destinasi as popular
  sortedData.slice(0, 3).forEach((destinasi) => {
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
  });

  // Add event listeners to detail links
  addDetailLinksEventListeners();
}

function displayFilteredDestinasi(data) {
  const infoDestinasiContainer = document.querySelector('.info-destinasi .container');

  infoDestinasiContainer.innerHTML = '';

  // Display filtered destinasi
  data.forEach((destinasi) => {
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
  });

  // Add event listeners to detail links
  addDetailLinksEventListeners();
}

function addDetailLinksEventListeners() {
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

function sendEmail() {
  const templateParams = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };
  emailjs.send('service_qjdczvi', 'template_60axdk9', templateParams)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      alert('Thank you for your feedback!');
    }, (error) => {
      console.log('FAILED...', error);
      alert('Oops! Something went wrong.');
    });
}

// Expose sendEmail to global scope
window.sendEmail = sendEmail;
