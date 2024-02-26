export function inicializarDiseñoGeneral() {
    const body = document.querySelector('body'),
      modeToggle = body.querySelector('.mode-toggle'),
      sidebar = body.querySelector('nav'),
      sidebarToggle = body.querySelector('.sidebar-toggle');
  
    let getMode = localStorage.getItem('mode');
    if (getMode && getMode === 'dark') {
      body.classList.toggle('dark');
    }
  
    let getStatus = localStorage.getItem('status');
    if (getStatus && getStatus === 'close') {
      sidebar.classList.toggle('close');
    }
  
    modeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      if (body.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
      } else {
        localStorage.setItem('mode', 'light');
      }
    });
  
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('close');
      if (sidebar.classList.contains('close')) {
        localStorage.setItem('status', 'close');
      } else {
        localStorage.setItem('status', 'open');
      }
    });
  }


  export async function GetDataUsar() {
    const response = await axios.get('/api/users/getdata');
    const UserData = response.data;
    const Pusername = document.getElementById('username');

    Pusername.innerHTML = `
    <span class="block" style="color: var(--text-color);">Bienvenido ${UserData.name} ${UserData.lastname}</span>
     `;
}