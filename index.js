const path = require("path");
const functions = require('./functions');
  
const mdLinks = (path_, options) => {
  return new Promise((resolve, reject) => {
    const pathAbsolute = path.resolve(path_);

    if (functions.isDirectory(pathAbsolute)) {
      const theLinks = functions.recurRead(pathAbsolute)
    .then(array => functions.extractLinks(array))
    .then(urls => functions.validateLinks(urls, options.validate))
    .then(links => links);
    resolve(theLinks);
    } 
    else if (!functions.isDirectory(pathAbsolute) && path.extname(pathAbsolute) === '.md') {
      const theLinks2 = functions.extractLinks([pathAbsolute])
    .then(urls => functions.validateLinks(urls, options.validate))
    .then(links => {
      console.log(links);
    return links});
    resolve(theLinks2);
    } else {
      reject('Ingrese un directorio o un archivo md');
    } 
  })  
};

module.exports = {
  mdLinks
};
