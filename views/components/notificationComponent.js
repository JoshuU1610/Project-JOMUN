export  function cerrarNotificacion() {
  const notificationModal = document.getElementById('notification');
  if (notificationModal) {
    // Ocultar el modal
    notificationModal.style.display = 'none';

    // Limpiar el contenido del modal
    notificationModal.innerHTML = '';
  }
}

export function abrirNotification() {
    document.getElementById('notification').style.display = 'flex';
    setTimeout(function () {
      cerrarNotificacion();
    }, 4000);
}