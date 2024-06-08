import '../styles/login.css';

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log('Email:', email);
  console.log('Password:', password);

  // Simpan informasi registrasi di local storage
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userEmail', email);

  alert('Register form submitted');

  // Redirect ke halaman utama setelah registrasi
  window.location.href = 'index.html';
});
