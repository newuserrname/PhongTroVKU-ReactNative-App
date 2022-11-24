/**
 * @format
 */

import {AppRegistry} from 'react-native';
import RestApi from './restApi';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RestApi);
