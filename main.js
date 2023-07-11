import './style.css'
import { App } from './src/app/app';
import guardarDatos from "./src/datos/tarea.datos";

guardarDatos.iniciarGuardadoLocalStorage();
App('#app');
