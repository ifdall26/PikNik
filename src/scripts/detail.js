/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
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
  const btn = document.getElementById('openBookingForm');
  const span = document.getElementsByClassName('close')[0];

  btn.onclick = function () {
    popup.style.display = 'flex';
  };

  span.onclick = function () {
    popup.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == popup) {
      popup.style.display = 'none';
    }
  };

  const selectButtons = document.querySelectorAll('.select-button');
  selectButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const type = this.getAttribute('data-type');
      const value = this.getAttribute('data-value');

      document.getElementById(type).value = value;

      selectButtons.forEach((btn) => {
        if (btn.getAttribute('data-type') === type) {
          btn.classList.remove('selected');
        }
      });
      this.classList.add('selected');
    });
  });

  document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const tanggalCheckin = document.getElementById('tanggalCheckin').value;
    const tanggalCheckout = document.getElementById('tanggalCheckout').value;
    const jumlahTamu = document.getElementById('jumlahTamu').value;
    const jenisTransportasi = document.getElementById('jenisTransportasi').value;
    const jenisPenginapan = document.getElementById('jenisPenginapan').value;
    const metodePembayaran = document.getElementById('metodePembayaran').value;

    const bookingData = {
      tanggalCheckin,
      tanggalCheckout,
      jumlahTamu,
      jenisTransportasi,
      jenisPenginapan,
      metodePembayaran,
      destinasiId: selectedDestinasi.id,
    };

    try {
      const response = await fetch('http://localhost:3000/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to book');
      }

      const result = await response.json();
      alert('Booking berhasil');
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Error:', error);
      alert(`Booking gagal: ${error.message}`);
    }
  });
});
