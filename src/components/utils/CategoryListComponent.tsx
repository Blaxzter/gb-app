import {KategorieType} from '../../types/modeltypes.ts';
import React from 'react';
import {useThemeSelection} from '../../hooks/useThemeSelection.ts';
import IconTextListComponent from '../bits/IconTextListComponent.tsx';

type Props = {
  categories: KategorieType[];
};

const CategoryListComponent = ({categories}: Props) => {
  const theme = useThemeSelection();

  const categoryNames = categories.map(
    kategorie => kategorie.kategorie_id.name,
  );

  return (
    <IconTextListComponent
      backgroundColor={theme.colors.secondaryContainer}
      color={theme.colors.onSecondaryContainer}
      content={categoryNames}
      icon={'tag'}
      iconColor={theme.colors.onSecondaryContainer}
    />
  );
};

export default CategoryListComponent;
