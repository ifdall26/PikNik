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

  // Event listener for booking form submission
  document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log('Form submitted'); // Debugging log

    const tanggalCheckin = document.getElementById('tanggalCheckin').value;
    const tanggalCheckout = document.getElementById('tanggalCheckout').value;
    const jumlahTamu = document.getElementById('jumlahTamu').value;
    const jenisTransportasi = document.querySelector('input[name="jenisTransportasi"]:checked').value;
    const jenisPenginapan = document.querySelector('input[name="jenisPenginapan"]:checked').value;
    const metodePembayaran = document.querySelector('input[name="metodePembayaran"]:checked').value;

    const bookingData = {
      tanggalCheckin,
      tanggalCheckout,
      jumlahTamu,
      jenisTransportasi,
      jenisPenginapan,
      metodePembayaran,
    };

    console.log('Booking Data:', bookingData); // Debugging log

    try {
      const response = await fetch('http://localhost:3000/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      console.log('Response:', response); // Debugging log

      if (!response.ok) {
        throw new Error('Failed to book');
      }

      const result = await response.json();
      console.log('Result:', result); // Debugging log
      alert('Booking berhasil');
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Error:', error);
      alert(`Booking gagal: ${error.message}`);
    }
  });
});
