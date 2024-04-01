import React, {useState} from 'react';
import {Appbar, Searchbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import FilterSelectionComponent from './FilterSelectionComponent.tsx';

interface SearchComponentProps {
  amountOfSongs: number;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onCategoriesChange: (query: string) => void;
  onABCChange: (query: boolean) => void;
}

const SongListSearchAppBar: React.FC<SearchComponentProps> = ({
  amountOfSongs,
  searchQuery,
  onSearchQueryChange,
  onCategoriesChange,
  onABCChange,
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
          <Appbar.Content title={`Gesangbuchlieder (${amountOfSongs})`} />
          <Appbar.Action
            icon="magnify"
            onPress={() => {
              setIsSearchActive(true);
              onSearchQueryChange('');
            }}
          />
          <FilterSelectionComponent
            onCategoriesChange={onCategoriesChange}
            onABCChange={onABCChange}
          />
        </>
      )}
    </Appbar.Header>
  );
};

export default SongListSearchAppBar;
