"use strict";
let app = {};

(function () {
    let URL;
    const iniciar = function (url) {
        URL = url;
        console.log('(APP INICIADA)');
        //pedirDatos('GET', url, '/old town road', representarDatos);
        document.querySelector("#container > div.buscador > input").addEventListener('keyup', gestionarPress);
        document.querySelector("#container > div.buscador > table").addEventListener('click', gestionarLetras);
        // cargarLocalStorage();
        // agregarGestoresEventos();
        // contarCursos();
    };

    function gestionarPress(e) {
        let exp = new RegExp('[A-Za-z]');
        let buscador = document.querySelector("#container > div.buscador > input");

        if (buscador.value === "") {
            vaciarTable();
        } else {
            if (exp.test(e.key)) {
                let dato = cogerDato();
                pedirDatos(dato, representarDatos);
            }
        }
    }

    function cogerDato() {
        return document.querySelector("#container > div.buscador > input").value;
    }

    function pedirDatos(peticion, callback) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    console.error(`ERROR ${xhr.status} -> ${xhr.statusText}.`);
                    console.log('ERROR');
                }
            }
        });

        xhr.open('GET', 'https://api.lyrics.ovh' + '/suggest/' + peticion);
        xhr.send(null);
    }

    function representarDatos(datos) {
        vaciarTable();
        let json = JSON.parse(datos);
        let padre = document.querySelector("#container > div.buscador > table");
        console.log(json)
        json.data.forEach(element => {
            console.log(element);
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            let tdC = document.createElement('img');
            if(element.explicit_lyrics === true){
                tdC.setAttribute('src','img/ok.png');
            }
            //if(element)
            td.innerText = element.album.title + ' - ' + element.artist.name;
            tr.appendChild(td);
            tr.appendChild(tdC);
            padre.appendChild(tr);
        });

    }
    const vaciarTable = function () {
        let padre = document.querySelector("#container > div.buscador > table");
        let primerHijo = padre.firstChild;

        //Mientras encuentre un hijo va ir borrandolo
        while (primerHijo !== null) {
            padre.removeChild(primerHijo);
            primerHijo = padre.firstChild;
        };
    };


    function pedirLetras(callback, arr) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(xhr.responseText);
                } else {
                    console.error(`ERROR ${xhr.status} -> ${xhr.statusText}.`);
                    console.log('ERROR');
                }
            }
        });
        xhr.open('GET', 'https://api.lyrics.ovh/v1/' + arr[0] + '/' + arr[1]);
        xhr.send(null);

    }

    const gestionarLetras = function (e) {
        // let padre = document.querySelector("#container > div.letra  h2");
        // padre.innerText = 'Letra \n('+e.target.innerText+')';
        let texto = e.target.innerText;
        let textoS = texto.split(' - ').reverse();
        pedirLetras(representarLetras, textoS);
    }

    function representarLetras(datos) {
        vaciarLetra();
        let json = JSON.parse(datos);
        let letra = json.lyrics.replace('↵', '<br>');
        let padre = document.querySelector("#container > div.letra  div");
        let p = document.createElement('p');
        p.innerText = letra;
        padre.appendChild(p);

    }
    const vaciarLetra = function () {
        let padre = document.querySelector("#container > div.letra  div");
        let primerHijo = padre.firstChild;

        //Mientras encuentre un hijo va ir borrandolo
        while (primerHijo !== null) {
            padre.removeChild(primerHijo);
            primerHijo = padre.firstChild;
        };
    };


    app.iniciar = iniciar;
})();