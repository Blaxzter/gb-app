// src/hooks/useThemeSelection.ts
import {useSelector} from 'react-redux';
import {RootState} from '../store/store.ts';
import {lightTheme, darkTheme} from '../assets/styles/themes.ts';

export const useThemeSelection = () => {
  const currentTheme = useSelector((state: RootState) =>
    state.settings.theme === 'light' ? lightTheme : darkTheme,
  );
  return currentTheme;
};

// export for bool that is true if the theme is dark
export const useIsDarkTheme = () => {
  const isDarkTheme = useSelector(
    (state: RootState) => state.settings.theme === 'dark',
  );
  return isDarkTheme;
};
