import '../styles/profile.css';

document.addEventListener('DOMContentLoaded', () => {
  const dataPribadiTab = document.getElementById('dataPribadiTab');
  const pesananSayaTab = document.getElementById('pesananSayaTab');

  const dataPribadiContent = document.getElementById('dataPribadiContent');
  const pesananSayaContent = document.getElementById('pesananSayaContent');

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
