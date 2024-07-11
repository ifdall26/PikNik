import '../styles/profile.css';

document.addEventListener('DOMContentLoaded', () => {
  const dataPribadiTab = document.getElementById('dataPribadiTab');
  const pesananSayaTab = document.getElementById('pesananSayaTab');
  const dataPribadiContent = document.getElementById('dataPribadiContent');
  const pesananSayaContent = document.getElementById('pesananSayaContent');

  const usernameDisplay = document.getElementById('usernameDisplay');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  // Tambahkan input lain jika diperlukan

  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  // Ambil data lain jika diperlukan

  if (userName) {
    usernameDisplay.textContent = userName;
    nameInput.value = userName;
  }

  if (userEmail) {
    emailInput.value = userEmail;
  }

  dataPribadiTab.addEventListener('click', () => {
    dataPribadiTab.classList.add('active');
    pesananSayaTab.classList.remove('active');
    dataPribadiContent.classList.add('active');
    pesananSayaContent.classList.remove('active');
  });

  pesananSayaTab.addEventListener('click', () => {
    pesananSayaTab.classList.add('active');
    dataPribadiTab.classList.remove('active');
    pesananSayaContent.classList.add('active');
    dataPribadiContent.classList.remove('active');
  });
});
