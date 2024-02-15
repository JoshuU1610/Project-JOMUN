// index.js
import { inicializarDiseñoGeneral, GetDataUsar } from '../components/diseñoGeneralComponent.js';
import { cargarContenido } from '../components/contenidoComponent.js';
import { agregarEventos } from '../components/eventos.js';
import { counts } from "../components/getUsersComponent.js";

document.addEventListener('DOMContentLoaded', () => {
  inicializarDiseñoGeneral();
  counts();
  GetDataUsar();
  const paginaAlmacenada = localStorage.getItem('paginaActual');
  if (paginaAlmacenada) {
    cargarContenido(paginaAlmacenada);
  }
   agregarEventos();
});