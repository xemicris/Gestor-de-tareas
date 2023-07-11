import { Tarea } from "../app/modelos/tarea.modelo";

export const Filtros = {
    Todos: 'todos',
    Completados: 'Completados',
    Pendientes: 'Pendientes'
}

const situacionActualTareas = {
    tareas: [],
    filtro: Filtros.Todos,
}

const iniciarGuardadoLocalStorage = () => {
   cargarDesdeLocalStorage();
}

const cargarDesdeLocalStorage = () =>{
    if(!localStorage.getItem('tareas')) return;

    //desestructuración
    const {tareas = [], filtro = Filtros.Todos} = JSON.parse(localStorage.getItem('tareas'));
    situacionActualTareas.tareas = tareas;
    situacionActualTareas.filtro = filtro;
}

const guardarLocalStorage = () =>{
    localStorage.setItem('tareas', JSON.stringify(situacionActualTareas));
}

const obtenerTareas = (filtro = Filtros.Todos) =>{
    switch(filtro){
        case Filtros.Todos:
            /*Si no se pone el operador spread se regresa la referencia al objeto y hay que evitar modificar el 
            objeto original-> así se devuelve un array nuevo con cada valor*/
            return [...situacionActualTareas.tareas];// no se usa break porque ya hay un return

        case Filtros.Completados:
            return situacionActualTareas.tareas.filter(tarea => tarea.hecho)

        case Filtros.Pendientes:
            return situacionActualTareas.tareas.filter(tarea => tarea.hecho === false);

        default:
            throw new Error(`El filtro ${filtro} no es válido`);
    }
}

/**
 * 
 * @param {String} descripcion 
 */
const anadirTarea = (descripcion) => {
    if(!descripcion) throw new Error ('La descripción es obligatoria');
    
    situacionActualTareas.tareas.push(new Tarea(descripcion));

    guardarLocalStorage();
}

/**
 * 
 * @param {String} tareaId id de la tarea
 */
const estadoTarea = (tareaId) => {
    
    situacionActualTareas.tareas = situacionActualTareas.tareas.map(tarea => {
        if(tarea.id === tareaId){
            tarea.hecho = !tarea.hecho; //cambiar el valor de la propiedad hecho por la contraria
        }
        return tarea;
    });
    guardarLocalStorage();
}

/**
 * 
 * @param {String} tareaId id de la tarea
 */
const borrarTarea = (tareaId) => {
    
    //El filtro devuelve todas las tareas cuyo id no sea el que se le pasa
    situacionActualTareas.tareas = situacionActualTareas.tareas.filter(tarea => tarea.id !== tareaId);
    guardarLocalStorage();
}

const borrarTareasCompletadas = () =>{
    situacionActualTareas.tareas = situacionActualTareas.tareas.filter(tarea => !tarea.hecho);
    guardarLocalStorage();
}

/**
 * 
 * @param {Filtros} nuevoFiltro 
 */
const establecerFiltro = (nuevoFiltro = Filtros.Todos) => {
    situacionActualTareas.filtro = nuevoFiltro;
    guardarLocalStorage();
}

/**
 * 
 */
const obtenerFiltroActual = () =>{
    return situacionActualTareas.filtro;
}

export default{
    iniciarGuardadoLocalStorage,
    cargarDesdeLocalStorage,
    obtenerTareas,
    anadirTarea,
    estadoTarea,
    borrarTarea,
    borrarTareasCompletadas,
    establecerFiltro,
    obtenerFiltroActual,
}