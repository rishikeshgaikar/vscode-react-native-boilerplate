const fs = require('fs');
const vscode = require('vscode');
const projectRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;

const componentsDir = `${projectRoot}/app/src/components`;

const readFiles = () => {
  var arrayFiles = fs.readdirSync(`${componentsDir}`).map(file => {
    return file.replace('.js', '');
  });
  const Files = arrayFiles.filter(item => item !== 'index');
  return Files;
};

const genrateIndex = () => {
  const componentFiles = readFiles();
  if (componentFiles.length > 0) {
    const properties = componentFiles
      .map(name => {
        const key = name.replace(/\s/g, '');
        let path = `${componentsDir}/${name}.js`;
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
    const testproperties = componentFiles.map(name => {
      const testkey = name.replace(/\s/g, '');
      return `${testkey}`;
    });

    const scenes = `${properties}\nexport {${testproperties}};`;
    fs.writeFileSync(`${componentsDir}/index.js`, scenes, 'utf8');
    return vscode.window.showInformationMessage(
      'Components index.js file successfully generated!'
    );
  } else {
    return vscode.window.showInformationMessage(
      'Directory ./app/src/components is empty!'
    );
  }
};

const isComponentDirectoryExists = () => {
  fs.access(
    `${componentsDir}`,
    fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
    err => {
      if (err) {
        return vscode.window.showInformationMessage(
          'Directory ./app/src/components dose not exists!'
        );
      } else {
        genrateIndex();
      }
    }
  );
};

module.exports = { isComponentDirectoryExists };
