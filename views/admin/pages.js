function cargarContenido(pagina) {
  // guardasr pagina actual
  localStorage.setItem('paginaActual', pagina);
  // Realiza una solicitud al servidor para obtener el contenido de la página específica
  fetch(`/admin/${pagina}`)
    .then(response => response.text())
    .then(data => {
      // Actualiza el contenido en el área designada
      document.getElementById('contenido').innerHTML = data;

      // funciones para las paginas dinamicas

      // registro bd
      const form = document.querySelector('#Registro');
      const nameInput = document.querySelector('#name');
      const lastnameInput = document.querySelector('#lastname');
      const emailInput = document.querySelector('#email');
      const cedulaInput = document.querySelector('#cedula');
      const phoneInput = document.querySelector('#phone');
      const userTypeSelect = document.querySelector('#userType');
      const birthdayInput = document.querySelector('#birthday');
      const admissionInput = document.querySelector('#admission');
      console.log(form);

      form.addEventListener('submit', async e => {
        try {
          e.preventDefault();
          const newUser = {
            name: nameInput.value,
            lastname: lastnameInput.value,
            email: emailInput.value,
            cedula: cedulaInput.value,
            phone: phoneInput.value,
            usertype: userTypeSelect.value,
            birthday: birthdayInput.value,
            admission: admissionInput.value
          };

          const response = await axios.post('/api/users', newUser);
          console.log(response);
        } catch (error) {
          console.log(error);
        }

      });

    })
    .catch(error => console.error('Error al cargar el contenido:', error));
}


document.addEventListener('DOMContentLoaded', () => {
  // Verifica si hay una página almacenada en el almacenamiento local
  const paginaAlmacenada = localStorage.getItem('paginaActual');

  // Si hay una página almacenada, carga su contenido
  if (paginaAlmacenada) {
    cargarContenido(paginaAlmacenada);
  }
});
