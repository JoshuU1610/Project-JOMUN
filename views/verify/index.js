const contenido = document.querySelector('#Contenido');
(async () => {
  try {
    const token = window.location.pathname.split('/')[3];
    const userid = window.location.pathname.split('/')[2];
    await axios.patch(`/api/users/${userid}/${token}`);
    window.location.pathname = '/signup/';
  } catch (error) {
    contenido.innerHTML = `
    <div class="bg-zinc-200 w-full md:w-2/4 p-4 text-center rounded-lg shadow-md">
        <p>${error.response.data.message}</p>
    </div>`;
  }

})();