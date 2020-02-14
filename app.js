const link = require('./index.js');
let path = require('path');

let fileSys = process.argv[2]; //posicion 2 por la posicion que se coloca, matriz q contiene los argumentos de la línea de comandos
const path = require('path');
fileSys = path.resolve(fileSys);

link(fileSys)
.then(fileSys => console.log(fileSys));