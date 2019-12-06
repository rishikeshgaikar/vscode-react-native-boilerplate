const fs = require('fs');
const vscode = require('vscode');
const projectRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;

const imagesDir = `${projectRoot}/app/res/images`;
const resDir = `${projectRoot}/app/res`;

const CreateImageArray = () => {
  const ImageStringArray = [];
  fs.readdirSync(`${imagesDir}`).filter(file => {
    var tempImageName = file.split('.');
    var imageName = tempImageName[0];
    var extName = tempImageName[1];
    ImageStringArray.push({ name: `${imageName}`, ext: `${extName}` });
  });
  return ImageStringArray;
};

const generateImages = () => {
  let Image = CreateImageArray()
    .map(r => {
      return `${r.name}: require('./images/${r.name}.${r.ext}')`;
    })
    .join(',\n');
  if (Image.length > 0) {
    const string = `export const images={\n${Image}\n};`;
    fs.writeFileSync(`${resDir}/images.js`, string, 'utf8');
    return vscode.window.showInformationMessage(
      'All images imported successfully!'
    );
  } else {
    return vscode.window.showInformationMessage(
      'Directory ./app/res/images is empty!'
    );
  }
};

const isImageDirectoryExists = () => {
  fs.access(
    `${imagesDir}`,
    fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
    err => {
      if (err) {
        return vscode.window.showInformationMessage(
          'Directory ./app/res/images dose not exists!'
        );
      } else {
        generateImages();
      }
    }
  );
};

module.exports = { isImageDirectoryExists };
