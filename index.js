const fs = require("fs"); // FileSystem de node con require q viene de forma global en Nodejs

//___________Función que revisa si un archivo es Markdown _______________
const mArkdown = (path) => {
  if (path.slice(-3) == ".md") {
    console.log(path)
  } else {
    console.log('No es un archivo .md');
  }
  return mArkdown;
};

//___________Función que me leera los archivos del doc _______________

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
