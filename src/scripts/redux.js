const fs = require('fs');
const vscode = require('vscode');
const { reduxDir, reduxFiles } = require('./data');

const Redux = () => {
  reduxDir.forEach(element => {
    fs.access(
      element,
      fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
      err => {
        if (err) {
          fs.mkdirSync(element);
        }
      }
    );
  });

  reduxFiles.forEach(element => {
    fs.access(
      element.name,
      fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK,
      err => {
        if (err) {
          fs.writeFile(element.name, element.defaultContent, err => {
            if (err) throw err;
          });
        }
      }
    );
  });

  return vscode.window.showInformationMessage(
    'Redux boilerplate successfully generated!'
  );
};

module.exports = { Redux };
