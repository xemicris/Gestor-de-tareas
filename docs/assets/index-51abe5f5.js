(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&c(p)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();const w=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="Nombre de la tarea" autofocus>\r
    </header>\r
    \r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
        </ul>\r
    </section>\r
\r
    <footer class="footer">\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <ul class="filters">\r
            <li>\r
                <a class="filtro" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <p>Creado por <a href="https:xemicris.com">xemicris.com</a></p>\r
</footer>`;let f;const S=new Uint8Array(16);function E(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(S)}const a=[];for(let e=0;e<256;++e)a.push((e+256).toString(16).slice(1));function v(e,t=0){return(a[e[t+0]]+a[e[t+1]]+a[e[t+2]]+a[e[t+3]]+"-"+a[e[t+4]]+a[e[t+5]]+"-"+a[e[t+6]]+a[e[t+7]]+"-"+a[e[t+8]]+a[e[t+9]]+"-"+a[e[t+10]]+a[e[t+11]]+a[e[t+12]]+a[e[t+13]]+a[e[t+14]]+a[e[t+15]]).toLowerCase()}const C=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),y={randomUUID:C};function P(e,t,i){if(y.randomUUID&&!t&&!e)return y.randomUUID();e=e||{};const c=e.random||(e.rng||E)();if(c[6]=c[6]&15|64,c[8]=c[8]&63|128,t){i=i||0;for(let r=0;r<16;++r)t[i+r]=c[r];return t}return v(c)}class x{constructor(t){this.id=P(),this.descripcion=t,this.hecho=!1,this.fechaCreacion=new Date}}const d={Todos:"todos",Completados:"Completados",Pendientes:"Pendientes"},s={tareas:[],filtro:d.Todos},U=()=>{b()},b=()=>{if(!localStorage.getItem("tareas"))return;const{tareas:e=[],filtro:t=d.Todos}=JSON.parse(localStorage.getItem("tareas"));s.tareas=e,s.filtro=t},g=()=>{localStorage.setItem("tareas",JSON.stringify(s))},A=(e=d.Todos)=>{switch(e){case d.Todos:return[...s.tareas];case d.Completados:return s.tareas.filter(t=>t.hecho);case d.Pendientes:return s.tareas.filter(t=>t.hecho===!1);default:throw new Error(`El filtro ${e} no es válido`)}},D=e=>{if(!e)throw new Error("La descripción es obligatoria");s.tareas.push(new x(e)),g()},M=e=>{s.tareas=s.tareas.map(t=>(t.id===e&&(t.hecho=!t.hecho),t)),g()},N=e=>{s.tareas=s.tareas.filter(t=>t.id!==e),g()},k=()=>{s.tareas=s.tareas.filter(e=>!e.hecho),g()},q=(e=d.Todos)=>{s.filtro=e,g()},F=()=>s.filtro,l={iniciarGuardadoLocalStorage:U,cargarDesdeLocalStorage:b,obtenerTareas:A,anadirTarea:D,estadoTarea:M,borrarTarea:N,borrarTareasCompletadas:k,establecerFiltro:q,obtenerFiltroActual:F},I=e=>{if(!e)throw new Error("una Tarea es obligatoria");const{hecho:t,descripcion:i,id:c}=e,r=`
            <div class="view">
                <input class="toggle" type="checkbox" ${t?"checked":""}>
                <label>${i}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
    `,o=document.createElement("li");return o.innerHTML=r,o.setAttribute("data-id",c),e.hecho&&o.classList.add("completed"),o};let h;const O=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Elemento ${e} no encontrado}`);h.innerHTML="",t.forEach(i=>{h.append(I(i))})};let T;const H=e=>{if(T||(T=document.querySelector(e)),!T)throw new Error(`El elemento ${e} no se ha encontrado`);T.innerHTML=l.obtenerTareas(d.Pendientes).length},m={eliminarCompletado:".clear-completed",listaTareas:".todo-list",inputNuevaTarea:"#new-todo-input",filtros:".filtro",contadorPendientes:"#pending-count"},$=e=>{const t=()=>{const n=l.obtenerTareas(l.obtenerFiltroActual());O(m.listaTareas,n),i()},i=()=>{H(m.contadorPendientes)};(()=>{const n=document.createElement("div");n.innerHTML=w,document.querySelector(e).append(n),t()})();const c=document.querySelector(m.inputNuevaTarea),r=document.querySelector(m.listaTareas),o=document.querySelector(m.eliminarCompletado),p=document.querySelectorAll(m.filtros);c.addEventListener("keyup",n=>{n.keyCode===13&&n.target.value.trim().length!==0&&(l.anadirTarea(n.target.value),t(),n.target.value="")}),r.addEventListener("click",n=>{const u=n.target.closest("[data-id]");l.estadoTarea(u.getAttribute("data-id")),t()}),r.addEventListener("click",n=>{const u=n.target.closest("[data-id]");!u||n.target.className!="destroy"||(l.borrarTarea(u.getAttribute("data-id")),t())}),o.addEventListener("click",()=>{l.borrarTareasCompletadas(),t()}),p.forEach(n=>{n.addEventListener("click",u=>{switch(p.forEach(L=>L.classList.remove("selected")),u.target.classList.add("selected"),u.target.text){case"Todos":l.establecerFiltro(d.Todos);break;case"Completados":l.establecerFiltro(d.Completados);break;case"Pendientes":l.establecerFiltro(d.Pendientes);break}t()})})};l.iniciarGuardadoLocalStorage();$("#app");
