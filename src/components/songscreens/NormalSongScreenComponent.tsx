import React, {useRef} from 'react';
import {Button, Text} from 'react-native-paper';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {darkTheme, lightTheme} from '../../assets/styles/themes';
import {Gesangbuchlied} from '../../types/modeltypes.ts';
import AuthorListComponent from '../utils/AutherListComponent.tsx';
import CategoryListComponent from '../utils/CategoryListComponent.tsx';
import ABCjsComponent, {ABCjsComponentRef} from './ABCjsComponent';
import SongScreenSettings from './SongScreenSettings.tsx';
import {directus_url} from '../../assets/scripts/directus.tsx';
import {selectSongViewSettings} from '../../store/features/settingsSlice.ts';
import {exportStandAllein} from '../../assets/scripts/constants.ts';

type Props = {
  lied: Gesangbuchlied;
};

const NormalSongScreenComponent = ({lied}: Props) => {
  const theme = useSelector((state: RootState) =>
    state.settings.theme === 'light' ? lightTheme : darkTheme,
  );
  const displayMode = useSelector(selectSongViewSettings);
  const isABCVisible = displayMode === 'abcjs';
  const isPNGVisible = displayMode === 'png';
  const isLocalPNGVisible = displayMode === 'localpng';

  const firstPng = lied.melodieId.noten.find(noten =>
    noten.directus_files_id.filename_download.endsWith('.png'),
  );

  const abcComponentRef = useRef<ABCjsComponentRef>(null);

  const handlePlayABC = () => {
    abcComponentRef.current?.playABC();
  };

  const handlePauseABC = () => {
    abcComponentRef.current?.pauseABC();
  };

  return (
    <View style={styles.container}>
      {/*<Text variant={'titleLarge'}>{lied.titel}</Text>*/}
      {firstPng && isPNGVisible && (
        <Image
          style={styles.image}
          source={{
            uri: `${directus_url}/assets/${firstPng?.directus_files_id.id}`,
          }}
        />
      )}

      {isLocalPNGVisible && (
        <Image
          style={styles.image}
          source={require('../../assets/images/Allein_Gott_In_Der_Hoeh_Sei_Ehr.png')}
          tintColor={theme.colors.onSurface}
        />
      )}
      {isABCVisible && (
        <ABCjsComponent abcNotation={exportStandAllein} ref={abcComponentRef} />
      )}
      <ScrollView>
        <View style={styles.container}>
          {lied.textId.strophenEinzeln.map((strophe, index) => (
            <View style={styles.strophe} key={index}>
              <Text style={styles.number} variant={'bodyLarge'}>
                {index + 1}
              </Text>
              <Text style={styles.text} variant={'bodyMedium'}>
                {strophe.strophe}
              </Text>
            </View>
          ))}
          <View style={styles.infos}>
            <AuthorListComponent text={lied.textId} melodie={lied.melodieId} />
            <CategoryListComponent categories={lied.kategorieId} />
          </View>
        </View>
      </ScrollView>
      <SongScreenSettings songId={lied.id} />
      <Button onPress={handlePlayABC} icon="play" mode="outlined">
        Play
      </Button>
      <Button onPress={handlePauseABC} icon="pause" mode="outlined">
        Pause
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  strophe: {
    flexDirection: 'row',
    gap: 10,
  },
  number: {
    fontWeight: 'bold',
  },
  text: {
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: 230,
  },
  infos: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    gap: 5,
  },
});

export default NormalSongScreenComponent;
