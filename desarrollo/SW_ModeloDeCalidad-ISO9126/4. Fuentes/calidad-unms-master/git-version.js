const { gitDescribeSync } = require('git-describe');
const { readFile, writeFileSync } = require('fs');
const handlebars = require('handlebars');

const gitInfo = gitDescribeSync();

let data = {
  commit: gitInfo.suffix,
  gitdescribe: gitInfo,
  title: 'Software y App de Gestión para Salones de Belleza y Clinicas Dentales | Vertemejor',
  description: 'Administrador Vertemejor para la administración, control y gestión de los negocios en el rubro de la belleza y salud.',
};


readFile('templates/index.tpl.html', 'utf-8', (error, source) => {
  handlebars.registerHelper('toJSON', (obj) => {
    return JSON.stringify(obj, null, 2);
  });

  const template = handlebars.compile(source);
  const html = template(data);
  writeFileSync('src/index.html', html);
});
