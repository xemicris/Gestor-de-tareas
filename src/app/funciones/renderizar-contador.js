import tareaDatos, { Filtros } from "../../datos/tarea.datos";

let elemento;

/**
 * 
 * @param {String} elementoId 
 */
export const renderizarContador = (elementoId) => {

    if(!elemento) elemento  = document.querySelector(elementoId);
    if(!elemento) throw new Error(`El elemento ${elementoId} no se ha encontrado`);

    elemento.innerHTML = tareaDatos.obtenerTareas(Filtros.Pendientes).length;

}