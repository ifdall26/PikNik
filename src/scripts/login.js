import '../styles/login.css';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.error);
    }

    const data = await response.json();
    alert(data.message);

    const { user } = data;

    // Simpan data pengguna ke localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', user.id); // Simpan userId
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userName', user.name);

    window.location.href = 'index.html'; // Redirect ke halaman setelah login berhasil
  } catch (error) {
    console.error('Login gagal:', error.message);
    alert('Login gagal. Silakan coba lagi.');
  }
});
