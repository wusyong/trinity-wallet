import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './navigation';
import store from './store';
import './shim.js'

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'initialLoading',
    navigatorStyle: { navBarHidden: true, screenBackgroundImageName: 'bg-green.png', screenBackgroundColor: '#102e36' },
  },
});
