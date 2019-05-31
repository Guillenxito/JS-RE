
"use strict";
let tiempoApp = {};


(function () {

  let urlServidor = 'http://localhost:3000';
  let ciudades = null;
  // Separadores del archivo CSV
  const NUEVA_LINEA = '\n',
    SEPARADOR = ';';
  // A rellenar con las expresiones regulares
  const PATRON_CIUDAD_PAIS = /^([A-Z][a-záéíóúñ ]+)+?$/,
    PATRON_ID = /^[A-Z]{2}-\d{2}-\d{3}$/;

  function iniciar(url) {
    console.log('APP INICIADA');
    urlServidor = url || urlServidor;

    const buscar = document.querySelector('#buscar');

    buscar.addEventListener('click', gestionarEventosEntrada);
    buscar.addEventListener('keyup', gestionarEventosEntrada);

    setInterval(ultimaActualizacion,.5 * 1000 * 60); //Medio minuto
    setInterval(refrescarDatos,5 * 1000 * 60); //5min

    //pedirDatos('ciudades.csv',convertirCSVaObjetos);
    convertirCSVaObjetos(ciudades_csv);

  }//iniciar

  /*
** Función para pedir los datos al servidor CORS
*/
function pedirDatos(peticion, callback) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener('readystatechange', function (evt) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(xhr.responseText);
      }
      else {
        alert(`Error: ${xhr.status} (${xhr.statusText})`);
      }
    }
  });

  console.log(`${urlServidor}/${peticion}`);

  xhr.open('GET', `${urlServidor}/${peticion}`);
  xhr.send(null);
}   

  // Punto 3 - Gestionar eventos entrada
  function gestionarEventosEntrada(evt) {
    const elemento = evt.target;
    if(elemento === evt.currentTarget) return;

    if(elemento.tagName.toUpperCase() === 'BUTTON' && evt.type === 'click'){
      gestionarEntrada(elemento.previousElementSibling.value);
    } else if(elemento.tagName.toUpperCase() === 'INPUT' && evt.type === 'keyup' && evt.keyCode === 13){
      gestionarEntrada(elemento.value);
    }
    
  }

  // Punto 3 - Gestionar entrada
  function gestionarEntrada(valor) {
    console.log(valor);
    valor = valor.trim();
    let ciudad = null;
    if(PATRON_CIUDAD_PAIS.test(valor)){
      ciudad = buscarRegistro(ciudades, 'Nombre', valor);
    }else if(PATRON_ID.test(valor)){
      ciudad = buscarRegistro(ciudades, 'id', valor);
    }

    if(ciudad.length){
      pedirDatos('datos?id=' + ciudad[0].id,mostrarTemperaturas);
    }
  }

  // Punto 2 - Convertir CSV a array de Objetos
function convertirCSVaObjetos(datos) {
  //Pasos para filtrar el los datos
  /*
    1. Separar por el salto de linea
    2. Separar por el separador de campos
    3. Quitar los espacios
    4. Filtrar por numero de campos de la cabecera
    5. Filtrar por si falta algun campo
    6. Coger las claves
    7. Filtrar por los patrones
  */
  let datosFiltrados = datos.split(NUEVA_LINEA)
                    .map( r => r.split(SEPARADOR))
                    .map( r => r.map( c => c.trim()))
                    .filter((reg,pos,arr) => reg.length === arr[0].length)
                    .filter( r => r.every( c => c.length));

 const claves = datosFiltrados.shift(); 

datosFiltrados = datosFiltrados.filter( r => (PATRON_CIUDAD_PAIS.test(r[0]) && PATRON_CIUDAD_PAIS.test(r[1]) 
                                   && PATRON_ID.test(r[2])));
console.log(datosFiltrados);
//Pasos para pasar a objetos
/* 
  1. Coger las claves del objeto con shift
  2. Recoger los datos
  3. En cada iteracion hacer un reduce que va a devolver un objeto
    -3.1 El reduce cogera el acc creara una variable con la clave que le indice que la pos
      y la igualara al reg correspodiente
*/

//const claves = datosFiltrados.shift();
console.log(claves);

const objetos = datosFiltrados.map(r =>{return  r.reduce((acc,reg,pos) => {
                                                            acc[claves[pos]] = reg;
                                                            return acc;
                                                         },{});
                               });
console.log(objetos);


}
// Resultado del csv entregado
/* [{Nombre: "Madrid", País: "España", id: "ES-28-001"},
    {Nombre: "Londres", País: "Gran Bretaña", id: "GB-25-001"},
    {Nombre: "París", País: "Francia", id: "FR-28-001"}, 
    {Nombre: "Toledo", País: "España", id: "ES-45-001"}, 
    {Nombre: "Valencia", País: "España", id: "ES-46-001"}, 
    {Nombre: "Toledo", País: "Estados Unidos", id: "EU-55-008"}
]
*/
  function mostrarTemperaturas(datos) {
  }

  // Punto 5
  function buscarRegistro(objetos, campo, valor) {
  }

  // Punto 6 - Timer - mostrar el tiempo desde la última actualización
  function ultimaActualizacion() {
    console.log('ultimaActualizacion');
  }

  // Punto 7 - Timers - Actualizar los datos cada 5 min
  function refrescarDatos() {
    console.log('refrescarDatos');
  }

  // Punto 8 - Guardar ciudad (localeStorage)
  function almacenarCiudad(dato) {
  }

  // Punto 9 - Leer propiedad de ciudad (localeStorage)
  function propiedadCiudad(dato) {
  }

  tiempoApp.iniciar = iniciar;
})();

