
import { crearTareaHTML } from "./crear-tarea-html";

let elemento;

/**
 * 
 * @param {String} elementoId 
 * @param {Tarea} tareas 
 */
export const renderizarTareas = (elementoId, tareas = []) =>{

    if(!elemento) elemento = document.querySelector(elementoId);

    if(!elemento) throw new Error(`Elemento ${elementoId} no encontrado}`);

    elemento.innerHTML = '';

    tareas.forEach(tarea => {
        elemento.append(crearTareaHTML(tarea));
    });
}