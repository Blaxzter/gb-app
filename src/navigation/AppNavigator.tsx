// src/navigation/AppNavigator.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types.ts';
import HomeScreen from '../screens/HomeScreen.tsx';
import SongListScreen from '../screens/SongListScreen.tsx';
import SongScreen from '../screens/SongScreen.tsx';
import PlaylistScreen from '../screens/PlaylistScreen.tsx';
import PlaylistDetailScreen from '../screens/PlaylistDetailScreen.tsx';
import SettingsScreen from '../screens/SettingsScreen.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
};

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="SongListScreen" component={SongListScreen} />
    <Stack.Screen name="SongScreen" component={SongScreen} />
    <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
    <Stack.Screen
      name="PlaylistDetailScreen"
      component={PlaylistDetailScreen}
    />
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
  </Stack.Navigator>
);
