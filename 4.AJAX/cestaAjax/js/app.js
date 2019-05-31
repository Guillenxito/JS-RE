/*
    *Creador: Alvaro Guillen
    *Fecha: undefined
    *Version Actual: 0.1
    Mejoras
        v0.2 Número de curso en la cesta
        v0.3 Solo se puede comprar una unidad y se informará al usuario
        (o se impidirá desabilitando los botones correspondientes)

        v2.0
        Los datos de los cursos se piden al un servidor
*/

/*
    Falta por hacer:
        *IMPLEMENTAR EL LOCALSTORAGE
*/

/* Informacion util
    - http://www.codexexempla.org/curso/curso_4_3_b.php#nS
*/
"use strict";
let app = {};


(function () {
    const iniciar = function (url) {
        console.log('(APP INICIADA)');
        pedirDatos('GET', url, '/cursos', pintarCursos);
        cargarLocalStorage();
        agregarGestoresEventos();
        contarCursos();

    };

    function pedirDatos(metodo, URL, peticion, callback) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function (evt) {
            gestorXHR(evt, callback);
        });
        xhr.open(metodo, URL + peticion);
        xhr.send(null);
    }

    function gestorXHR(evt, callback) {
        const xhr = evt.target;
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr.responseText);
            } else {
                console.error(`ERROR ${xhr.status} -> ${xhr.statusText}.`);
                console.log('ERROR');
            }
        }
    }

    function pintarCursos(datos) {
        //console.log(JSON.parse(datos));
        let json = JSON.parse(datos);
        let padre = document.querySelector("#lista-cursos > div");
        let i = 1;
        json.forEach(element => {

            let div1 = document.createElement('div');
            div1.className = "col-12 col-md-6 col-lg-4";

            let div2 = document.createElement('div');
            div2.className = "card";

            let img = document.createElement('img');
            img.setAttribute('src', 'img/' + element.img);

            let div3 = document.createElement('div');
            div3.className = "info-card";

            let h4 = document.createElement('h4');
            h4.innerText = element.titulo;

            let p = document.createElement('p');
            p.innerText = element.autor;

            let imgEstre = document.createElement('img');
            imgEstre.setAttribute('src', 'img/stars.png');

            let precio = document.createElement('p');
            precio.className = "precio";

            let spanPrecio = document.createElement('span');
            spanPrecio.innerText = element.precio;

            let oferta = document.createTextNode(element.oferta);

            let boton = document.createElement('a');
            boton.innerText = "Añadir a la cesta";
            boton.className = "button-primary button input agregar-a-cesta";
            boton.dataset.id = i;

            //FORMAMOS LA CARTA

            div3.appendChild(h4);
            div3.appendChild(p);
            div3.appendChild(imgEstre);
            precio.appendChild(spanPrecio);
            precio.appendChild(oferta);
            div3.appendChild(precio);
            div3.appendChild(boton);

            div2.appendChild(img);
            div2.appendChild(div3);

            div1.appendChild(div2);

            padre.append(div1);
            //console.log(element);
            i++;
        });
    }

    const agregarGestoresEventos = function () {
        console.log('* AGREGANDO EVENTOS...')
        //document.querySelector('#lista-cursos').addEventListener('click', gestionEventos);
        document.querySelector('body').addEventListener('click', gestionEventos);
    }

    const gestionEventos = (e) => {
        // al clickar en los botones "AÑADIR A LA CESTA", al ser etiquetas <a></a> recarga la pagina y hay que quitar eso
        e.preventDefault();

        // cuando ses agrega un curso
        //console.log(e.target);
        //console.log(e.currentTarget);
        if (e.target.className === 'button-primary button input agregar-a-cesta') {
            console.log('* BOTON PULSADO (AÑADIR A LA CESTA) CON EL ID: ' + e.target.getAttribute('data-id'));
            agregarCurso(e.target);

        }
        // Borrar curso
        if (e.target.className === 'quitar') {
            console.log('* BOTON PULSADO (QUITAR CURSO DE LA CESTA)');
            quitarCurso(e.target);
        }
        // Borrar todos los cursos
        if (e.target.id === 'vaciar-cesta') {
            console.log('* BOTON PULSADO (VACIAR LA  CESTA) ');
            vaciarCesta();
        }

        // Cuando se carga la página (LS)
        //cargarLocalStorage();
    };
	/*Cada curso
	<tr>
		<td>img</td
		<td>titulo</td>
		<td>Precio</td>
		<td class="quitar">X</td>
	</tr>
	*/
    const agregarCurso = function (e) {
        console.log('* AÑADIENDO CURSO...');
        /* Variables */
        let cestaLS = JSON.parse(localStorage.getItem('cesta'));
        //Variables de posicionamiento para la CESTA
        let cesta = document.querySelector("#contenido-cesta > tbody");
        //Variables de posicionamiento para el Target
        let padre = e.parentElement;
        let abuelo = padre.parentElement;
        // console.log(padre);
        // console.log(abuelo);



        /* Obtencion de los datos necesarios */
        let rutaImg = abuelo.querySelector('img').src;
        let titulo = padre.querySelector('h4').innerText;
        let precio = padre.querySelector('p.precio > span').innerText;
        let dataId = e.getAttribute('data-id');

        //Creacion del objeto para almenarlo en el LS
        let cursoLS = {
            'rutaImg': rutaImg,
            'titulo': titulo,
            'precio': precio,
            'dataId': dataId
        };
        if(cestaLS[dataId] === undefined){
            agregarCursoLS(cursoLS);

            console.log('   -Ruta Imagen: ' + rutaImg);
            console.log('   -Titulo: ' + titulo);
            console.log('   -Precio: ' + precio);
            console.log('   -Data-id: ' + dataId);
    
            /* ADD a la cesta */
            let tr = document.createElement('tr');
            tr.dataset.id = dataId;
    
            let tdImg = document.createElement('td');
            let img = document.createElement('img');
            img.setAttribute('src', rutaImg);
            let title = document.createElement('td');
            title.innerText = titulo;
            let price = document.createElement('td');
            price.innerText = precio;
            let borrar = document.createElement('td');
            borrar.innerText = 'X';
            borrar.className = 'quitar';
    
            tdImg.appendChild(img);
            tr.appendChild(tdImg);
            tr.appendChild(title);
            tr.appendChild(price);
            tr.appendChild(borrar);
            cesta.appendChild(tr);
        }else{
            console.log('curso existente');
        }
        contarCursos();
       
    };

    const quitarCurso = function (e) {
        console.log('* BORRANDO CURSO...');
        /* Variables */
        //Variables de informacion para el Target
        let padre = e.parentElement;
        let abuelo = padre.parentElement;

        console.log('  -Curso para borrar: ' + padre.querySelector('td:nth-child(2)').innerText);
        quitarCursoLS(padre.getAttribute('data-id'));
        //Borrado del Elemento 
        abuelo.removeChild(padre);
        contarCursos();
    };

    const vaciarCesta = function () {
        console.log('* VACIANDO CESTA...');
        /* Variables */
        //Variables de posicionamiento para la CESTA
        let cesta = document.querySelector("#contenido-cesta > tbody");
        let primerHijo = cesta.firstChild;

        //Mientras encuentre un hijo va ir borrandolo
        while (primerHijo !== null) {
            cesta.removeChild(primerHijo);
            primerHijo = cesta.firstChild;
        };
        let cestaLS = {};
        localStorage.setItem('cesta', JSON.stringify({}));
        contarCursos();
    };

    const cargarLocalStorage = function () {
        console.log('* CARGANDO LOCALSTORAGE...');
        let cestaLS = {};
        if (localStorage.getItem('cesta') === null) {
            console.log('VACIA');
            localStorage.setItem('cesta', JSON.stringify(cestaLS));
        } else {
            cestaLS = localStorage.getItem('cesta');
            console.log('LLENA');
            if (cestaLS.toString().length > 0) {
                console.log('*INICIANDO CARGA');
                cargarCursosCestaLS();
            }
        }
    };

    // 
    const agregarCursoLS = function (curso) {
        let cestaLS = JSON.parse(localStorage.getItem('cesta'));
        console.log(cestaLS["1"]);
        cestaLS[curso.dataId] = curso;
        localStorage.setItem('cesta', JSON.stringify(cestaLS));
        // console.log(cestaLS);
        // console.log(curso.dataId);

    };

    const quitarCursoLS = function (curso) {
        let cestaLS = JSON.parse(localStorage.getItem('cesta'));
        delete cestaLS[curso];
        localStorage.setItem('cesta', JSON.stringify(cestaLS));
    };

    const cargarCursosCestaLS = () => {
        console.log('CARGANDO CURSOS EN LS')
        let cestaLS = JSON.parse(localStorage.getItem('cesta'));
        let cesta = document.querySelector("#contenido-cesta > tbody");
         
         for (const key in cestaLS) {
            let tr = document.createElement('tr');
                tr.dataset.id = cestaLS[key].dataId;

            let tdImg = document.createElement('td');
            let img = document.createElement('img');
                img.setAttribute('src', cestaLS[key].rutaImg);
            let title = document.createElement('td');
                title.innerText = cestaLS[key].titulo;
            let price = document.createElement('td');
                price.innerText = cestaLS[key].precio;
            let borrar = document.createElement('td');
                borrar.innerText = 'X';
                borrar.className = 'quitar';

            tdImg.appendChild(img);
            tr.appendChild(tdImg);
            tr.appendChild(title);
            tr.appendChild(price);
            tr.appendChild(borrar);
            cesta.appendChild(tr);
         }
         
    };

    const contarCursos = () => {
         let cesta = document.querySelectorAll("#contenido-cesta > tbody > tr");
         let contador = document.querySelector("body > header > div > div > div.col-2 > ul > li > span")
         console.log(cesta.length);
         if(cesta.toString().length === 0){
             contador.className = "quitarContador";
             contador.innerText = "";
         }else{
             contador.classList.remove("quitarContador");
             contador.className = "quitar";
             contador.innerText = cesta.length; 
         }     
    };



    app.iniciar = iniciar;

})();