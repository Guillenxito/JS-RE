// Separadores del archivo CSV
const NUEVA_LINEA = '\n',
  SEPARADOR = ';';

// Array de objetos ciudades
let ciudades = null;

// A rellenar con las expresiones regulares
const PATRON_CIUDAD_PAIS = ,
  PATRON_ID = ;

// URL por defecto
let urlServidor = 'http://localhost:3000';

// Punto 1 - Iniciar la aplicación
function iniciar(url) {
}

// Punto 2 - Convertir CSV a array de Objetos
function convertirCSVaObjetos(datos) {
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


// Punto 3 - Gestionar eventos entrada
function gestionarEventosEntrada(evt) {
}

// Punto 3 - Gestionar entrada
function gestionarEntrada(valor) {
}

/* (4) en el id=act */
/* 
   El nombre de la imagen se forma con las tres primeras letras
   del campo cielo + la terminación
*/
/* Estructura html
<div>
  <h2>Madrid</h2>
  <h3>(España)</h3>
  <p>Actualizado hace <span id="act">1</span> minuto(s)</p>
</div>
<div data-date="2019-03-06">
  <h3>Hoy</h3>
  <img src="img/sol.svg" alt="estado">
  <span>Soleado</span>
  <p>Min: 1,6°</p>
  <p>Max: 13,5°</p>
</div>
*/
/* 
  Si no hay datos de temperaturas el div con data-date cuenta 
  con un solo hijo:
  <img src="img/no_disponible.png" alt="no">
*/
// Punto 4 -  Motrar la temperatura de la ciudad
function mostrarTemperaturas(datos) {
}

// Punto 5
function buscarRegistro(objetos, campo, valor) {
}

// Punto 6 - Timer - mostrar el tiempo desde la última actualización
function ultimaActualizacion() {
}

// Punto 7 - Timers - Actualizar los datos cada 5 min
function refrescarDatos() {
}

// Punto 8 - Guardar ciudad (localeStorage)
function almacenarCiudad(dato) {
}

// Punto 9 - Leer propiedad de ciudad (localeStorage)
function propiedadCiudad(dato) {
}

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