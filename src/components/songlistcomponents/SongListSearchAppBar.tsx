import React, {useState} from 'react';
import {Appbar, Searchbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

interface SearchComponentProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

const SongListSearchAppBar: React.FC<SearchComponentProps> = ({
  searchQuery,
  onSearchQueryChange,
}) => {
  const navigation = useNavigation();
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  return (
    <Appbar.Header>
      {isSearchActive ? (
        <Searchbar
          placeholder="Gesangbuch Titel Eingeben..."
          autoFocus
          onIconPress={() => {
            setIsSearchActive(false);
            onSearchQueryChange(''); // Reset search query in parent component
          }}
          onChangeText={query => {
            onSearchQueryChange(query); // Update search query in parent component
          }}
          value={searchQuery}
          icon="arrow-left"
        />
      ) : (
        <>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Gesangbuchlieder" />
          <Appbar.Action
            icon="magnify"
            onPress={() => {
              setIsSearchActive(true);
              onSearchQueryChange('');
            }}
          />
          <Appbar.Action icon="filter" onPress={() => {}} />
        </>
      )}
    </Appbar.Header>
  );
};

export default SongListSearchAppBar;
