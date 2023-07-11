import { v4 as uuid } from 'uuid';

export class Tarea{

    /**
     * 
     * @param {String} descripcion 
     */
    constructor(descripcion){
        this.id = uuid();
        this.descripcion = descripcion;
        this.hecho = false;
        this.fechaCreacion = new Date();
    }
}