import {Gesangbuchlied} from '../../types/modeltypes.ts';
import {Text, Avatar} from 'react-native-paper';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import CategoryScroller from '../utils/CategoryScroller.tsx';
import AuthorListComponent from '../utils/AutherListComponent.tsx';

function LiedListEntry({lied, index}: {lied: Gesangbuchlied; index: number}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Avatar.Text
          size={24}
          label={(index + 1).toString()}
          style={styles.number}
        />
        <Text variant={'titleLarge'} style={styles.title}>
          {lied.titel}
        </Text>
      </View>
      <View style={styles.infos}>
        <View style={styles.marginBottom}>
          <CategoryScroller categories={lied.kategorieId} />
        </View>
        <AuthorListComponent text={lied.textId} melodie={lied.melodieId} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  number: {
    backgroundColor: 'lightgrey',
  },
  infos: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  marginBottom: {
    marginBottom: 10,
  },
});

export default LiedListEntry;
