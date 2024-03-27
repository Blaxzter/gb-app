import React from 'react';
import {SectionList, View, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';

const instrumentsSections = [
  {
    title: 'Pianos',
    data: [
      {
        name: 'Acoustic Grand Piano',
        translation: 'Akustisches Flügelklavier',
        number: 0,
      },
      {
        name: 'Bright Acoustic Piano',
        translation: 'Helles Akustikklavier',
        number: 1,
      },
      {
        name: 'Electric Grand Piano',
        translation: 'Elektrisches Flügelklavier',
        number: 2,
      },
      {name: 'Honky-tonk Piano', translation: 'Honky-tonk Klavier', number: 3},
      {
        name: 'Electric Piano 1',
        translation: 'Elektrisches Klavier 1',
        number: 4,
      },
      {
        name: 'Electric Piano 2',
        translation: 'Elektrisches Klavier 2',
        number: 5,
      },
      {name: 'Harpsichord', translation: 'Cembalo', number: 6},
      {name: 'Clavi', translation: 'Clavichord', number: 7},
    ],
  },
  {
    title: 'Chromatic Percussion',
    data: [
      {name: 'Celesta', translation: 'Celesta', number: 8},
      {name: 'Glockenspiel', translation: 'Glockenspiel', number: 9},
      {name: 'Music Box', translation: 'Spieldose', number: 10},
      {name: 'Vibraphone', translation: 'Vibraphon', number: 11},
      {name: 'Marimba', translation: 'Marimba', number: 12},
      {name: 'Xylophone', translation: 'Xylophon', number: 13},
      {name: 'Tubular Bells', translation: 'Röhrenglocken', number: 14},
      {name: 'Dulcimer', translation: 'Hackbrett', number: 15},
    ],
  },
  {
    title: 'Organ',
    data: [
      {name: 'Drawbar Organ', translation: 'Zugriegelorgel', number: 16},
      {name: 'Percussive Organ', translation: 'Schlagwerkorgel', number: 17},
      {name: 'Rock Organ', translation: 'Rockorgel', number: 18},
      {name: 'Church Organ', translation: 'Kirchenorgel', number: 19},
      {name: 'Reed Organ', translation: 'Harmonium', number: 20},
      {name: 'Accordion', translation: 'Akkordeon', number: 21},
      {name: 'Harmonica', translation: 'Mundharmonika', number: 22},
      {name: 'Tango Accordion', translation: 'Tango-Akkordeon', number: 23},
    ],
  },
  {
    title: 'Guitar',
    data: [
      {
        name: 'Acoustic Guitar (nylon)',
        translation: 'Akustikgitarre (Nylon)',
        number: 24,
      },
      {
        name: 'Acoustic Guitar (steel)',
        translation: 'Akustikgitarre (Stahl)',
        number: 25,
      },
      {
        name: 'Electric Guitar (jazz)',
        translation: 'Elektrische Gitarre (Jazz)',
        number: 26,
      },
      {
        name: 'Electric Guitar (clean)',
        translation: 'Elektrische Gitarre (sauber)',
        number: 27,
      },
      {
        name: 'Electric Guitar (muted)',
        translation: 'Elektrische Gitarre (gedämpft)',
        number: 28,
      },
      {name: 'Overdriven Guitar', translation: 'Verzerrte Gitarre', number: 29},
      {
        name: 'Distortion Guitar',
        translation: 'Verzerrungsgitarre',
        number: 30,
      },
      {name: 'Guitar Harmonics', translation: 'Gitarrenharmonien', number: 31},
    ],
  },
  {
    title: 'Bass',
    data: [
      {name: 'Acoustic Bass', translation: 'Akustikbass', number: 32},
      {
        name: 'Electric Bass (finger)',
        translation: 'E-Bass (Finger)',
        number: 33,
      },
      {
        name: 'Electric Bass (pick)',
        translation: 'E-Bass (Plektrum)',
        number: 34,
      },
      {name: 'Fretless Bass', translation: 'Griffbrettloser Bass', number: 35},
      {name: 'Slap Bass 1', translation: 'Slap Bass 1', number: 36},
      {name: 'Slap Bass 2', translation: 'Slap Bass 2', number: 37},
      {name: 'Synth Bass 1', translation: 'Synth-Bass 1', number: 38},
      {name: 'Synth Bass 2', translation: 'Synth-Bass 2', number: 39},
    ],
  },
  {
    title: 'Strings',
    data: [
      {name: 'Violin', translation: 'Violine', number: 40},
      {name: 'Viola', translation: 'Bratsche', number: 41},
      {name: 'Cello', translation: 'Cello', number: 42},
      {name: 'Contrabass', translation: 'Kontrabass', number: 43},
      {name: 'Tremolo Strings', translation: 'Tremolo-Strings', number: 44},
      {name: 'Pizzicato Strings', translation: 'Pizzicato-Strings', number: 45},
      {name: 'Orchestral Harp', translation: 'Orchesterharfe', number: 46},
      {name: 'Timpani', translation: 'Pauken', number: 47},
    ],
  },
  {
    title: 'Ensemble',
    data: [
      {name: 'String Ensemble 1', translation: 'Streichensemble 1', number: 48},
      {name: 'String Ensemble 2', translation: 'Streichensemble 2', number: 49},
      {name: 'Synth Strings 1', translation: 'Synth-Strings 1', number: 50},
      {name: 'Synth Strings 2', translation: 'Synth-Strings 2', number: 51},
      {name: 'Choir Aahs', translation: 'Chor Aahs', number: 52},
      {name: 'Voice Oohs', translation: 'Stimm Oohs', number: 53},
      {name: 'Synth Voice', translation: 'Synth-Stimme', number: 54},
      {name: 'Orchestra Hit', translation: 'Orchester-Hit', number: 55},
    ],
  },
  {
    title: 'Brass',
    data: [
      {name: 'Trumpet', translation: 'Trompete', number: 56},
      {name: 'Trombone', translation: 'Posaune', number: 57},
      {name: 'Tuba', translation: 'Tuba', number: 58},
      {name: 'Muted Trumpet', translation: 'Gedämpfte Trompete', number: 59},
      {name: 'French Horn', translation: 'Waldhorn', number: 60},
      {name: 'Brass Section', translation: 'Blechbläsersektion', number: 61},
      {name: 'Synth Brass 1', translation: 'Synth-Brass 1', number: 62},
      {name: 'Synth Brass 2', translation: 'Synth-Brass 2', number: 63},
    ],
  },
  {
    title: 'Reed',
    data: [
      {name: 'Soprano Sax', translation: 'Sopransaxophon', number: 64},
      {name: 'Alto Sax', translation: 'Altsaxophon', number: 65},
      {name: 'Tenor Sax', translation: 'Tenorsaxophon', number: 66},
      {name: 'Baritone Sax', translation: 'Baritonsaxophon', number: 67},
      {name: 'Oboe', translation: 'Oboe', number: 68},
      {name: 'English Horn', translation: 'Englischhorn', number: 69},
      {name: 'Bassoon', translation: 'Fagott', number: 70},
      {name: 'Clarinet', translation: 'Klarinette', number: 71},
    ],
  },
  {
    title: 'Pipe',
    data: [
      {name: 'Piccolo', translation: 'Piccoloflöte', number: 72},
      {name: 'Flute', translation: 'Querflöte', number: 73},
      {name: 'Recorder', translation: 'Blockflöte', number: 74},
      {name: 'Pan Flute', translation: 'Panflöte', number: 75},
      {name: 'Blown Bottle', translation: 'Geblasene Flasche', number: 76},
      {name: 'Shakuhachi', translation: 'Shakuhachi', number: 77},
      {name: 'Whistle', translation: 'Pfeife', number: 78},
      {name: 'Ocarina', translation: 'Ocarina', number: 79},
    ],
  },
  {
    title: 'Synth Lead',
    data: [
      {
        name: 'Lead 1 (square)',
        translation: 'Lead 1 (quadratisch)',
        number: 80,
      },
      {name: 'Lead 2 (sawtooth)', translation: 'Lead 2 (Sägezahn)', number: 81},
      {name: 'Lead 3 (calliope)', translation: 'Lead 3 (Kalliope)', number: 82},
      {name: 'Lead 4 (chiff)', translation: 'Lead 4 (Chiffre)', number: 83},
      {name: 'Lead 5 (charang)', translation: 'Lead 5 (Charang)', number: 84},
      {name: 'Lead 6 (voice)', translation: 'Lead 6 (Stimme)', number: 85},
      {name: 'Lead 7 (fifths)', translation: 'Lead 7 (Quinten)', number: 86},
      {
        name: 'Lead 8 (bass + lead)',
        translation: 'Lead 8 (Bass + Lead)',
        number: 87,
      },
    ],
  },
  {
    title: 'Synth Pad',
    data: [
      {name: 'Pad 1 (new age)', translation: 'Pad 1 (New Age)', number: 88},
      {name: 'Pad 2 (warm)', translation: 'Pad 2 (Warm)', number: 89},
      {name: 'Pad 3 (polysynth)', translation: 'Pad 3 (Polysynth)', number: 90},
      {name: 'Pad 4 (choir)', translation: 'Pad 4 (Chor)', number: 91},
      {name: 'Pad 5 (bowed)', translation: 'Pad 5 (Bowed)', number: 92},
      {name: 'Pad 6 (metallic)', translation: 'Pad 6 (Metallisch)', number: 93},
      {name: 'Pad 7 (halo)', translation: 'Pad 7 (Halo)', number: 94},
      {name: 'Pad 8 (sweep)', translation: 'Pad 8 (Sweep)', number: 95},
    ],
  },
  {
    title: 'Sound Effects',
    data: [
      {name: 'FX 1 (rain)', translation: 'FX 1 (Regen)', number: 96},
      {name: 'FX 2 (soundtrack)', translation: 'FX 2 (Filmmusik)', number: 97},
      {name: 'FX 3 (crystal)', translation: 'FX 3 (Kristall)', number: 98},
      {name: 'FX 4 (atmosphere)', translation: 'FX 4 (Atmosphäre)', number: 99},
      {
        name: 'FX 5 (brightness)',
        translation: 'FX 5 (Helligkeit)',
        number: 100,
      },
      {name: 'FX 6 (goblins)', translation: 'FX 6 (Goblins)', number: 101},
      {name: 'FX 7 (echoes)', translation: 'FX 7 (Echoes)', number: 102},
      {name: 'FX 8 (sci-fi)', translation: 'FX 8 (Sci-Fi)', number: 103},
    ],
  },
  {
    title: 'Ethnic',
    data: [
      {name: 'Sitar', translation: 'Sitar', number: 104},
      {name: 'Banjo', translation: 'Banjo', number: 105},
      {name: 'Shamisen', translation: 'Shamisen', number: 106},
      {name: 'Koto', translation: 'Koto', number: 107},
      {name: 'Kalimba', translation: 'Kalimba', number: 108},
      {name: 'Bagpipe', translation: 'Dudelsack', number: 109},
      {name: 'Fiddle', translation: 'Geige', number: 110},
      {name: 'Shanai', translation: 'Shanai', number: 111},
    ],
  },
  {
    title: 'Percussive',
    data: [
      {name: 'Tinkle Bell', translation: 'Klingelglöckchen', number: 112},
      {name: 'Agogo', translation: 'Agogo', number: 113},
      {name: 'Steel Drums', translation: 'Steel Drums', number: 114},
      {name: 'Woodblock', translation: 'Holzblock', number: 115},
      {name: 'Taiko Drum', translation: 'Taiko-Trommel', number: 116},
      {name: 'Melodic Tom', translation: 'Melodisches Tom', number: 117},
      {name: 'Synth Drum', translation: 'Synth-Drum', number: 118},
      {name: 'Reverse Cymbal', translation: 'Umgekehrtes Becken', number: 119},
    ],
  },
  {
    title: 'Miscellaneous',
    data: [
      {
        name: 'Guitar Fret Noise',
        translation: 'Gitarrensaiten-Geräusch',
        number: 120,
      },
      {name: 'Breath Noise', translation: 'Atemgeräusch', number: 121},
      {name: 'Seashore', translation: 'Meeresufer', number: 122},
      {name: 'Bird Tweet', translation: 'Vogelzwitschern', number: 123},
      {name: 'Telephone Ring', translation: 'Telefonklingeln', number: 124},
      {name: 'Helicopter', translation: 'Hubschrauber', number: 125},
      {name: 'Applause', translation: 'Applaus', number: 126},
      {name: 'Gunshot', translation: 'Schuss', number: 127},
    ],
  },
];

type Props = {
  onInstrumentSelect: (instrument: number, name: string) => void;
};

const MidiInstrumentsList = ({onInstrumentSelect}: Props) => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={instrumentsSections}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({item}) => (
          <List.Item
            title={item.name}
            description="Item description"
            onPress={() => {
              onInstrumentSelect(item.number, item.translation);
            }}
          />
        )}
        renderSectionHeader={({section: {title}}) => (
          <List.Subheader>{title}</List.Subheader>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    padding: 2,
  },
  item: {},
});

export default MidiInstrumentsList;
