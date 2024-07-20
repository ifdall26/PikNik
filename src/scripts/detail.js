/* eslint-disable func-names */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
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

  window.onclick = function (event) {
    if (event.target == popup) {
      popup.style.display = 'none';
    }
  };

  document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailUser = localStorage.getItem('userEmail'); // Asumsi email disimpan di local storage dengan key 'userEmail'
    const form = e.target;

    const data = {
      tanggalCheckin: form.tanggalCheckin.value,
      tanggalCheckout: form.tanggalCheckout.value,
      jumlahTamu: form.jumlahTamu.value,
      jenisTransportasi: form.jenisTransportasi.value,
      jenisPenginapan: form.jenisPenginapan.value,
      metodePembayaran: form.metodePembayaran.value,
      destinasiId: selectedDestinasi.id,
      emailUser, // Kirimkan email user
    };

    console.log('Booking Data:', data);

    try {
      const response = await fetch('https://pariwisata-api-production-ffda.up.railway.app/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to book');
      }

      const result = await response.json();
      alert(result.message);
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal melakukan booking');
    }
  });

  const selectButtons = document.querySelectorAll('.select-button');
  selectButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const { type } = button.dataset;
      const { value } = button.dataset;

      // Reset selected class for the same type
      document.querySelectorAll(`.select-button[data-type="${type}"]`).forEach((btn) => btn.classList.remove('selected'));

      // Set selected class for clicked button
      button.classList.add('selected');

      // Update hidden input value
      document.getElementById(type).value = value;
    });
  });
});
