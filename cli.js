#!/usr/bin/env node

const mdLinks = require("./index");
const figlet = require('figlet');
const chalk = require('chalk');

figlet('Welcome to mdLinks', (err, data) => {
    if (err) {
        console.dir(err);
        return;
    }
    console.log(chalk.yellow(data));
});

const usage = (err_msg = false) => {
  const usageText = `
  mdLinks extracts and checks links 
  inside your mardown files.

  usage:
    mdlinks <route> <commands>

    commands can be:
    --validate : validates your links via http requests
    --stats : computes the total number of links
  `
  if (err_msg){
    console.log(err_msg)
  }
  console.log(usageText)
}

const checkArgs = (arguments, valid_arguments) => {
  for (let arg of arguments){
    if (!valid_arguments.includes(arg)){
      let err_msg = 'Invalid arguments'
      usage(err_msg)
      return false 
    }
  }
  return true
}

const path = process.argv[2]
const arguments = process.argv.slice(3)
const valid_arguments = ["--validate", "--stats"]

const results = mdLinks.mdLinks(path, {validate: false}).then(links => links);

const simpleMd = () => {
  return new Promise(resolve => {
   mdLinks.mdLinks(path, {validate: false}).then(results => {
      for (let result in results) {
        console.log(results[result].file + ' ' + results[result].href + ' ' + results[result].text)
      }
    })
  })
}

const consultsMd = () => {
   mdLinks.mdLinks(path, {validate: true}).then(results => {
      for (let result in results) {
        console.log(result + ' => ' + results[result].file + ' ' + results[result].href +  ' ' + results[result].ok + ' ' + results[result].status + ' ' +  results[result].text)
      }
    })
}

const stats = () => {
  mdLinks.mdLinks(path, {validate: true}).then(results => {
    const total = results.length;
    const unique = results.length;
    console.log('Total: ', total);
    console.log('Unique: ', unique);
  })
}

const statsValidate =  () => {
  mdLinks.mdLinks(path, {validate: true}).then(results => {
    let broken = '';
    for (let result in results) {
      if (results[result].ok === 'Fail') {
        broken += 1;
      }
    }
    const total = results.length;
    const unique = results.length;
    console.log(chalk.green('Total: '), total);
    console.log(chalk.green('Unique: '), unique);
    console.log(chalk.red('Broken: '), broken.length);
  })
}

if (process.argv.length < 3){
  let err_msg = 'No arguments found'
  usage(err_msg)
}else if(!checkArgs(arguments, valid_arguments)){
  let err_msg = 'Invalid arguments'
  usage(err_msg)
} else if ((arguments[0] === valid_arguments[0]) && (arguments[1] === valid_arguments[1])) {
  // Aquí se llaman las estadísticas con el estado de los links
  statsValidate();
}
else if (arguments[0] === valid_arguments[0]){
  // Llamar la función mdLinks y reordenar la información que retorna
  consultsMd();
} else if (arguments[0] === valid_arguments[1]) {
  // Aquí se llama la función que calcula estadísticas
  stats();
}
else if (arguments[0] === undefined) {
  // Se llama mdLinks con false
  simpleMd();
}