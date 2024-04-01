import React, {useEffect, useState} from 'react';
import {Appbar, Switch, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useAppSelector} from '../../store/hooks.ts';
import _ from 'lodash';
import {useThemeSelection} from '../../hooks/useThemeSelection.ts';
import DropDown from '../bits/DropDown.tsx';
import BottomDrawer from '../bits/BottomDrawer.tsx';

interface CategoryDropDown {
  label: string;
  value: string;
}

type Props = {
  onCategoriesChange: (newCategories: string) => void;
  onABCChange: (hasABC: boolean) => void;
};

const FilterSelectionComponent = ({onCategoriesChange, onABCChange}: Props) => {
  const theme = useThemeSelection();

  const [visible, setModalVisibility] = useState<boolean>(false);
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [categories, setCategories] = useState<string>('');

  const gesangbuchlieder = useAppSelector(state => state.gbData.data);
  const [categoryList, setCategoryList] = useState<CategoryDropDown[]>([]);

  const [hasABC, setHasABC] = useState<boolean>(false);

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

  useEffect(() => {
    // Whenever the ABC switch changes, call the passed callback function
    onABCChange(hasABC);
  }, [hasABC, onABCChange]);

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
        <View style={styles.configRow}>
          <Text variant="titleMedium">Nur ABC Render:</Text>
          <Switch value={hasABC} onValueChange={setHasABC} />
        </View>
      </BottomDrawer>
    </View>
  );
};

const styles = StyleSheet.create({
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 20,
  },
});

export default FilterSelectionComponent;
