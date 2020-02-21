let path = require('path');
const callLinks = require('./index') // Con require logramos importar los archivos.
const marked = require('marked');
const fetch = require('node-fetch');
const chalk = require('chalk');

let file = process.argv[2]; // matriz que contiene los argumentos de la línea de comandos
file = path.resolve(file);
file = path.normalize(file); // si hay errores de escritura, los resuelve para leerlos bien 

callLinks(file)
	.then((data) => {
		let renderer = new marked.Renderer();
		let links = [];
		renderer.link = function (href, title, text) {
			links.push({
					href: href,
					text: text,
					file: file,
				});
		};
		marked(data, { renderer: renderer }); // obtiene los links en un array de object
		let resultGet = getLinks(links); // funcion que filtra los links
		statusLink(resultGet); // válida status de los links
	}).catch((err) => {
		console.log(err);
	});

// función que filtra todos los links
function getLinks(links) {
	let validateLink = [];
	links.map((element) => {
		var prefix = element.href.substring(0, 4);
		if (prefix == 'http') {
			validateLink.push(element);
		}
	})
	return validateLink;
};
// Función valida status de los links
function statusLink(links) {
	links.map((element) => {
		fetch(element.href)
			.then(response => {
				if (response.status == 200) {
					console.log(chalk.blue('[✔]'), chalk.cyan(element.href), chalk.bgGreen(` ${response.status} ${response.statusText} `), chalk.green(element.text));
				} else {
					console.log(chalk.red('[X]'), chalk.cyan(element.href), chalk.bgRed(` ${response.status} ${response.statusText} `), chalk.green(element.text));
				}
			}).catch((error) => console.log(chalk.gray('[-]'), chalk.cyan(element.href), chalk.bgRed(` ${error.type} ${error.code} `), chalk.green(element.text)));
	})
}

