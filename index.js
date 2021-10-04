const path = require("path");
const functions = require('./functions');
  
const mdLinks = (path_, options) => {
  return new Promise(resolve => {
    const pathAbsolute = path.resolve(path_);

    if (functions.isDirectory(pathAbsolute)) {
      const theLinks = functions.recurRead(pathAbsolute)
    .then(array => functions.extractLinks(array))
    .then(urls => functions.validateLinks(urls, options.validate))
    .then(links => links);
    resolve(theLinks);
    } 
    else {
      const theLinks2 = functions.extractLinks([pathAbsolute])
    .then(urls => functions.validateLinks(urls, options.validate))
    .then(links => links);
    resolve(theLinks2);
    }  
  })  
};

module.exports = {
  mdLinks
};
