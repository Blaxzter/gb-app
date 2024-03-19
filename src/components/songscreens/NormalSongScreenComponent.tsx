import React from 'react';
import {Text} from 'react-native-paper';
import {Image, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {darkTheme, lightTheme} from '../../assets/styles/themes';
import {Gesangbuchlied} from '../../types/modeltypes.ts';
import AuthorListComponent from '../utils/AutherListComponent.tsx';
import CategoryScroller from '../utils/CategoryScroller.tsx';

type Props = {
  lied: Gesangbuchlied;
};

const NormalSongScreenComponent = ({lied}: Props) => {
  const theme = useSelector((state: RootState) =>
    state.settings.theme === 'light' ? lightTheme : darkTheme,
  );

  const firstPng = lied.melodieId.noten.find(noten =>
    noten.directus_files_id.filename_download.endsWith('.png'),
  );
  console.log(firstPng);
  return (
    <View style={styles.container}>
      {/*<Text variant={'titleLarge'}>{lied.titel}</Text>*/}
      {/*{firstPng && (*/}
      {/*  <Image*/}
      {/*    style={styles.image}*/}
      {/*    source={{*/}
      {/*      uri: `${directus_url}/assets/${firstPng?.directus_files_id.id}`,*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
      <Image
        style={styles.image}
        source={require('../../assets/images/Allein_Gott_In_Der_Hoeh_Sei_Ehr.png')}
        tintColor={theme.colors.onSurface}
      />
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
      <CategoryScroller categories={lied.kategorieId} />
      <AuthorListComponent text={lied.textId} melodie={lied.melodieId} />
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
});

export default NormalSongScreenComponent;
