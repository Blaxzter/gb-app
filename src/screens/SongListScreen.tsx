import React from 'react';
import {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types.tsx';
import {Appbar, Searchbar, TouchableRipple} from 'react-native-paper';
import {useAppSelector} from '../store/hooks.tsx';
import LiedListEntry from '../components/LiedListEntry.tsx';
import {Gesangbuchlied} from '../assets/scripts/modeltypes.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'SongListScreen'>;

function SongListScreen({navigation}: Props) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const data = useAppSelector(state => state.gbData.data);

  function filterSongs(lied: Gesangbuchlied) {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    if (searchQuery === '') {
      return true;
    }
    return (
      lied?.titelLowerCase?.includes(lowerCaseSearchQuery) ||
      lied?.authorStrings?.includes(lowerCaseSearchQuery) ||
      lied?.kategorieStrings?.includes(lowerCaseSearchQuery)
    );
  }

  return (
    <>
      <Appbar.Header>
        {isSearchActive ? (
          <Searchbar
            placeholder="Gesangbuch Titel Eingeben..."
            autoFocus
            onIconPress={() => {
              setIsSearchActive(false);
              setSearchQuery('');
            }}
            onChangeText={query => setSearchQuery(query)}
            value={searchQuery}
            icon={'arrow-left'}
          />
        ) : (
          <>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Gesangbuchlieder" />
            <Appbar.Action
              icon="magnify"
              onPress={() => {
                setIsSearchActive(true);
                setSearchQuery('');
              }}
            />
            <Appbar.Action icon="filter" onPress={() => {}} />
          </>
        )}
      </Appbar.Header>
      <View style={styles.container}>
        {data && (
          <FlatList
            data={data.filter(lied => filterSongs(lied))}
            renderItem={({item, index}) => (
              <TouchableRipple
                onPress={() => {
                  navigation.navigate('SongScreen', {lied: item});
                }}>
                <LiedListEntry lied={item} index={index} />
              </TouchableRipple>
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  numberLeft: {
    fontSize: 20,
    paddingLeft: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default SongListScreen;
