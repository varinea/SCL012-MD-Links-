const fs = require("fs");

//Revisa si el archivo el MarkDown
const markdown = (path)=>{
  if(path.slice(-3) == ".md"){
  console.log(path)
  }
  else{
    console.log("error");
  }
  return markdown;
  };

  //Leer los archivos
  const readFile = (file=> {
    let promise = new Promise ((resolve, reject) => {
      fs.readFile(file, "UTF-8", (error, data) => {
        if(error){
          reject(new Error("Archivo no fue encontrado"))
        }
        resolve(data)
      });
    });
    return promise
  });
  module.exports = readFile;
