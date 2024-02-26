import { abrirModal, cerrarModal } from "../components/modalComponent.js";
import { cargarContenido } from "../components/contenidoComponent.js";
import { crearNotificacion } from "../components/notification.js";
import { manejarEnvioFormularioTask, manejarEnvioFormulario } from "./formularioComponent.js";
import { LogOut } from "../components/logOutComponent.js";
import { deleteUser, deleteTask } from "../components/deleteComponent.js";

export function agregarEventos() {
    document.addEventListener('click', function (e) {
        const target = e.target;
    
        function getParentWithId(element, id) {
            return element.closest(`[id="${id}"]`);
        }
    
        const inicioLink = getParentWithId(target, 'inicioLink');
        const reunionesLink = getParentWithId(target, 'reunionesLink');
        const usuariosLink = getParentWithId(target, 'usuariosLink');
        const agregarUsuarioBtn = getParentWithId(target, 'agg');
        const RegresarUsuarioBtn = getParentWithId(target, 'returnUsers');
        const agregarTareaBtn = getParentWithId(target, 'addTask');
        const logOutBtn = getParentWithId(target, 'logout');
    
        if (inicioLink) {
            cargarContenido('dashboardSA');
        } else if (reunionesLink) {
            cargarContenido('TaskAdminA');
        } else if (usuariosLink) {
            cargarContenido('estudiantesA');
        } else if (agregarUsuarioBtn) {
            cargarContenido('formUser')
        } else if (RegresarUsuarioBtn) {
            cargarContenido('estudiantesA');
        } else if (target.id === 'submit') {
            manejarEnvioFormulario();
        } else if (agregarTareaBtn) {
            abrirModal();
        } else if (logOutBtn) {
            LogOut();
        } else if (target.id === 'submit-task') {
            manejarEnvioFormularioTask();
        } else if (target.id === 'DeleteUserBtn') {
            const userId = target.closest('.usuarioaja').getAttribute('boxid');
            deleteUser(userId);
        } else if (target.id === 'DeleteTaskBtn') {
            const taskId = target.closest('.bg-white').getAttribute('boxid');
            deleteTask(taskId);
        }
    });
    
}

