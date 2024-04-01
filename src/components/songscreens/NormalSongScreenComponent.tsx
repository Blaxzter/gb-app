import React, {useRef, useState} from 'react';
import {Button, FAB, Text} from 'react-native-paper';
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
import {
  abcExample1,
  abcHappyBirthday,
  abcWithText,
  exportStandAllein,
} from '../../assets/scripts/constants.ts';
import {
  selectAbcExample,
  selectSongViewSettings,
} from '../../hooks/useSettings.ts';

type Props = {
  lied: Gesangbuchlied;
};

const NormalSongScreenComponent = ({lied}: Props) => {
  // use state for play and stop
  const [isPlaying, setPlayStatus] = useState(false);

  const theme = useSelector((state: RootState) =>
    state.settings.theme === 'light' ? lightTheme : darkTheme,
  );
  const displayMode = useSelector((state: RootState) =>
    selectSongViewSettings(state.settings),
  );
  console.log('displayMode', displayMode);
  let isABCVisible = displayMode === 'abcjs';
  let isPNGVisible = displayMode === 'png';
  let isLocalPNGVisible = displayMode === 'localpng';

  const firstPng = lied.melodieId.noten.find(noten =>
    noten.directus_files_id.filename_download.endsWith('.png'),
  );

  const abcComponentRef = useRef<ABCjsComponentRef>(null);

  const toggleABC = () => {
    abcComponentRef.current?.toggleABC();
  };

  const handleRerender = () => {
    console.log('Rerender');
  };

  const abcExample = useSelector((state: RootState) =>
    selectAbcExample(state.settings),
  );
  console.log('abcExample', abcExample);

  let abcNotation: string | undefined;
  if (abcExample === 'orig' && lied.melodieId?.abc_melodie) {
    const defaultAbcNotation = lied.melodieId.abc_melodie?.find(
      abc => abc.is_default,
    )?.abc_notation;
    if (!defaultAbcNotation && lied.melodieId?.abc_melodie.length > 0) {
      abcNotation = lied.melodieId?.abc_melodie[0].abc_notation;
    } else {
      abcNotation = defaultAbcNotation;
    }
  }

  if (abcExample === 'orig' && abcNotation === undefined) {
    isABCVisible = false;
    isPNGVisible = true;
  }

  if (abcExample === 'abcExample1') {
    abcNotation = abcExample1;
  } else if (abcExample === 'exportStandAllein') {
    abcNotation = exportStandAllein;
    console.log('select allein');
  } else if (abcExample === 'abcWithText') {
    abcNotation = abcWithText;
  } else if (abcExample === 'abcHappyBirthday') {
    abcNotation = abcHappyBirthday;
  }

  console.log('abcNotation', abcNotation);

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
      {isABCVisible && abcNotation && (
        <ABCjsComponent
          abcNotation={abcNotation}
          ref={abcComponentRef}
          songId={lied.id}
          transposeStep={0}
        />
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
      {isABCVisible && (
        <SongScreenSettings songId={lied.id} reRender={handleRerender} />
      )}
      {isABCVisible && (
        <FAB
          icon={!isPlaying ? 'play' : 'pause'}
          onPress={() => {
            toggleABC();
            setPlayStatus(!isPlaying);
          }}
          style={styles.fab}
        />
      )}
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default NormalSongScreenComponent;
