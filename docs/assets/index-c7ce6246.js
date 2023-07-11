(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function l(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=l(r);fetch(r.href,o)}})();const v=`<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="Nombre de la tarea" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- This footer should hidden by default and shown when there are todos -->\r
    <footer class="footer">\r
        <!-- This should be "0 items left" by default -->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Remove this if you don't implement routing -->\r
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
        <!-- Hidden if no completed items are left ↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let f;const L=new Uint8Array(16);function C(){if(!f&&(f=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!f))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return f(L)}const a=[];for(let e=0;e<256;++e)a.push((e+256).toString(16).slice(1));function S(e,t=0){return(a[e[t+0]]+a[e[t+1]]+a[e[t+2]]+a[e[t+3]]+"-"+a[e[t+4]]+a[e[t+5]]+"-"+a[e[t+6]]+a[e[t+7]]+"-"+a[e[t+8]]+a[e[t+9]]+"-"+a[e[t+10]]+a[e[t+11]]+a[e[t+12]]+a[e[t+13]]+a[e[t+14]]+a[e[t+15]]).toLowerCase()}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:E};function P(e,t,l){if(T.randomUUID&&!t&&!e)return T.randomUUID();e=e||{};const i=e.random||(e.rng||C)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){l=l||0;for(let r=0;r<16;++r)t[l+r]=i[r];return t}return S(i)}class k{constructor(t){this.id=P(),this.descripcion=t,this.hecho=!1,this.fechaCreacion=new Date}}const d={Todos:"todos",Completados:"Completados",Pendientes:"Pendientes"},s={tareas:[],filtro:d.Todos},x=()=>{y()},y=()=>{if(!localStorage.getItem("tareas"))return;const{tareas:e=[],filtro:t=d.Todos}=JSON.parse(localStorage.getItem("tareas"));s.tareas=e,s.filtro=t},g=()=>{localStorage.setItem("tareas",JSON.stringify(s))},M=(e=d.Todos)=>{switch(e){case d.Todos:return[...s.tareas];case d.Completados:return s.tareas.filter(t=>t.hecho);case d.Pendientes:return s.tareas.filter(t=>t.hecho===!1);default:throw new Error(`El filtro ${e} no es válido`)}},U=e=>{if(!e)throw new Error("La descripción es obligatoria");s.tareas.push(new k(e)),g()},A=e=>{s.tareas=s.tareas.map(t=>(t.id===e&&(t.hecho=!t.hecho),t)),g()},D=e=>{s.tareas=s.tareas.filter(t=>t.id!==e),g()},N=()=>{s.tareas=s.tareas.filter(e=>!e.hecho),g()},q=(e=d.Todos)=>{s.filtro=e,g()},F=()=>s.filtro,c={iniciarGuardadoLocalStorage:x,cargarDesdeLocalStorage:y,obtenerTareas:M,anadirTarea:U,estadoTarea:A,borrarTarea:D,borrarTareasCompletadas:N,establecerFiltro:q,obtenerFiltroActual:F},H=e=>{if(!e)throw new Error("una Tarea es obligatoria");const{hecho:t,descripcion:l,id:i}=e,r=`
            <div class="view">
                <input class="toggle" type="checkbox" ${t?"checked":""}>
                <label>${l}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
    `,o=document.createElement("li");return o.innerHTML=r,o.setAttribute("data-id",i),e.hecho&&o.classList.add("completed"),o};let m;const I=(e,t=[])=>{if(m||(m=document.querySelector(e)),!m)throw new Error(`Elemento ${e} no encontrado}`);m.innerHTML="",t.forEach(l=>{m.append(H(l))})};let b;const O=e=>{if(b||(b=document.querySelector(e)),!b)throw new Error(`El elemento ${e} no se ha encontrado`);b.innerHTML=c.obtenerTareas(d.Pendientes).length},h={eliminarCompletado:".clear-completed",listaTareas:".todo-list",inputNuevaTarea:"#new-todo-input",filtros:".filtro",contadorPendientes:"#pending-count"},V=e=>{const t=()=>{const n=c.obtenerTareas(c.obtenerFiltroActual());I(h.listaTareas,n),l()},l=()=>{O(h.contadorPendientes)};(()=>{const n=document.createElement("div");n.innerHTML=v,document.querySelector(e).append(n),t()})();const i=document.querySelector(h.inputNuevaTarea),r=document.querySelector(h.listaTareas),o=document.querySelector(h.eliminarCompletado),p=document.querySelectorAll(h.filtros);i.addEventListener("keyup",n=>{n.keyCode===13&&n.target.value.trim().length!==0&&(c.anadirTarea(n.target.value),t(),n.target.value="")}),r.addEventListener("click",n=>{const u=n.target.closest("[data-id]");c.estadoTarea(u.getAttribute("data-id")),t()}),r.addEventListener("click",n=>{const u=n.target.closest("[data-id]");!u||n.target.className!="destroy"||(c.borrarTarea(u.getAttribute("data-id")),t())}),o.addEventListener("click",()=>{c.borrarTareasCompletadas(),t()}),p.forEach(n=>{n.addEventListener("click",u=>{switch(p.forEach(w=>w.classList.remove("selected")),u.target.classList.add("selected"),u.target.text){case"Todos":c.establecerFiltro(d.Todos);break;case"Completados":c.establecerFiltro(d.Completados);break;case"Pendientes":c.establecerFiltro(d.Pendientes);break}t()})})};c.iniciarGuardadoLocalStorage();V("#app");
