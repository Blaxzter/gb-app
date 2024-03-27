import {StyleSheet, View} from 'react-native';
import React from 'react';
import {TextType, MelodieType} from '../../types/modeltypes.ts';
import IconTextListComponent from '../bits/IconTextListComponent.tsx';

type Props = {
  text: TextType;
  melodie: MelodieType;
};

const AuthorListComponent = ({text, melodie}: Props) => {
  const textAuthorNames = text?.autorId?.map(autor => {
    return autor.autor_id.vorname + ' ' + autor.autor_id.nachname;
  });

  const melodieAuthorNames = melodie?.autorId?.map(autor => {
    return autor.autor_id.vorname + ' ' + autor.autor_id.nachname;
  });

  return (
    <View style={styles.container}>
      {textAuthorNames && textAuthorNames.length > 0 && (
        <IconTextListComponent
          content={textAuthorNames}
          icon={'text'}
          gap={0}
          seperator={','}
        />
      )}

      {melodieAuthorNames && melodieAuthorNames.length > 0 && (
        <IconTextListComponent
          content={melodieAuthorNames}
          icon={'music'}
          gap={0}
          seperator={','}
        />
      )}

      {/*{text &&*/}
      {/*  text?.autorId?.map(autor => (*/}
      {/*    <View style={styles.authorRow} key={autor.autor_id.nachname}>*/}
      {/*      <Icon source="text" size={20} />*/}
      {/*      <Text variant="bodyMedium">*/}
      {/*        {autor.autor_id.vorname + ' ' + autor.autor_id.nachname}*/}
      {/*      </Text>*/}
      {/*    </View>*/}
      {/*  ))}*/}

      {/*{melodie &&*/}
      {/*  melodie?.autorId?.map(autor => (*/}
      {/*    <View style={styles.authorRow} key={autor.autor_id.nachname}>*/}
      {/*      <Icon source="music" size={20} />*/}
      {/*      <Text variant="bodyMedium">*/}
      {/*        {autor.autor_id.vorname + ' ' + autor.autor_id.nachname}*/}
      {/*      </Text>*/}
      {/*    </View>*/}
      {/*  ))}*/}
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
