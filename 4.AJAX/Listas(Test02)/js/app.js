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
// Parche sin servidor

// tipos válidos de artículos
const tipos = ["VERDURAS", "LACTEOS", "CARNICOS", "DULCES", "BEBIDAS", "LIMPIEZA"];
const CHAR_DEL = " &otimes;";  // Icono de borrado
const CHAR_EDIT =  "&#9998; "; // Icono de edición

let urlServidor = 'http://192.168.14.101:3000';

function iniciar( url){
  urlServidor = url || 'http://192.168.14.101:3000';
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
    //pedirDatos(peticion,tratarCSV);
    pedirDatos(peticion,tratarCSVJSON);
  }
}

function tratarCSVJSON(datos){
datos = JSON.parse(datos);
datos = datos[0];
tratarCSV(datos);
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
    //No pueden haber el primer dato repetido y tiene que ser mayor a 1
     datosLimpios = datosLimpios.reduce((acc,val) => { 
       if(! acc.map( r => r[0]).includes(val[0])){
         acc.push(val);
       } 
       return acc;
      },[]).filter((reg,pos,arr) =>  reg[0].length > 1);

      //El segundo valor tiene que contener un valor del array(tipos)
      datosLimpios = datosLimpios.filter(reg => tipos.includes(reg[1].toUpperCase()));

      //El tercer valor tiene que ser un si o no
      datosLimpios = datosLimpios.filter(reg => (reg[2]==='si' || reg[2]==='no')); 
      console.log(datosLimpios);
      console.log(claves)
      let objetos = datosLimpios = datosLimpios.map((r,p) => {
         const obj = r.reduce((acc, reg, pos) => {
                                acc[claves[pos]] = reg;
                                return acc;
                              }, {});
        obj['id'] = p.toString().padStart(3,"0");
        return obj;
      });
  console.log(objetos);
}

function ordenarCosas(a,b){

}


listaApp.iniciar = iniciar;
})();

