import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {Appbar, Portal} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import {useAppSelector} from '../../store/hooks.ts';
import _ from 'lodash';

interface CategoryDropDown {
  label: string;
  value: string;
}

type Props = {
  onCategoriesChange: (newCategories: string) => void;
};

const FilterSelectionComponent = ({onCategoriesChange}: Props) => {
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
      <Modal
        testID={'modal'}
        isVisible={visible}
        onBackButtonPress={hideModal}
        onBackdropPress={hideModal}
        swipeDirection={['down']}
        onSwipeComplete={hideModal}
        useNativeDriverForBackdrop
        propagateSwipe={true}
        style={styles.modal}>
        <Portal.Host>
          <View style={styles.modalWrapper}>
            <View style={styles.view}>
              {/*indicator for touch*/}
              <View style={styles.draggable} />
              <View style={styles.filterContainer}>
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
                />
              </View>
            </View>
          </View>
        </Portal.Host>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    margin: 0,
    flex: 1,
  },
  modalWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  view: {
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    minHeight: '50%',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  draggable: {
    width: 50,
    height: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  filterContainer: {
    flex: 1,
    margin: 20,
  },
});

export default FilterSelectionComponent;
