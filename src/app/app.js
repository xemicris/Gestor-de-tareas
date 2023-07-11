import html from "./app.html?raw";
import tareas, {Filtros} from "../datos/tarea.datos";
import { renderizarTareas, renderizarContador } from "./funciones";

const referenciasHTML = {
    eliminarCompletado: '.clear-completed',
    listaTareas: '.todo-list',
    inputNuevaTarea: '#new-todo-input',
    filtros: '.filtro',
    contadorPendientes: '#pending-count',
}

/**
 * Función que crea lo que se va a renderizar en pantalla
 * @param {String} elementoId elemento donde renderizar la aplicación
 */
export const App = (elementoId) => {

    const mostrarTareas = () => {

        const todasTareas = tareas.obtenerTareas(tareas.obtenerFiltroActual());
        renderizarTareas(referenciasHTML.listaTareas, todasTareas);
        contadorTareasPendientes();
    }

    const contadorTareasPendientes = () =>{
        renderizarContador(referenciasHTML.contadorPendientes);
    }
    
    //Cuando la función App se llama
    (() =>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementoId).append(app);
        mostrarTareas();
    })()

    //Referencias HTML
    const inputDescripcion = document.querySelector(referenciasHTML.inputNuevaTarea);
    const listaTareas = document.querySelector(referenciasHTML.listaTareas);
    const  eliminarTareasCompletadas = document.querySelector(referenciasHTML.eliminarCompletado);
    const  filtrosLI = document.querySelectorAll(referenciasHTML.filtros);

    //Eventos
    inputDescripcion.addEventListener('keyup', (evento)=>{
        if(evento.keyCode !== 13) return; //solo si se presiona ENTER va a continuar

        if(evento.target.value.trim().length === 0) return; // solo continúa si hay un valor

        tareas.anadirTarea(evento.target.value); // se añade la tarea
        mostrarTareas();
        evento.target.value = '';
    } );

    listaTareas.addEventListener('click', (evento)=>{
        const elementoPadre = evento.target.closest('[data-id]');
        tareas.estadoTarea(elementoPadre.getAttribute('data-id'));
        mostrarTareas();
    })

    listaTareas.addEventListener('click', (evento)=>{
        const elementoPadre = evento.target.closest('[data-id]');
        if(!elementoPadre || evento.target.className != 'destroy') return 
        tareas.borrarTarea(elementoPadre.getAttribute('data-id'));
        mostrarTareas();
    })

    eliminarTareasCompletadas.addEventListener('click', () =>{
        tareas.borrarTareasCompletadas();
        mostrarTareas();
    });

    filtrosLI.forEach(filtro =>{
        filtro.addEventListener('click', (filtro) =>{
            //elimina el borde de todos los botones
            filtrosLI.forEach(li => li.classList.remove('selected'));
            //añade el borde a la clase que se haga click
            filtro.target.classList.add('selected');

            switch(filtro.target.text){
                case 'Todos':
                    tareas.establecerFiltro(Filtros.Todos);
                    break;
                case 'Completados':
                    tareas.establecerFiltro(Filtros.Completados);
                    break;
                case 'Pendientes':
                    tareas.establecerFiltro(Filtros.Pendientes);
                    break;
            }
            mostrarTareas();
        })
    });
}