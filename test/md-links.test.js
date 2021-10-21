const mdLinks = require('../index');

const path = './Los_readme';
const path2 = './Los_readme/README-cardvalidation.md';
const path3 = './Los_readme/elquenodebeserleido.txt';
const optionsFalse = {validate: false};
const validFalse = [
  {
    href: 'https://i.imgur.com/R81REIK.png',
    text: 'imagen',
    file: 'C:\\Users\\danit\\Documents\\Laboratoria\\md-links\\BOG003-md-links\\Los_readme\\README-cardvalidation.md'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
    text: 'Array - MDN',
    file: 'C:\\Users\\danit\\Documents\\Laboratoria\\md-links\\BOG003-md-links\\Los_readme\\README-cardvalidation.md'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
    text: 'Array.prototype.filter() - MDN',
    file: 'C:\\Users\\danit\\Documents\\Laboratoria\\md-links\\BOG003-md-links\\Los_readme\\README-cardvalidation.md'
  }
];
const optionsTrue = {validate: true};
const validTrue = [
  {
    href: 'https://i.imgur.com/R81REIK.png',
    text: 'imagen',
    file: 'C:\\Users\\danit\\Documents\\Laboratoria\\md-links\\BOG003-md-links\\Los_readme\\README-cardvalidation.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
    text: 'Array - MDN',
    file: 'C:\\Users\\danit\\Documents\\Laboratoria\\md-links\\BOG003-md-links\\Los_readme\\README-cardvalidation.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
    text: 'Array.prototype.filter() - MDN',
    file: 'C:\\Users\\danit\\Documents\\Laboratoria\\md-links\\BOG003-md-links\\Los_readme\\README-cardvalidation.md',
    status: 200,
    ok: 'OK'
  }
]


describe('mdLinks', () => {
  it('Debería resolver un arreglo de objetos si le paso un directorio', () => {
    return expect(mdLinks.mdLinks(path, optionsFalse)).resolves.toStrictEqual(validFalse);
  });
  it('Debería resolver un arreglo de objetos si le paso un archivo md', () => {
    return expect(mdLinks.mdLinks(path2, optionsFalse)).resolves.toStrictEqual(validFalse);
  });
  it('Debería retornar un error si le paso un archivo diferente a md', () => {
    return expect(mdLinks.mdLinks(path3, optionsFalse)).rejects.toBe('Ingrese un directorio o un archivo md');
  });
  it('Debería resolver un arreglo de objetos validados si le paso un directorio y options:true', () => {
    return expect(mdLinks.mdLinks(path, optionsTrue)).resolves.toStrictEqual(validTrue);
  });
});

