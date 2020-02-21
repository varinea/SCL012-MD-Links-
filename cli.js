
const linkFromTheIndex = require('./index') // Con require logramos importar los archivos llamando a index.
let path = require('path');
const marked = require('marked');
const nodeFetch = require('node-fetch');
const chalkForColor = require('chalk');

let file = process.argv[2]; // matriz que contiene los argumentos de la línea de comandos
file = path.resolve(file);
file = path.normalize(file); // si hay errores de escritura, los resuelve para leerlos bien 

linkFromTheIndex(file)
	.then((data) => {
		let renderer = new marked.Renderer();
		let links = [];
		renderer.link = function (href, text) {
			links.push({
					href: href,
					text: text,
					file: file,
				});
		};
		marked(data, { renderer: renderer }); // obtiene los links en un array de object
		let resultGetLinks = getLinks(links); // funcion que filtra los links
		statusLink(resultGetLinks); // válida status de los links
	}).catch((err) => {
		console.log(err);
	});

// Filtra todos los links con prefijo en http
function getLinks(links) {
	let validateLink = [];
	links.map((element) => {
		let prefix = element.href.substring(0, 4); // aqui buscamos los prefijos q tenga 4 elementos
		if (prefix == 'http') {   // si es asi y es igual a http valida el link agregandoo al elemento
			validateLink.push(element);
		}
	})
	return validateLink;
};
// Función valida status de los links
function statusLink(links) {
	links.map((element) => {
		nodeFetch(element.href)
			.then(response => {
				if (response.status == 200) {
					console.log(chalkForColor.blue('[✔]'), 
					chalkForColor.cyan(element.href), 
					chalkForColor.bgGreen(` ${response.status} ${response.statusText} `), 
					chalkForColor.green(element.text));
				} else {
					console.log(chalkForColor.red('[X]'), 
					chalkForColor.cyan(element.href), 
					chalkForColor.bgRed(` ${response.status} ${response.statusText} `), 
					chalkForColor.green(element.text));
				}
			}).catch((error) => 
			console.log(chalkForColor.gray('[-]'), 
			chalkForColor.cyan(element.href), 
			chalkForColor.bgRed(` ${error.type} ${error.code} `), 
			chalkForColor.green(element.text)));
	})
}

