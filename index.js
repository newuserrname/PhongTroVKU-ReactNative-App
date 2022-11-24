/**
 * @format
 */

import {AppRegistry} from 'react-native';
import RestApi from './restApi';
import PostsList from "./screens/PostsList/PostsList";
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => PostsList);
