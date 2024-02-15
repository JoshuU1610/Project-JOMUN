import { deleteUser, deleteTask } from "../components/deleteComponent.js";

export function abrirModal() {
    document.getElementById('miModal').style.display = 'flex';
}
  
export function cerrarModal() {
  document.getElementById('miModal').style.display = 'none';
}