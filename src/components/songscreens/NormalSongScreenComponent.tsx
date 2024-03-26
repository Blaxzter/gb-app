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

type Props = {
  lied: Gesangbuchlied;
};

const NormalSongScreenComponent = ({lied}: Props) => {
  const theme = useSelector((state: RootState) =>
    state.settings.theme === 'light' ? lightTheme : darkTheme,
  );

  // const firstPng = lied.melodieId.noten.find(noten =>
  //   noten.directus_files_id.filename_download.endsWith('.png'),
  // );

  const abcComponentRef = useRef<ABCjsComponentRef>(null);

  const handlePlayABC = () => {
    abcComponentRef.current?.playABC();
  };

  const handlePauseABC = () => {
    abcComponentRef.current?.pauseABC();
  };

  // const abcNotation =
  //   'X: 1\\n' +
  //   'M: 4/4\\n' +
  //   'L: 1/8\\n' +
  //   'R: reel\\n' +
  //   'K: Em\\n' +
  //   'V: Melody\\n' +
  //   '|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|\\n' +
  //   'EBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|\\n' +
  //   '|:gf|eB B2 efge|eB B2 gedB|A2 FA DAFA|A2 FA defg|\\n' +
  //   'eB B2 eBgB|eB B2 defg|afe^c dBAF|DEFD E2:|\\n' +
  //   '    ';

  const abcNotation =
    'X:1\\n' +
    'T:Allein Gott In Der Hoeh Sei Ehr\\n' +
    'L:1/4\\n' +
    'Q:1/4=150\\n' +
    'M:3/4\\n' +
    'K:F\\n' +
    'V:1\\n' +
    '|: F | A2 B | c2 B | A2 G | A2 A |\\n' +
    'w: Bis hier-her hat mich Gott ge-bracht durch\\n' +
    'w: bis hier-her hat er Tag und Nacht be-\\n' +
    'A2 G | (B A) G | (F2 G) | F2 :| F | F2 G | \\n' +
    'w: sei-ne gro-ße Gü-te; _ _ Bis hier her\\n' +
    'w: wah-rt Herz und Ge- müte.\\n' +
    'B2 A | G2 ^F | G2 G | A2 B | c2 B | \\n' +
    'w: hat er mich ge- leit’, bis hier-her hat er \\n' +
    'A2 G | A2 F | G2 B | A2 G | (F2 E) | F2 |]\\n' +
    'w: mich er-freut, bis hier-her mir ge-hol-fen.\\n';

  // const abcNotation =
  //   'X:1\\n' +
  //   "T: Cooley's\\n" +
  //   'M: 4/4\\n' +
  //   'L: 1/8\\n' +
  //   'R: reel\\n' +
  //   'K: G\\n' +
  //   '|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|';

  // const abcNotation =
  //   'X:3\\n' +
  //   'T:Happy Birthday\\n' +
  //   'T:for String Quartet\\n' +
  //   'M:3/4\\n' +
  //   'Q:1/4=90\\n' +
  //   'L:1/4\\n' +
  //   'K:C\\n' +
  //   'V:1 name=Violin\\n' +
  //   'G/2>G/2| A G c| B2 |\\n' +
  //   'w: Hap-py birth-day to you\\n' +
  //   'V:2 name=Violin\\n' +
  //   'E| F G2| G2|\\n' +
  //   'V:3 name=Viola clef=alto\\n' +
  //   'C| B,2 E| D2|\\n' +
  //   'V:4 name=Cello clef=bass\\n' +
  //   'C,| F, E,/2-D,/2 C,| G, G,,|';

  // const abcNotation =
  //   'X:1\\n' +
  //   'T:Ich Stand Allein Mit Meiner Last\\n' +
  //   'L:1/4\\n' +
  //   'Q:1/4=120\\n' +
  //   'M:4/4\\n' +
  //   'K:F\\n' +
  //   'V:1\\n' +
  //   ' c | c3/2 B/ A G | F3/2 C/ C C | F F A/G/ F/G/ |$[K:C] E3 C | C A G F | F B A G | F C/F/ G G | %8\\n' +
  //   ' F3 |] %9\\n';

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
      {/*<Image*/}
      {/*  style={styles.image}*/}
      {/*  source={require('../../assets/images/Allein_Gott_In_Der_Hoeh_Sei_Ehr.png')}*/}
      {/*  tintColor={theme.colors.onSurface}*/}
      {/*/>*/}
      <ABCjsComponent abcNotation={abcNotation} ref={abcComponentRef} />
      {/*// @ts-ignore*/}
      {/*<Button onPress={() => abcComponentRef?.current.playABC()}>Play</Button>*/}
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
      <Button onPress={handlePlayABC}>Play</Button>
      <Button onPress={handlePauseABC}>Pause</Button>
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
