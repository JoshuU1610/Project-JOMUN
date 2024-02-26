// Función para crear o mostrar una notificación

// Función para crear o mostrar una notificación
import { abrirNotification, cerrarNotificacion } from "../components/notificationComponent.js";

// eslint-disable-next-line no-unused-vars
export const crearNotificacion = (error, mensaje) => {
  // Verificar si la notificación ya existe
  let notificationContainer = document.getElementById('notification-container');

  // Si la notificación no existe, créala
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.className = 'fixed bottom-4 left-4 p-4 bg-white text-gray-800 shadow-md rounded-md cursor-pointer';
    document.body.appendChild(notificationContainer);
  }

  let contenidoNotificacion = '';

  if (error) {
    contenidoNotificacion = `
    <div class="flex items-center">
      <div class="icon-error text-2xl mr-2">
        <!-- Reemplaza la clase del icono según tu biblioteca de iconos -->
        <i class="uil uil-exclamation-triangle"></i>
      </div>
      <p>${mensaje}</p>
    </div>`;
  } else {
    contenidoNotificacion = `
    <div class="flex items-center">
      <div class="icon-success text-2xl mr-2">
        <!-- Reemplaza la clase del icono según tu biblioteca de iconos -->
        <i class="uil uil-check-square"></i>
      </div>
      <p>${mensaje}</p>
    </div>`;
  }

  // Establecer el contenido de la notificación
  notificationContainer.innerHTML = contenidoNotificacion;

  // Mostrar la notificación
  abrirNotification();

  // Ocultar la notificación después de 4 segundos (4000 milisegundos)
  setTimeout(() => {
    cerrarNotificacion();
  }, 3000);
};

