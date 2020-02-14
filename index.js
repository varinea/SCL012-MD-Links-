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

  
