document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();

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

    try {
      const response = await fetch('http://localhost:3000/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Gagal melakukan booking');
      }

      const result = await response.json();
      console.log('Result:', result);
      alert('Booking berhasil');
    } catch (error) {
      console.error('Error:', error);
      alert(`Booking gagal: ${error.message}`);
    }
  });
});
