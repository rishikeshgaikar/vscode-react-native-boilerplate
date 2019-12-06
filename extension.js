const vscode = require('vscode');
const { Basic } = require('./src/scripts/basic.js');
const { Redux } = require('./src/scripts/redux.js');
const { isScenesDirectoryExists } = require('./src/scripts/sindex.js');
const { isComponentDirectoryExists } = require('./src/scripts/cindex.js');
const { isFontDirectoryExists } = require('./src/scripts/fonts.js');
const { isImageDirectoryExists } = require('./src/scripts/images.js');

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'extension.genrateBoilerPlate',
    function() {
      const myOptions = [
        { name: 'Basic Boilerplate' },
        { name: 'Redux Boilerplate' },
        { name: 'Scenes => index.js' },
        { name: 'Components => index.js' },
        { name: 'Images' },
        { name: 'Fonts' }
      ];
      const quickPick = vscode.window.createQuickPick();
      quickPick.items = myOptions.map(x => ({ label: x.name }));
      quickPick.onDidChangeSelection(([item]) => {
        switch (item.label) {
          case 'Basic Boilerplate': {
            Basic();
            quickPick.dispose();
            break;
          }
          case 'Redux Boilerplate': {
            quickPick.dispose();
            Redux();
            break;
          }
          case 'Scenes => index.js': {
            isScenesDirectoryExists();
            quickPick.dispose();
            break;
          }
          case 'Components => index.js': {
            isComponentDirectoryExists();
            quickPick.dispose();
            break;
          }
          case 'Images': {
            isImageDirectoryExists();
            quickPick.dispose();
            break;
          }
          case 'Fonts': {
            isFontDirectoryExists();
            quickPick.dispose();
            break;
          }
          default: {
            quickPick.dispose();
            return vscode.window.showInformationMessage('No Option Selected!');
            break;
          }
        }
      });
      quickPick.onDidHide(() => quickPick.dispose());
      quickPick.show();
    }
  );
  context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() {}
module.exports = {
  activate,
  deactivate
};
