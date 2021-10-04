const mdLinks = require('./index');

const path = './Los_readme';
const options = {validate: false};
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


describe('mdLinks', () => {

  it('Debería resolver un arreglo de objetos', () => {
    return expect(mdLinks.mdLinks(path, options)).resolves.toBe(validFalse);
  });
});

