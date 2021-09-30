#!/usr/bin/env node

const mdLinks = require("./index");

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

if (process.argv.length < 3){
  let err_msg = 'No arguments found'
  usage(err_msg)
}else if(!checkArgs(arguments, valid_arguments)){
  let err_msg = 'Invalid arguments'
  usage(err_msg)
}else{
  console.log('everything is allright');
  // Llamar la función mdLinks y reordenar la información que retorna
  mdLinks.mdLinks(path, true).then(links => console.log(links))
  console.log(arguments)
}
