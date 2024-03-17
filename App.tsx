/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen.tsx';
import SongListScreen from './src/screens/SongListScreen.tsx';
import {RootStackParamList} from './src/navigation/types.ts';
import {PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider, useSelector} from 'react-redux';
import store, {RootState} from './src/store/store.ts';
import SongScreen from './src/screens/SongScreen.tsx';
import {lightTheme} from './src/assets/styles/themes.ts';
import {darkTheme} from './src/assets/styles/themes.ts';
import SettingsScreen from './src/screens/SettingsScreen.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const currentTheme = useSelector((state: RootState) =>
    state.settings.theme === 'light' ? lightTheme : darkTheme,
  );

  return (
    <PaperProvider theme={currentTheme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Gesangbuchlied', headerShown: false}}
          />
          <Stack.Screen
            name="SongListScreen"
            component={SongListScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SongScreen"
            component={SongScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const Main = () => {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
};

export default Main;
