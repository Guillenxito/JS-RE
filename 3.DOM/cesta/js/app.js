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
    const iniciar = function () {
        console.log('(APP INICIADA)');
        agregarGestoresEventos();

    };

    const agregarGestoresEventos = function () {
        console.log('* AGREGANDO EVENTOS...')
        //document.querySelector('#lista-cursos').addEventListener('click', gestionEventos);
        document.querySelector('body').addEventListener('click', gestionEventos);
    }

    const gestionEventos = (e) => {
        // al clickar en los botones "AÑADIR A LA CESTA", al ser etiquetas <a></a> recarga la pagina y hay que quitar eso
        e.preventDefault();
        console.log('DENTRO');
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

        console.log('   -Ruta Imagen: ' + rutaImg);
        console.log('   -Titulo: ' + titulo);
        console.log('   -Precio: ' + precio);

        /* ADD a la cesta */
        let tr = document.createElement('tr');

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
    };

    const quitarCurso = function (e) {
        console.log('* BORRANDO CURSO...');
        /* Variables */
        //Variables de informacion para el Target
        let padre = e.parentElement;
        let abuelo = padre.parentElement;

        console.log('  -Curso para borrar: ' + padre.querySelector('td:nth-child(2)').innerText);

        //Borrado del Elemento 
        abuelo.removeChild(padre);
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

    };

    const cargarLocalStorage = function (e) {

    };

    // 
    const agregarCursoLS = function (curso) {

    };

    const quitarCursoLS = function (curso) {

    };



    app.iniciar = iniciar;

})();