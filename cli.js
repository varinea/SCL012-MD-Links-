const linkFromTheIndex = require('./index') // Con require logramos importar los archivos llamando a index.
let path = require('path');
const chalkForColor = require('chalk');
const marked = require('marked');
const nodeFetch = require('node-fetch');

//___________Argumentos en línea de comandos_______________
let file = process.argv[2];
file = path.resolve(file);
file = path.normalize(file); // normaliza los errores de escritura, así los podrá leer bien.

linkFromTheIndex(file)
  .then((data) => {
    let renderer = new marked.Renderer();
    let links = [];
    renderer.link = function (href, text) {
      links.push({
        href: href,
        text: text,
        _file: file,
        get file() {
          return this._file;
        },
        set file(value) {
          this._file = value;
        },
      });
    };
    marked(data, {
      renderer: renderer
    }); 
    let resultGetLinks = prefixLinks(links); // filtra los links
    statusLink(resultGetLinks); // válida status de los links
  }).catch((err) => {
    console.log(err);
  });

//___________Filtra todos los links con prefijo "http"_______________
function prefixLinks(links) {
  let validateLink = [];
  links.map((element) => {
    let prefix = element.href.substring(0, 4); // aqui buscamos los prefijos q tenga 4 elementos
    if (prefix == 'http') { // si es asi y es igual a http valida el link agregandoo al elemento
      validateLink.push(element);
    }
  })
  return validateLink;
};
//___________Función que muestra el status de los links a los usuarios_______________
function statusLink(links) {
  links.map((element) => {
    nodeFetch(element.href)
      .then(response => {
        if (response.status == 200) {
          console.log(chalkForColor.green('[✔]'),
            chalkForColor.cyan(element.href)
          
			);
        } else {
          console.log(chalkForColor.red('[X]'),
            chalkForColor.cyan(element.href)
            
			);
        }
      }).catch((error) =>
        console.log(chalkForColor.red('[-]'),
          chalkForColor.cyan(element.href)
		
		  )
		  );
  })
};
