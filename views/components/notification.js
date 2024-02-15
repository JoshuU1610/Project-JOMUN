// Función para crear o mostrar una notificación

import { abrirNotification, cerrarNotificacion} from "../components/notificationComponent.js";

// eslint-disable-next-line no-unused-vars
export const crearNotificacion = (error, mensaje) => {
  // Verificar si el modal ya existe
  let notificationModal = document.getElementById('notification');

  // Si el modal no existe, créalo
  if (!notificationModal) {
    notificationModal = document.createElement('div');
    notificationModal.id = 'notification';
    notificationModal.className = 'modal';
    document.body.appendChild(notificationModal);
  }
  let contenidoNotificacion = '';
  if (error) {
    contenidoNotificacion = `
    <div class="modal-content">
    <div class="column">
      <div class="icon-error">
        <i class="uil uil-exclamation-triangle"></i>
      </div>
      <p>${mensaje}</p>
    </div>
</div>`;
  } else {
    contenidoNotificacion = `
      <div class="modal-content">
      <div class="column">
        <div class="icon-sucess">
            <i class="uil uil-check-square"></i>
        </div>
        <p>${mensaje}</p>
        </div>
    </div>`;
  }

  // Establecer el contenido del modal
  notificationModal.innerHTML = contenidoNotificacion;

  // Mostrar el modal
  abrirNotification();

  // Ocultar la notificación después de 4 segundos (4000 milisegundos)
  setTimeout(() => {
    cerrarNotificacion();
  }, 3000);
};
