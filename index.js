const fs = require('fs');

//Aqui estoy llamando a la DATA
 const leerArchivo = (fileSys)=> { //file es de file system, para instalarlo npm install file-system --save 
  return new Promise((resolve, reject)=>{
    console.log('entro')
    fs.readFile(fileSys,'utf8',(error, data)=>{
      if(error){
        reject(new Error('archivo no encontrado'));
      }
      resolve(data);
    });
  });

};


// Verifica si un archivo es Markdown
const mdLink  = (path)=>{
  if(path.slice(-3) == ".md"){
  console.log(path)
  }
  else{
    console.log("error");
  }
  return mdLink;
  };


  module.exports = leerArchivo;