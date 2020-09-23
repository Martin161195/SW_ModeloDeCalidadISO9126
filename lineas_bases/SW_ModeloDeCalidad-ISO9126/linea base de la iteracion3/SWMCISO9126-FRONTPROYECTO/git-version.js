const { gitDescribeSync } = require('git-describe');
const { readFile, writeFileSync } = require('fs');
const handlebars = require('handlebars');

const gitInfo = gitDescribeSync();

let data = {
  commit: gitInfo.suffix,
  gitdescribe: gitInfo,
  title: 'Software gestor de proyectos',
  description: 'Software gestor de proyectos.',
};


readFile('templates/index.tpl.html', 'utf-8', (error, source) => {
  handlebars.registerHelper('toJSON', (obj) => {
    return JSON.stringify(obj, null, 2);
  });

  const template = handlebars.compile(source);
  const html = template(data);
  writeFileSync('src/index.html', html);
});
