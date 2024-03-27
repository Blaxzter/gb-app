// App.tsx
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider, Text} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import store, {persistor} from './src/store/store.ts';
import {useThemeSelection} from './src/hooks/useThemeSelection.ts';
import {AppNavigator} from './src/navigation/AppNavigator.tsx';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  const currentTheme = useThemeSelection();

  return (
    <PaperProvider theme={currentTheme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

const Main = () => (
  <StoreProvider store={store}>
    <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
      <App />
    </PersistGate>
  </StoreProvider>
);

export default Main;
