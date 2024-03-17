import {StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import React from 'react';
import {TextType, MelodieType} from '../../types/modeltypes.ts';

type Props = {
  text: TextType;
  melodie: MelodieType;
};

const AuthorListComponent = ({text, melodie}: Props) => {
  return (
    <View style={styles.container}>
      {text &&
        text?.autorId?.map(autor => (
          <View style={styles.authorRow} key={autor.autor_id.nachname}>
            <Icon source="text" size={20} color={'gray'} />
            <Text variant="bodyMedium">
              {autor.autor_id.vorname + ' ' + autor.autor_id.nachname}
            </Text>
          </View>
        ))}

      {melodie &&
        melodie?.autorId?.map(autor => (
          <View style={styles.authorRow} key={autor.autor_id.nachname}>
            <Icon source="music" size={20} color={'gray'} />
            <Text variant="bodyMedium">
              {autor.autor_id.vorname + ' ' + autor.autor_id.nachname}
            </Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 5,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default AuthorListComponent;
