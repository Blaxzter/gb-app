import React from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {Chip} from 'react-native-paper';
import {KategorieType} from '../../types/modeltypes.ts';

type Props = {
  categories: KategorieType[];
};

const CategoryScroller = ({categories}: Props) => {
  return (
    <Pressable>
      <ScrollView horizontal>
        <View style={styles.container}>
          {categories.map(kategorie => (
            <Chip key={kategorie.kategorie_id.name} mode={'outlined'}>
              {kategorie.kategorie_id.name}
            </Chip>
          ))}
        </View>
      </ScrollView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'nowrap',
  },
});

export default CategoryScroller;
