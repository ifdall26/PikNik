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

  // Get the popup
  const popup = document.getElementById('bookingPopup');

  // Get the button that opens the popup
  const btn = document.querySelector('.booking button');

  // Get the <span> element that closes the popup
  const span = document.getElementsByClassName('close')[0];

  // When the user clicks the button, open the popup
  btn.onclick = function () {
    popup.style.display = 'flex';
  };

  // When the user clicks on <span> (x), close the popup
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
