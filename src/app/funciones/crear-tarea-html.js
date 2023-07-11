

/**
 * 
 * @param {Tarea} tarea 
 */
export const crearTareaHTML = (tarea) => {
    if(!tarea) throw new Error ('una Tarea es obligatoria');

    const {hecho, descripcion, id} = tarea;

    const html = `
            <div class="view">
                <input class="toggle" type="checkbox" ${hecho ? 'checked' : ''}>
                <label>${descripcion}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
    `;
    const elementoLi = document.createElement('li');
    elementoLi.innerHTML = html;
    elementoLi.setAttribute('data-id', id);

    if(tarea.hecho) elementoLi.classList.add('completed');

    return elementoLi;
}