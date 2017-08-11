var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');
let stat = Promise.promisify(fs.stat);
let mkdir = Promise.promisify(fs.mkdir);
let writeFile = Promise.promisify(fs.writeFile);
let exists = Promise.promisify(fs.exists);
var ejs = require('ejs');
let renderFile = Promise.promisify(ejs.renderFile);

async function createNew(modelPath, api) {
  let modelTemplate = path.join(__dirname, `../../templates/${path.dirname(modelPath)}`);
  let modelJs = path.join(__dirname, `../../app/scripts/${path.dirname(modelPath)}`);
  let modelStyle = path.join(__dirname, `../../app/styles/${path.dirname(modelPath)}`);
  let modelImg = path.join(__dirname, `../../app/img/${path.dirname(modelPath)}`);
  let modelName = path.basename(modelPath);
  try {
     await stat(modelTemplate);
  }catch (err) {
    return console.log(`folder ${modelTemplate} is not exist, please create it first`);
  }
  try{
    let modelTemplatePath = path.join(modelTemplate, `${modelName}.html`);
    let modelJsPath = path.join(modelJs, `${modelName}.js`);
    let modelStylePath = path.join(modelStyle, `${modelName}.scss`);
    try{
      await stat(modelTemplatePath);
      await stat(modelJsPath);
      await stat(modelStylePath);
      await exists(path, (exists) => {  
          if(exists)  
              throw new Error(`img ${modelName} already created`);
          else   
              mkdir(modelImg); 
      });
      throw new Error(`html ${modelName} already created`);
    } catch(err){
      let template = 'htmlHtml.ejs';
      let js = 'htmlJs.ejs';
      let scss = 'html.scss';
      let contentTemplate = await renderFile(path.join(__dirname, template), {
        modelName,
      });
      let contentJs = await renderFile(path.join(__dirname, js), {
        modelName,
      });
      await writeFile(modelTemplatePath, contentTemplate);
      await writeFile(modelJsPath, contentJs);
      await writeFile(modelStylePath, scss);
      console.log(`create html ${modelPath} successful`);
    }   
  }catch (err) {
    console.log(err.message);
  }
}

async function creat(modelPath, api) {
  try {
    await createNew(modelPath, api);
  }catch(err) {
    console.log(err.message);
  }
}

module.exports = creat;