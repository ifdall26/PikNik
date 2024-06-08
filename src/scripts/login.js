import '../styles/login.css';

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log('Email:', email);
  console.log('Password:', password);

  // Simpan informasi login di local storage
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userEmail', email);

  alert('Login form submitted');

  // Redirect ke halaman utama setelah login
  window.location.href = 'index.html';
});
