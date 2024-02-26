import { inicializarFormulario, inicializarFormularioTask } from "../components/formularioComponent.js";
import { getUsers, getTasks, counts } from "../components/getUsersComponent.js";

export function cargarContenido(pagina) {
  console.log('Cargando contenido para:', pagina);
    localStorage.setItem('paginaActual', pagina);
  
    fetch(`/admin/${pagina}`)
      .then(response => response.text())
      .then(data => {
        document.getElementById('contenido').innerHTML = data;
        if (pagina === 'estudiantesA') {
          getUsers();
        } else if (pagina === 'TaskAdminA') {
          inicializarFormularioTask();
          getTasks();
        } else if (pagina === 'dashboardSA') {
          counts();
        }
        else if (pagina === 'formUser') {
          inicializarFormulario();
        }
        
      })
      .catch(error => console.error('Error al cargar el contenido:', error));
}
  