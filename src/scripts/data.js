const vscode = require('vscode');
const projectRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;

const app = `${projectRoot}/app`;
const res = `${projectRoot}/app/res`;
const src = `${projectRoot}/app/src`;

const fonts = `${res}/fonts`;
const images = `${res}/images`;
const component = `${src}/components`;
const scene = `${src}/scenes`;

const colors_js = `${res}/colors.js`;
const fonts_js = `${res}/fonts.js`;
const images_js = `${res}/images.js`;
const strings_js = `${res}/strings.js`;
const dimensions_js = `${res}/dimensions.js`;
const Styles_js = `${src}/Styles.js`;
const R_js = `${src}/R.js`;
const Routes_js = `${src}/Routes.js`;

const redux = `${src}/redux`;
const actions = `${redux}/actions`;
const reducers = `${redux}/reducers`;
const ActionTypes_js = `${redux}/actions/ActionTypes.js`;
const Store_js = `${redux}/Store.js`;
const Middleware_js = `${redux}/Middleware.js`;
const Rootreducer_js = `${redux}/reducers/RootReducer.js`;

const defaultColors = `export const colors = {
  //define colors here
};`;

const defaultFonts = `export const fonts = {
  //define fonts here
};`;

const defaultImages = `export const images = {
  //define images here
};`;

const defaultStrings = `export const strings = {
  //define strings here
};`;

const defaultStyles = `import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  //define styles here
});`;

const defaultRoutes = `//define routes here for react-navigation`;

const defaultR = `import {colors} from '../res/colors'
import {fonts} from '../res/fonts'
import {images} from '../res/images'
import {strings} from '../res/strings'
import {dimensions} from '../res/dimensions.js'
const R = {colors,fonts,images,strings,dimensions};
export default R;`;

const defaultDimensions = `import {Dimensions} from 'react-native';
const dWidth = Dimensions.get('window').width;
const dHeight = Dimensions.get('window').height;
export const dimensions = {
  width: dWidth,
  height: dHeight,
};`;

const defaultActionTypes = `//define action type here`;

const defaultRootReducer = `//define combine reducer here`;

const defaultStore = `//define your store here`;

const defaultMiddleware = `//define your middleware config here`;

const dir = [app, res, fonts, images, src, component, scene];

const files = [
  { name: colors_js, defaultContent: defaultColors },
  { name: fonts_js, defaultContent: defaultFonts },
  { name: images_js, defaultContent: defaultImages },
  { name: strings_js, defaultContent: defaultStrings },
  { name: dimensions_js, defaultContent: defaultDimensions },
  { name: Styles_js, defaultContent: defaultStyles },
  { name: R_js, defaultContent: defaultR },
  { name: Routes_js, defaultContent: defaultRoutes }
];

const reduxDir = [...dir, redux, reducers, actions];
const reduxFiles = [
  ...files,
  { name: ActionTypes_js, defaultContent: defaultActionTypes },
  { name: Store_js, defaultContent: defaultStore },
  { name: Middleware_js, defaultContent: defaultMiddleware },
  { name: Rootreducer_js, defaultContent: defaultRootReducer }
];

module.exports = { dir, files, reduxDir, reduxFiles };
