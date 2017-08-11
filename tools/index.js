var program = require('commander');

let creat = require('./new');
program
.command('html <modelPath>')
.description('create html')
.usage('test')
.option('--no-api', 'create html without api')
.action(function(modelPath, options){
  var api = options.api;
  console.log(`create html ${modelPath}`);
  creat(modelPath, api);
});

program.parse(process.argv);
