export  function cerrarNotificacion() {
  const notificationModal = document.getElementById('notification-container');
  if (notificationModal) {
    // Ocultar el modal
    notificationModal.style.display = 'none';

    // Limpiar el contenido del modal
    notificationModal.innerHTML = '';
  }
}

export const abrirNotification = () => {
  // Verificar si la notificación ya existe
  let notificationContainer = document.getElementById('notification-container');

  // Si la notificación no existe, no hagas nada o puedes manejar la situación según tus necesidades
  if (!notificationContainer) {
    console.error("Error: El contenedor de notificación no existe.");
    return;
  }

  // Modifica el estilo para mostrar la notificación
  notificationContainer.style.display = 'block';
};
