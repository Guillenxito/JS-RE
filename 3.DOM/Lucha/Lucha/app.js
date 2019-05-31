"use strict";
let app = {};

(function () {
    //Variables
    let vidaJugador = 100;
    let vidaMonstruo = 100;
    let bloqueoHabilidades = false;

    /* Funcion Iniciar
        *Cargar el historial de victorias del LocalStorage
    */
    const iniciar = () => {
        //Creacion de eventos
        let botonNJ = document.getElementById('empezar').addEventListener('click', empezarJuego);
    }; // iniciar

    /* Funcion Empezar Juego
        *Llama a la funcion restablecer salud
        *Llama a la funcion restablecer historial de victorias
        *Oculta el boton 'Nuevo Juego'
        *Muestra los botones de juego
        *Muestra el cuaderno de bitacora
        *Añade los eventos de los botones de juegos
    */
    const empezarJuego = () => {
        //Restablece la salud
        restablecerSalud();
        //Restablecer historial de victorias
        let mJ = document.querySelector('#cont-barras > div:nth-child(1) > h1 > span');
        let mM = document.querySelector('#cont-barras > div:nth-child(2) > h1 > span');

        if (!localStorage.getItem("monstruo")) {
            localStorage.setItem("monstruo", "0");
        }
        if (!localStorage.getItem("jugador")) {
            localStorage.setItem("jugador", "0");
        }

        let valorJ = localStorage.getItem("jugador");
        let valorM = localStorage.getItem("monstruo");

        mJ.innerText = valorJ;
        mM.innerText = valorM;

        //Oculta el boton 'Nuevo Juego'
        let botonNJ = document.getElementById('empezar').style.display = "none";

        //Mostrar los botones de juego
        let botonesJ = document.getElementById('cont-botones').style.display = "block";

        //Mostrar el cuadernos de bitacora
        let bitacora = document.getElementById('log').style.display = "block"

        var e = document.querySelector('#log > div > ul');
        var child = e.lastElementChild;
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }

        //*Añade los eventos de los botones de juegos 
        document.querySelector('#cont-botones > div').addEventListener('click', gestionarMovimientos);

        let botonCurarse = document.querySelector('#cont-botones > div > button:nth-child(3)');
        botonCurarse.disabled = true;
    }//empezarJuego

    /* Funcion restablecerSalud
        *Restablece la salud de los luchadores
    */
    const restablecerSalud = () => {
        vidaJugador = 100;
        vidaMonstruo = 100;

        let barrasSalud = document.querySelectorAll('#cont-barras div div div');
        barrasSalud[0].style.width = vidaJugador.toString() + "%";
        barrasSalud[0].style.backgroundColor = "green";
        barrasSalud[0].innerText = vidaJugador.toString();

        barrasSalud[1].style.width = vidaMonstruo.toString() + "%";
        barrasSalud[1].style.backgroundColor = "green";
        barrasSalud[1].innerText = vidaMonstruo.toString();

    }//restablecerSalud

    /* Funcion gestionarMovimientos
        *Comprueba que el click ha sido adecuado
        *Llama a gestionar Accion
    */
    const gestionarMovimientos = (click) => {
        // target = Donde se da el click
        //currentTarget = Donde esta asignado el evento

        if (click.target !== click.currentTarget) {
            // console.log(click.target.innerText);
            gestionarAccionJugador(click.target.innerText);
        }
    }//gestionarMovimientos

    /* Funcion gestionarAccionJugador
        *Llama a gestionar habilidades segun los stats
    */
    const gestionarAccionJugador = (accion) => {
        let cantidad;

        if (accion === 'ATACAR') {
            bloqueoHabilidades = false;
            cantidad = gestionarHabilidades(3, 5);
        } else if (accion === 'ATAQUE ESPECIAL') {
            bloqueoHabilidades = true;
            cantidad = gestionarHabilidades(5, 18);
        } else if (accion === 'CURARSE') {
            bloqueoHabilidades = false;
            cantidad = gestionarHabilidades(5, 10);
        } else {
            //RENDIRSE    
        }
        pelea(accion, cantidad);
    }//gestionarAccionJugador

    /* Funcion gestionarHabilidades
        *Da una cantidad aleatoria entre los dos parametros que se le asignan
    */
    const gestionarHabilidades = (minimo, maximo) => {
        return Math.floor(Math.random() * (maximo - minimo) + minimo);
    }//gestionarHabilidades

    const pelea = (accionJ, cantidadJ) => {
        let cuadernoB;
        console.log('JUGADOR: ' + accionJ + ":" + cantidadJ);
        cuadernoB = 'JUGADOR: ' + accionJ + ":" + cantidadJ;
        if (accionJ !== 'CURARSE') {
            vidaMonstruo -= cantidadJ;
        } else {
            vidaJugador += cantidadJ;
        }
        actualizarDatos(cuadernoB, 'J');
        //Comprobacion de victoria
        if (vidaMonstruo <= 0) {
            victoria('J');
            bloqueoHabilidades = false;
        }

        //setTimeout(actualizarDatos(), 3000); 
        let cantidadM = gestionarAccionMonstruo();
        console.log('MOSTRUO: ATAQUE:' + cantidadM);
        cuadernoB = 'MOSTRUO: ATAQUE:' + cantidadM;
        vidaJugador -= cantidadM;

        //setTimeout(function () { actualizarDatos(cuadernoB, 'M'); }, 500);
        actualizarDatos(cuadernoB, 'M');

        //Comprobacion de victoria
        if (vidaJugador <= 0) {
            victoria('M');
            bloqueoHabilidades = false;
        }
    }

    /* Funcion gestionarAccionMonstruo
        *Llama a gestionar habilidades segun los stats
    */
    const gestionarAccionMonstruo = () => {
        return gestionarHabilidades(5, 12);
    }

    /* Funcion actualizarDatos
        *Actualiza las barras de salud
        *Cambia el color de la barra de salud dependiendo de la cantidad
        *Añade informacion al cuaderno de bitacora
        *Bloquea/Desbloquea botones
    */
    const actualizarDatos = (datos, tipo) => {
        let barrasSalud = document.querySelectorAll('#cont-barras div div div');
        barrasSalud[0].style.width = vidaJugador.toString() + "%";
        barrasSalud[0].innerText = vidaJugador.toString();
        if (vidaJugador < 75 && vidaJugador > 50) {
            barrasSalud[0].style.backgroundColor = "#8FE600";
        } else if (vidaJugador < 50 && vidaJugador > 25) {
            barrasSalud[0].style.backgroundColor = "#E8B933";
        } else if (vidaJugador < 25) {
            barrasSalud[0].style.backgroundColor = "#B90707";
        }

        barrasSalud[1].style.width = vidaMonstruo.toString() + "%";
        barrasSalud[1].innerText = vidaMonstruo.toString();
        if (vidaMonstruo < 75 && vidaMonstruo > 50) {
            barrasSalud[1].style.backgroundColor = "#8FE600";
        } else if (vidaMonstruo < 50 && vidaMonstruo > 25) {
            barrasSalud[1].style.backgroundColor = "#E8B933";
        } else if (vidaMonstruo < 25) {
            barrasSalud[1].style.backgroundColor = "#B90707";
        }

        let bitacoraC = document.getElementById('log').style.display = "block";
        let listaBitacora = document.querySelector('#log > div > ul');
        let li = document.createElement('li');
        li.innerText = datos;
        if (tipo === "M") {
            // li.class = "monstruo";
            li.setAttribute('class', 'monstruo');
        } else {
            //li.class = "jugador";
            li.setAttribute('class', 'jugador');
        }
        listaBitacora.appendChild(li);

        // si el jugador tiene 100 de vida no se puede curar
        let botonCurarse = document.querySelector('#cont-botones > div > button:nth-child(3)');
        if (vidaJugador == 100) {
            botonCurarse.disabled = true;
        } else {
            botonCurarse.disabled = false;
        }

        //si el jugador ha utilizado anteiormente un ataque especial solo podra atacar
        let botonesJugador = document.querySelectorAll('#cont-botones > div > button');
        if (bloqueoHabilidades === true) {
            botonesJugador[1].disabled = true;
            botonesJugador[2].disabled = true;
        } else {
            botonesJugador[1].disabled = false;
            botonesJugador[2].disabled = false;
        }

    }

    const victoria = (jugador) => {
        if (jugador === 'J') {
            localStorage.jugador = parseInt(localStorage.jugador) + 1;
            var txt;
            var r = confirm("Ganaste! \n ¿Quieres volver a jugar?");
            if (r == true) {
                bloqueoHabilidades = false;
                empezarJuego();
            } else {
                location.href = "lucha.html";
            }
            //document.getElementById("demo").innerHTML = txt;

        } else {

            localStorage.monstruo = parseInt(localStorage.monstruo) + 1;

            var r = confirm("Perdiste! \n ¿Quieres volver a jugar?");
            if (r == true) {
                bloqueoHabilidades = false;
                empezarJuego();
            } else {
                location.href = "lucha.html";
            }
        }
    }

    app.iniciar = iniciar;
})();