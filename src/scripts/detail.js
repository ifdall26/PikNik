/* eslint-disable no-alert */
/* eslint-disable func-names */
/* eslint-disable eqeqeq */
import '../styles/detail.css';

document.addEventListener('DOMContentLoaded', () => {
  const selectedDestinasi = JSON.parse(localStorage.getItem('selectedDestinasi'));

  if (selectedDestinasi) {
    document.title = selectedDestinasi.nama_destinasi;
    document.getElementById('heroImage').src = selectedDestinasi.gambar;
    document.getElementById('namaDestinasi').textContent = selectedDestinasi.nama_destinasi;
    document.getElementById('deskripsiDestinasi').textContent = selectedDestinasi.deskripsi;
    document.getElementById('mapSrc').src = selectedDestinasi.mapSrc;
  } else {
    alert('Tidak ada destinasi yang dipilih');
    window.location.href = 'index.html';
  }

  const popup = document.getElementById('bookingPopup');

  const btn = document.querySelector('.booking button');

  const span = document.getElementsByClassName('close')[0];

  btn.onclick = function () {
    popup.style.display = 'flex';
  };

  span.onclick = function () {
    popup.style.display = 'none';
  };

  // When the user clicks anywhere outside of the popup, close it
  window.onclick = function (event) {
    if (event.target == popup) {
      popup.style.display = 'none';
    }
  };
});
