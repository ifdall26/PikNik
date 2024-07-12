/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import '../styles/profile.css';

document.addEventListener('DOMContentLoaded', () => {
  const dataPribadiTab = document.getElementById('dataPribadiTab');
  const pesananSayaTab = document.getElementById('pesananSayaTab');
  const dataPribadiContent = document.getElementById('dataPribadiContent');
  const pesananSayaContent = document.getElementById('pesananSayaContent');

  const usernameDisplay = document.getElementById('usernameDisplay');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const orderContainer = document.getElementById('ordersContainer');
  const logoutButton = document.getElementById('logoutButton');

  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const userId = localStorage.getItem('userId'); // Ambil userId dari localStorage

  if (userName) {
    usernameDisplay.textContent = userName;
    nameInput.value = userName;
  }

  if (userEmail) {
    emailInput.value = userEmail;
  }

  if (userId) {
    fetchBookings(userId);
  }

  dataPribadiTab.addEventListener('click', () => {
    dataPribadiTab.classList.add('active');
    pesananSayaTab.classList.remove('active');
    dataPribadiContent.classList.add('active');
    pesananSayaContent.classList.remove('active');
  });

  pesananSayaTab.addEventListener('click', () => {
    pesananSayaTab.classList.add('active');
    dataPribadiTab.classList.remove('active');
    pesananSayaContent.classList.add('active');
    dataPribadiContent.classList.remove('active');
  });

  async function fetchBookings(userId) {
    try {
      const response = await fetch(`http://localhost:3000/booking/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const bookings = await response.json();
      displayBookings(bookings);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  function displayBookings(bookings) {
    orderContainer.innerHTML = ''; // Bersihkan kontainer sebelum menambahkan elemen baru
    bookings.forEach((booking) => {
      const bookingItem = document.createElement('div');
      bookingItem.classList.add('order-item');

      const img = document.createElement('img');
      img.src = booking.gambar;
      img.alt = booking.Destinasi.nama_destinasi || 'Destination Image'; // Pastikan menggunakan casing yang sesuai

      const bookingDetails = document.createElement('div');
      bookingDetails.classList.add('order-details');

      const destinationId = document.createElement('h4');
      destinationId.textContent = booking.id;

      const checkIn = document.createElement('p');
      checkIn.innerHTML = `<strong>Tanggal Check-In:</strong> ${new Date(booking.tanggalCheckin).toLocaleDateString('id-ID')}`;

      const checkOut = document.createElement('p');
      checkOut.innerHTML = `<strong>Tanggal Check-Out:</strong> ${new Date(booking.tanggalCheckout).toLocaleDateString('id-ID')}`;

      bookingDetails.appendChild(destinationId);
      bookingDetails.appendChild(checkIn);
      bookingDetails.appendChild(checkOut);

      bookingItem.appendChild(img);
      bookingItem.appendChild(bookingDetails);

      orderContainer.appendChild(bookingItem);
    });
  }

  // Logout button functionality
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    window.location.href = 'login.html';
  });
});
