"use strict";
let app = {};

(function () {
    let jugadorRosaTotal = 0;
    let jugadorAzulTotal = 0;
    let jugadorRosaActual = 0;
    let jugadorAzulActual = 0;
    let turno = '';

    const iniciar = () => {
        console.log('App Iniciada');
        /*Reset contadores de los jugadores*/
        jugadorRosaTotal = 0;
        jugadorAzulTotal = 0;
        jugadorRosaActual = 0;
        jugadorAzulActual = 0;
        turno = turnoAleatorio();

        cambiarColorTurno();

        document.querySelector(".botonesJuego > p.jugar").style.display ="block";
        document.querySelector(".botonesJuego > p.mantener").style.display ="block";
        document.querySelector(".botonesJuego > p.volver").style.display ="none";

        actualizar()
        /*Creacion de los eventos*/
        document.querySelector("#botones > div > p.jugar").addEventListener('click', gestionarBotones);
        document.querySelector("#botones > div > p.mantener").addEventListener('click', gestionarBotones);
    }

    const gestionarBotones = (click) => {
        //console.log(click.target.innerText.toUpperCase());
        let notiR = document.querySelector("#jugadorRosa > p.notificaciones");
        let notiA = document.querySelector("#jugadorAzul > p.notificaciones");
        if(turno === 'R'){
            notiR.innerHTML = "<span>Tu turno</span>";
        }else{
            notiA.innerHTML = "<span>Tu turno</span>";
        }
        console.log(turno);
        if (click.target.innerText.toUpperCase() === 'JUGAR') {
            console.log('¿Jugamos?');
            jugar();
        } else if (click.target.innerText.toUpperCase() === 'MANTENER') {
            console.log('¿Mantienes?');
            mantener();
        }
    }//gestionarBotones

    const jugar = () => {
        let dirActual;
        let dirTotal;
        let dirNoti;
        let dirNotiContra;
        let turnoActual = turno;

        let dados = dadosAleatorios();
        console.log('Primer Dado:' + dados[0]);
        console.log('Segundo Dado:' + dados[1]);

        let padreDados = document.querySelector("#dados");

        console.log(padreDados.childNodes.length);
        console.log(padreDados.getLength);
        let dirU = document.querySelector("#dados > div:first-child");
        switch (dados[0]) {
            case 1:
                dirU.setAttribute('class', "die one");
                break;
            case 2:
                dirU.setAttribute('class', "die two");
                break;
            case 3:
                dirU.setAttribute('class', "die three");
                break;
            case 4:
                dirU.setAttribute('class', "die four");
                break;
            case 5:
                dirU.setAttribute('class', "die five");
                break;
            case 6:
                dirU.setAttribute('class', "die six");
                break;
        }

        let dirD = document.querySelector("#dados > div:last-child");
        switch (dados[1]) {
            case 1:
                dirD.setAttribute('class', "die one");
                break;
            case 2:
                dirD.setAttribute('class', "die two");
                break;
            case 3:
                dirD.setAttribute('class', "die three");
                break;
            case 4:
                dirD.setAttribute('class', "die four");
                break;
            case 5:
                dirD.setAttribute('class', "die five");
                break;
            case 6:
                dirD.setAttribute('class', "die six");
                break;
        }

        if (dados[0] === 1 && dados[1] === 1 || dados[0] === 6 && dados[1] === 6 || dados[0] === 3 && dados[1] === 3) {
            if (turno === 'R') {
                dirActual = "#jugadorRosa > p.puntuacionActual";
                dirTotal = "#puntuacionTotalRosa";
                dirNoti = "#jugadorRosa > p.notificaciones";
                dirNotiContra = "#jugadorAzul > p.notificaciones";
                document.querySelector(dirNoti).innerText = 'Dobles Ilegales';
                document.querySelector(dirNotiContra).innerHTML = '<span>Tu turno</span>';
                jugadorRosaActual = 0;
                document.querySelector(dirActual).innerText = jugadorRosaActual;
                turno = 'A';
                cambiarColorTurno();
            } else {
                dirActual = "#jugadorAzul > p.puntuacionActual";
                dirTotal = "#puntuacionTotalAzul";
                dirNoti = "#jugadorAzul > p.notificaciones";
                dirNotiContra = "#jugadorRosa > p.notificaciones";
                document.querySelector(dirNoti).innerText = 'Dobles Ilegales';
                document.querySelector(dirNotiContra).innerHTML = '<span>Tu turno</span>';
                jugadorAzulActual = 0;
                document.querySelector(dirActual).innerText = jugadorAzulActual;
                turno = 'R';
                cambiarColorTurno();
            }
        } else {
            if (turno === 'R') {
                dirActual = "#jugadorRosa > p.puntuacionActual";
                dirTotal = "#puntuacionTotalRosa";
                dirNoti = "#jugadorRosa > p.notificaciones";
                dirNotiContra = "#jugadorAzul > p.notificaciones";
                jugadorRosaActual += (dados[0] + dados[1]);
                document.querySelector(dirActual).innerText = jugadorRosaActual;
            } else {
                dirActual = "#jugadorAzul > p.puntuacionActual";
                dirTotal = "#puntuacionTotalAzul";
                dirNoti = "#jugadorAzul > p.notificaciones";
                dirNotiContra = "#jugadorRosa > p.notificaciones";
                jugadorAzulActual += (dados[0] + dados[1]);
                document.querySelector(dirActual).innerText = jugadorAzulActual;
            }

            // turno === 'R' ? dirActual = "#jugadorRosa > p.puntuacionActual" : dirActual = "#jugadorAzul > p.puntuacionActual"; 
            let puntuacionActual = document.querySelector(dirActual);
            let puntuacionTotal = document.querySelector(dirTotal);

            console.log(puntuacionActual);
            console.log(puntuacionTotal);
            console.log(jugadorRosaActual);
            console.log(jugadorAzulActual);

            console.log(puntuacionActual.innerText +' + '+ puntuacionTotal.innerText);
            if ((+puntuacionActual.innerText + +puntuacionTotal.innerText) >= 100) {
                console.log('victoria');
                 if (turno === 'R') {
                     document.querySelector("#botones > #puntuacionTotalRosa").innerText = jugadorRosaTotal+jugadorRosaActual;
                 } else {
                     document.querySelector("#botones > #puntuacionTotalAzul").innerText = jugadorAzulTotal+jugadorAzulActual;
                 }
                
                document.querySelector(dirNoti).innerHTML = "<span class='victoria'>VICTORIA</span>";
                document.querySelector(dirNotiContra).innerHTML = "<span class='derrota'>DERROTA</span>";
                volverJugar();
            }
        }
        //actualizar(puntuacionAtual,puntuacionTotal);
    }//jugar

    const mantener = () => {
        let dirActual;
        let dirTotal;
        let dirNoti;
        let dirNotiContra;
        
        if (turno === 'R') {
            dirActual = "#jugadorRosa > p.puntuacionActual";
            dirTotal = "#puntuacionTotalRosa";
            dirNoti = "#jugadorRosa > p.notificaciones";
            dirNotiContra = "#jugadorAzul > p.notificaciones";
            document.querySelector(dirNoti).innerText = 'Mantienes';
            document.querySelector(dirNotiContra).innerHTML = '<span>Tu turno</span>';
            document.querySelector(dirActual).innerText = 0;

            jugadorRosaTotal += jugadorRosaActual;
            jugadorRosaActual = 0;
            document.querySelector(dirTotal).innerText = jugadorRosaTotal;
            turno = 'A';
            cambiarColorTurno();
        } else {
            dirActual = "#jugadorAzul > p.puntuacionActual";
            dirTotal = "#puntuacionTotalAzul";
            dirNoti = "#jugadorAzul > p.notificaciones";
            dirNotiContra = "#jugadorRosa > p.notificaciones";
            document.querySelector(dirNoti).innerText = 'Mantienes';
            document.querySelector(dirNotiContra).innerHTML = '<span>Tu turno</span>';
            document.querySelector(dirActual).innerText = 0;

            jugadorAzulTotal += jugadorAzulActual;
            jugadorAzulActual = 0;
            document.querySelector(dirTotal).innerText = jugadorAzulTotal;
            turno = 'R';
            cambiarColorTurno();
        }
    }

    const dadosAleatorios = () => {
        return [Math.floor(Math.random() * (7 - 1)) + 1, Math.floor(Math.random() * (7 - 1)) + 1];
    }

    const volverJugar = () =>{
        document.querySelector(".botonesJuego > p.jugar").style.display ="none";
        document.querySelector(".botonesJuego > p.mantener").style.display ="none";
        document.querySelector(".botonesJuego > p.volver").style.display ="block";
        document.querySelector("#botones > div > p.volver").addEventListener('click', iniciar);
    }

    const actualizar = () => {
        document.querySelector('#jugadorRosa > p.puntuacionActual').innerText = 0;
        document.querySelector('#puntuacionTotalRosa').innerText = 0;
        document.querySelector('#jugadorAzul > p.puntuacionActual').innerText = 0;
        document.querySelector('#puntuacionTotalAzul').innerText = 0;
        document.querySelector("#jugadorRosa > p.notificaciones").innerText = '--';
        document.querySelector("#jugadorAzul > p.notificaciones").innerText = '--';
    }

    const turnoAleatorio = () => {
        let ale = Math.floor(Math.random() * (2 - 1)) + 1;
        if(ale === 1){ return 'R'}else{return 'A'}
    }

    const cambiarColorTurno = () => {
        let dirR = document.querySelector("#jugadorRosa");
        let dirA = document.querySelector("#jugadorAzul");

        if(turno === 'R'){
            dirA.style.backgroundColor = 'rgba(199, 235, 243,.5)';
            dirR.style.backgroundColor = 'rgba(255, 217, 230,.2)';
        }else{
            dirA.style.backgroundColor = 'rgba(199, 235, 243,.2)';
            dirR.style.backgroundColor = 'rgba(255, 217, 230,.5)';
        }
    }




    app.iniciar = iniciar;
})();