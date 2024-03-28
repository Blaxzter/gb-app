// import {createIconSet} from 'react-native-vector-icons';
// const glyphMap = {
//   'icon-instrument-percussive': 0xe800,
//   'icon-instrument-misc': '∆',
//   'icon-instrument-pad': '∆',
//   'icon-instrument-sax': '∆',
//   'icon-instrument-fx': '∆',
//   'icon-instrument-flute': '∆',
//   'icon-instrument-bagpipe': '∆',
//   'icon-instrument-organ': '∆',
//   'icon-instrument-bass-guitar': '∆',
//   'icon-instrument-guitar': '∆',
//   'icon-instrument-violin': '∆',
//   'icon-instrument-trumpet': '∆',
//   'icon-instrument-synth': '∆',
//   'icon-instrument-piano': '∆',
//   'icon-instrument-xylophone': '∆',
//   'icon-instrument-orchestra': '∆',
// };
// export const InstrumentIcon = createIconSet(
//   glyphMap,
//   'instrument-icons',
//   '/android_asset/instrument-icons.ttf',
// );

import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from './config.json';
export const InstrumentIcon = createIconSetFromFontello(fontelloConfig);
