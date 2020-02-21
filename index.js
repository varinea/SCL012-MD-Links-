const fs = require("fs"); // FileSystem de node con require q viene de forma global en Nodejs


const mArkdown = (path) => { // revisa si un archivo es Markdown llamando a path, el link(url)
  if (path.slice(-3) == ".md") {
    console.log(path)
  } else {
    console.log('No es un archivo .md');
  }
  return mArkdown;
};

// Función que me leé los archivos 
const readTheFile = (file => {
  let promise = new Promise((resolve, reject) => {
    fs.readFile(file, "UTF-8", (error, data) => {
      if (error) {
        reject(new Error("Archivo no encontrado"))
      }
      resolve(data)
    });
  });
  return promise
});


module.exports = readTheFile;
