const fs = require('fs');  //modulo fileSystem de Node

// Funcion que leera los archivos
const readData = (file=> {
  let doApromise = new Promise ((resolve, reject) => {
    fs.appendFile(file, "UTF-8", (error, data) => {
      if(error){
        reject(new Error("Archivo no fue encontrado"))
      }
      resolve(data)
    });
  });
  return doApromise
});
module.exports = readData; //este modulo nos enviara a la app

// revisaremos si el archivo el markdown
const markDown  = (path)=>{ //path es la ruta, el link.
  if(path.slice(-3) == ".md"){ // entonces decimos si la ruta(path) se desliza -3 lugares sera .md(markDown)
  console.log(path)
  }
  else{
    console.log("error");
  }
  return markDown;
  };