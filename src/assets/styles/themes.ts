import {
  MD3LightTheme as LightTheme,
  MD3DarkTheme as DarkTheme,
  useTheme,
} from 'react-native-paper';

const lightTheme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
  },
};

export type LightAppTheme = typeof lightTheme;
export const useAppTheme = () => useTheme<LightAppTheme>();

export type DarkAppTheme = typeof darkTheme;
export const useDarkAppTheme = () => useTheme<DarkAppTheme>();

export {lightTheme, darkTheme};
