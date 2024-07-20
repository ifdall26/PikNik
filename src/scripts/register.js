import '../styles/login.css';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nama = document.getElementById('nama').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('https://pariwisata-api-production-ffda.up.railway.app/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nama, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Registrasi berhasil:', data.message);
      alert('Registrasi berhasil!');
      // Redirect ke halaman utama atau halaman login setelah registrasi
      window.location.href = 'login.html';
    } else {
      console.log('Registrasi gagal:', data.error);
      alert(`Registrasi gagal: ${data.error}`);
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert('Registrasi gagal: Terjadi kesalahan pada server');
  }
});
