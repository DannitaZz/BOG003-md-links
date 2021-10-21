const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const axios = require("axios");

const readAllFiles = (path_) => {
    return  fs.readdirSync(path_, "utf-8");
};

const isDirectory = (pathFile) => {
    let stats = fs.statSync(pathFile)
  return stats.isDirectory();
};

const recurReadRecur = (path_, paths) => {
    let files = readAllFiles(path_)
    files.forEach((e) => {
        let pathFile = path.join(path_, e); //obtengo la ruta de cada archivo
        let dir = isDirectory(pathFile)
        if (dir) {
            recurReadRecur(pathFile, paths);
        } else if (path.extname(pathFile) === ".md") {
            paths.push(pathFile);
        }
    });
    return paths
}

const recurRead = (path_) =>{
    let paths = []
    final_path_list = recurReadRecur(path_, paths)
    return new Promise((resolve) => { 
        resolve(final_path_list)
    })
}

const create_readfile_promise = (path) => {
  let links_array = []
  const reg = /\[(.+)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/gi
  return fsp.readFile(path, "utf-8").then((data) => {
    const links = data.match(reg);
    if (links === null) {
      const file= path.split('\\').pop().split('/').pop();
      console.log('No se encontraron enlaces en el archivo '+ file)
    } else {
      for (let i in links) {
        const text = reg.exec(links[i]);
        if (text === null || text === undefined) {
          // links_array[i] = 'error in ' + String(text)
          continue
        } else {
          const filteredLinks = text.filter(link => link !== undefined);
          const data_json = {href: filteredLinks[2], text: filteredLinks[1], file: path}
          links_array.push(data_json)
        } 
      }
    }
    return links_array
  });
}

const extractLinks = (paths) => {
  let promise_array = []
  for (const path of paths){
    promise_array.push(create_readfile_promise(path))
  }
  return Promise.all(promise_array).then((values) => values.flat())
  // return Promise.all(promise_array).then((values) => links_array)
}

const validateLink = (url) => {
  let linkOk = {};
  return axios.get(url)
  .then(response => {
      linkOk = {
        status: response.status,
        ok: response.statusText,
      }
      return linkOk
  })
  .catch(e => {
    if ((e.response !== null) || (e.response !== undefined)) {
      linkOk['status'] = 404;
    } else{
      linkOk['status'] = e.response.status;
    }
    linkOk['ok'] = 'Fail';
    return linkOk
  })
}

const validateLinks = (urls, options) => {
  let promises = [];
  if (options) {
    for (let i = 0; i < urls.length; i++) {
      const aUrl = urls[i].href;
      promises.push(validateLink(aUrl).then(link => {
        const newLinks = Object.assign(urls[i], link)
        return newLinks
      }))
    }
    return Promise.all(promises)
  } else {
    return Promise.resolve(urls)
  }
}

module.exports = {
    isDirectory,
    recurRead,
    extractLinks,
    validateLinks
}