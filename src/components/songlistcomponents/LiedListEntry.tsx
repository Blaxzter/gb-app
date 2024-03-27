import {Gesangbuchlied} from '../../types/modeltypes.ts';
import {Text, Avatar} from 'react-native-paper';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AuthorListComponent from '../utils/AutherListComponent.tsx';
import CategoryListComponent from '../utils/CategoryListComponent.tsx';
import {useThemeSelection} from '../../hooks/useThemeSelection.ts';

function LiedListEntry({lied, index}: {lied: Gesangbuchlied; index: number}) {
  const theme = useThemeSelection();

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Avatar.Text
          size={24}
          label={(index + 1).toString()}
          style={{
            backgroundColor: theme.colors.secondaryContainer,
            ...styles.avatar,
          }}
          labelStyle={{
            color: theme.colors.onSecondaryContainer,
          }}
        />
        <Text variant={'titleLarge'} style={styles.title}>
          {lied.titel}
        </Text>
      </View>
      <View style={styles.infos}>
        <AuthorListComponent text={lied.textId} melodie={lied.melodieId} />
        <CategoryListComponent categories={lied.kategorieId} />
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
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  infos: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    gap: 5,
  },
  marginBottom: {
    marginBottom: 10,
  },
  avatar: {
    marginTop: 3,
  },
});

export default LiedListEntry;
