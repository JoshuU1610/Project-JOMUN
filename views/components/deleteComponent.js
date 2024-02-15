import { crearNotificacion } from "../components/notification.js";
import { getUsers, getTasks } from "../components/getUsersComponent.js";

export async function deleteUser(userid) {
    try {
        console.log(userid);
        await axios.delete(`/api/users/delete/${userid}`);
        crearNotificacion(false, 'Usuario Borrado con exito');
        const containerUsers = document.querySelector('#users');
        containerUsers.innerHTML= ``;
        getUsers();
    } catch (error) {
        crearNotificacion(true, 'No se pudo borrar el usuario');
    }
}

export async function deleteTask(taskid) {
    try {
        console.log(taskid);
        await axios.delete(`/api/task/delete/${taskid}`);
        crearNotificacion(false, 'Reunion Borrada con exito');
        const containertasks = document.querySelector('#containerTasks');
        containertasks.innerHTML= ``;
        getTasks();
    } catch (error) {
        crearNotificacion(true, 'No se pudo borrar la reunion');
    }
}