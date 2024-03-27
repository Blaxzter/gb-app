import React, {useEffect, useState} from 'react';
import {Appbar} from 'react-native-paper';
import {View} from 'react-native';
import {useAppSelector} from '../../store/hooks.ts';
import _ from 'lodash';
import {useThemeSelection} from '../../hooks/useThemeSelection.ts';
import DropDown from '../bits/DropDown.tsx';
import BottomDrawer from '../playlistcomponents/BottomDrawer.tsx';

interface CategoryDropDown {
  label: string;
  value: string;
}

type Props = {
  onCategoriesChange: (newCategories: string) => void;
};

const FilterSelectionComponent = ({onCategoriesChange}: Props) => {
  const theme = useThemeSelection();

  const [visible, setModalVisibility] = useState<boolean>(false);
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [categories, setCategories] = useState<string>('');

  const gesangbuchlieder = useAppSelector(state => state.gbData.data);
  const [categoryList, setCategoryList] = useState<CategoryDropDown[]>([]);

  useEffect(() => {
    const currentCategories = _(gesangbuchlieder)
      .flatMap(lied =>
        _.map(lied.kategorieId, kategorie => kategorie.kategorie_id.name),
      )
      .uniq()
      .compact() // Remove any undefined or null values
      .map(category => ({
        label: _.startCase(category.toLowerCase()),
        value: category.toLowerCase(),
      }))
      .value();
    setCategoryList(currentCategories);
  }, [gesangbuchlieder]);

  useEffect(() => {
    // Whenever categories change, call the passed callback function
    onCategoriesChange(categories);
  }, [categories, onCategoriesChange]);

  const showModal = () => setModalVisibility(true);
  const hideModal = () => setModalVisibility(false);

  return (
    <View>
      <Appbar.Action icon="filter" onPress={showModal} />
      <BottomDrawer visible={visible} hideModal={hideModal} theme={theme}>
        <DropDown
          label={'Kategorien'}
          mode={'outlined'}
          visible={showMultiSelectDropDown}
          showDropDown={() => setShowMultiSelectDropDown(true)}
          onDismiss={() => setShowMultiSelectDropDown(false)}
          value={categories}
          setValue={setCategories}
          list={categoryList}
          multiSelect
          activeColor={theme.colors.primary}
          dropDownStyle={{
            borderColor: theme.colors.onBackground,
          }}
        />
      </BottomDrawer>
    </View>
  );
};

export default FilterSelectionComponent;
