import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextType, MelodieType} from '../../types/modeltypes.ts';
import IconTextListComponent from '../bits/IconTextListComponent.tsx';

type Props = {
  text: TextType;
  melodie: MelodieType;
  inline?: boolean;
};

const AuthorListComponent = ({text, melodie, inline = false}: Props) => {
  const textAuthorNames = text?.autorId?.map(autor => {
    return autor.autor_id.vorname + ' ' + autor.autor_id.nachname;
  });

  const melodieAuthorNames = melodie?.autorId?.map(autor => {
    return autor.autor_id.vorname + ' ' + autor.autor_id.nachname;
  });

  return (
    <View style={[styles.container, inline && styles.inlineContainer]}>
      {textAuthorNames && textAuthorNames.length > 0 && (
        <IconTextListComponent
          content={textAuthorNames}
          icon={'text'}
          gap={0}
          seperator={','}
        />
      )}

      {/* If inline add a dot */}
      {inline && <Text> • </Text>}

      {melodieAuthorNames && melodieAuthorNames.length > 0 && (
        <IconTextListComponent
          content={melodieAuthorNames}
          icon={'music'}
          gap={0}
          seperator={','}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 5,
  },
  inlineContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default AuthorListComponent;
