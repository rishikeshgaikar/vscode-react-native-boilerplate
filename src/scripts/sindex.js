const fs = require('fs');
const vscode = require('vscode');
const projectRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;

const scenesDir = `${projectRoot}/app/src/scenes`;

const readFiles = () => {
  var arrayFiles = fs.readdirSync(`${scenesDir}`).map(file => {
    return file.replace('.js', '');
  });
  const Files = arrayFiles.filter(item => item !== 'index');
  return Files;
};

const genrateIndex = () => {
  const scenesFiles = readFiles();
  if (scenesFiles.length > 0) {
    const properties = scenesFiles
      .map(name => {
        const key = name.replace(/\s/g, '');
        let path = `${scenesDir}/${name}.js`;
        let lastIndex = -1;
        var sceneFileData = fs.readFileSync(path, 'utf-8');
        let dataArray = sceneFileData.toString().split('\n');
        const searchKeyword = 'default';

        for (let index = 0; index < dataArray.length; index++) {
          if (dataArray[index].includes(searchKeyword)) {
            lastIndex = index;
            break;
          }
        }
        if (lastIndex == -1) {
          return `import {${key}} from './${key}';`;
        } else {
          return `import ${key} from './${key}';`;
        }
      })
      .join('\n');
    const testproperties = scenesFiles.map(name => {
      const testkey = name.replace(/\s/g, '');
      return `${testkey}`;
    });

    const scenes = `${properties}\nexport {${testproperties}};`;
    fs.writeFileSync(`${scenesDir}/index.js`, scenes, 'utf8');
    return vscode.window.showInformationMessage(
      'Scenes index.js file successfully generated!'
    );
  } else {
    return vscode.window.showInformationMessage(
      'Directory ./app/src/scenes is empty!'
    );
  }
};

const isScenesDirectoryExists = () => {
  fs.access(
    `${scenesDir}`,
    fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
    err => {
      if (err) {
        return vscode.window.showInformationMessage(
          'Directory ./app/src/scenes dose not exists!'
        );
      } else {
        genrateIndex();
      }
    }
  );
};
module.exports = { isScenesDirectoryExists };
