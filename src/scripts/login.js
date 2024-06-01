import '../styles/login.css';

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log('Email:', email);
  console.log('Password:', password);

  alert('Login form submitted');
});
