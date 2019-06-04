/*
  <!-- Estructura de un artículo -->
    <!-- 4 -->
    <!-- <li id="001"> -->
      <!-- 6 -->     
      <!-- <a>
         <big>l</big>
        </a> -->
       <!-- 5 -->
       <!-- <span data-tipo="dulces">tarta</span> -->
      <!-- 7 -->     
      <!-- <a>
         <big>X</big>
        </a>
    </li> -->
*/

'use strict';
const listaApp = {};

(function () {
// tipos válidos de artículos
const tipos = ["VERDURAS", "LACTEOS", "CARNICOS", "DULCES", "BEBIDAS", "LIMPIEZA"];
const CHAR_DEL = " &otimes;";  // Icono de borrado
const CHAR_EDIT =  "&#9998; "; // Icono de edición

const urlServidor = 'http://192.168.14.101:3000';

function iniciar(){
  console.log('APP INICIAR');
  document.querySelector("body > main > section > div:nth-child(1)").addEventListener('click',gestionarEventosBuscar);
  document.querySelector("body > main > section > div:nth-child(1)").addEventListener('keyup',gestionarEventosBuscar);
  document.querySelector("body > main > section > div:nth-child(4)").addEventListener('click',gestionarEventosAgregar);
  document.querySelector("body > main > section > div:nth-child(4)").addEventListener('keyup',gestionarEventosAgregar);

}

function gestionarEventosBuscar(evt){
  let elemento = evt.target;
  if(elemento !== evt.currentTarget){
    if(elemento.type === 'button'){
      console.log(elemento.previousElementSibling.value);
      comprobarLS(elemento.previousElementSibling.value);
    }else if(elemento.type === 'text' && evt.keyCode === 13){
      console.log(elemento.value);
      comprobarLS(elemento.value);
    }
  }
}

function comprobarLS(peticion){
  if(localStorage[peticion]){
    console.log('PINTAR LISTA DEL LS');
  }else{
    pedirDatos(peticion,tratarCSV)
  }
}

function gestionarEventosAgregar(evt){
  let elemento = evt.target;
  if(elemento !== evt.currentTarget){
    if(elemento.type === 'button'){
      console.log(elemento.previousElementSibling.value);
    }else if(elemento.type === 'text' && evt.keyCode === 13){
      console.log(elemento.value);
    }
  }
}

function pedirDatos(peticion,callback){
  let xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange',function(evt){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        callback(xhr.responseText)
      }else{
        alert('ERROR DE CONEXION')
      }
    }
  });
  xhr.open('GET',urlServidor + '/' + peticion);
  xhr.send(null);
}

function tratarCSV(datos){
  console.log(datos);
  let datosLimpios = datos.split('^')
                          .map(r => r.split('|'))
                          .map(r => r.map(c => c.trim()))
                          .filter((reg,pos,arr) => reg.length === arr[0].length);
  let claves = datosLimpios.shift();
                          //.filter((reg,pos,arr) => arr[1] === reg[0] > 1)
     datosLimpios = datosLimpios.filter(r => validar(r));
                          //.filter(r => r.every(c => c.length));
  
  console.log(datosLimpios)
}

function validar(reg){
  console.log(reg);
  return reg[0].length > 1 && 
}

listaApp.iniciar = iniciar;
})();

