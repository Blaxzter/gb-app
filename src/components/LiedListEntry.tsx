import {Gesangbuchlied} from '../assets/scripts/modeltypes.tsx';
import {List, Chip, Avatar, Icon} from 'react-native-paper';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

function LiedListEntry({lied, index}: {lied: Gesangbuchlied; index: number}) {
  return (
    <View style={styles.container}>
      <Avatar.Text
        size={30}
        style={styles.number}
        label={(index + 1).toString()}
      />
      <View style={{flex: 1}}>
        <Text style={styles.title}>{lied.titel}</Text>
        <View style={{flex: 1, flexDirection: 'column', flexWrap: 'nowrap'}}>
          <ScrollView horizontal style={{marginBottom: 10}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                gap: 5,
                flexWrap: 'nowrap',
              }}>
              {lied.kategorieId.map(kategorie => (
                <Chip key={kategorie.kategorie_id.name} mode={'outlined'}>
                  {kategorie.kategorie_id.name}
                </Chip>
              ))}
            </View>
          </ScrollView>
          <View style={{flex: 1, flexDirection: 'column', gap: 5}}>
            {lied.textId &&
              lied.textId?.autorId?.map(autor => (
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
                  key={autor.autor_id.nachname}>
                  <Icon source="text" size={20} color={'gray'} />
                  <Text style={{fontSize: 14}}>
                    {autor.autor_id.vorname + ' ' + autor.autor_id.nachname}
                  </Text>
                </View>
              ))}

            {lied.melodieId &&
              lied.melodieId?.autorId?.map(autor => (
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
                  key={autor.autor_id.nachname}>
                  <Icon source="music" size={20} color={'gray'} />
                  <Text key={autor.autor_id.nachname} style={{fontSize: 14}}>
                    {autor.autor_id.vorname + ' ' + autor.autor_id.nachname}
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
    marginBottom: 10,
  },
  number: {
    backgroundColor: 'lightgrey',
    marginRight: 10,
  },
});

export default LiedListEntry;
