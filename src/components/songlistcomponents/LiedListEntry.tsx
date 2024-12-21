import {Gesangbuchlied} from '../../types/modeltypes.ts';
import {Text, Avatar, Checkbox} from 'react-native-paper';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AuthorListComponent from '../utils/AutherListComponent.tsx';
import CategoryListComponent from '../utils/CategoryListComponent.tsx';
import {useThemeSelection} from '../../hooks/useThemeSelection.ts';

type Props = {
  lied: Gesangbuchlied;
  index: number;
  isSelectMode?: boolean;
  isSelected?: boolean;
};

function LiedListEntry({
  lied,
  index,
  isSelectMode = false,
  isSelected = false,
}: Props) {
  const theme = useThemeSelection();

  const renderLeading = () => {
    if (isSelectMode) {
      return (
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={isSelected ? 'checked' : 'unchecked'}
            color={theme.colors.primary}
          />
        </View>
      );
    }
    return (
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
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        {renderLeading()}
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
    alignItems: 'center', // Changed from 'flex-start' to 'center'
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
  checkboxContainer: {
    justifyContent: 'center',
    height: 24,
    marginLeft: -8,
    width: 28,
  },
});

export default LiedListEntry;
