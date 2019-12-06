const fs = require('fs');
const vscode = require('vscode');
const projectRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;

const fontsDir = `${projectRoot}/app/res/fonts`;
const resDir = `${projectRoot}/app/res`;

const fontFileNames = () => {
  const fontsArray = fs.readdirSync(`${fontsDir}`).map(file => {
    return file.replace('.ttf', '').replace('.otf', '');
  });
  return fontsArray;
};

const generateFonts = () => {
  const properties = fontFileNames();
  if (properties.length > 0) {
    const fonts = properties
      .map(name => {
        var fname = name.replace('-', '');
        const key = fname.replace(/\s/g, '');
        return `${key}: '${name}'`;
      })
      .join(',\n');

    const string = `export const fonts = {\n${fonts}\n}`;
    fs.writeFileSync(`${resDir}/fonts.js`, string, 'utf8');
    return vscode.window.showInformationMessage(
      'All fonts imported successfully!'
    );
  } else {
    console.log(`=r=n=b=> './app/res/fonts' is empty!`);
    return vscode.window.showInformationMessage(
      'Directory ./app/res/fonts is empty!'
    );
  }
};

const isFontDirectoryExists = () => {
  fs.access(
    `${fontsDir}`,
    fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
    err => {
      if (err) {
        return vscode.window.showInformationMessage(
          'Directory ./app/res/fonts dose not exists!'
        );
      } else {
        generateFonts();
      }
    }
  );
};

module.exports = { isFontDirectoryExists };
