import { crearNotificacion } from "../components/notification.js";

// scrollreveal.
const sr = ScrollReveal ({
  distance: '65px',
  duration: 2600,
  delay: 450,
  reset: true
});

sr.reveal('.content-container',{ delay: 200, origin: 'top' });
sr.reveal('.form-wrapper',{ delay: 450, origin: 'top' });

// Codigo del form
const form = document.querySelector('#login');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const user = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    await axios.post('/api/login', user);

    window.location.pathname = `/admin`;
  } catch (error) {
    console.log(error);
    crearNotificacion(true, error.response.data.message);
  }

});