import {createSlice} from '@reduxjs/toolkit';
import {Gesangbuchlied} from '../../types/modeltypes.ts';
import fetchGBData from '../queries/thunk.tsx';

// Define a type for the slice state
interface GBDataState {
  data: Gesangbuchlied[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null; // Add this line
}

// Define the initial state using that type
const initialState: GBDataState = {
  data: [],
  loading: 'idle',
  error: null, // Add this line
} satisfies GBDataState as GBDataState;

function dataPreprocessing(songs: Gesangbuchlied[]) {
  // prepare songs
  songs.forEach(lied => {
    lied.titelLowerCase = lied.titel.toLowerCase();

    // add author names as vorname + nachname
    lied.melodieId?.autorId.forEach(autor => {
      autor.name = autor.autor_id.vorname + ' ' + autor.autor_id.nachname;
    });
    // same for text authors
    lied.textId?.autorId.forEach(autor => {
      autor.name = autor.autor_id.vorname + ' ' + autor.autor_id.nachname;
    });

    // combine text and melodie authors to a single string
    if (lied.textId) {
      lied.textId.authors_string = lied.textId.autorId
        .map(autor => autor.name)
        .join(' ');
    }
    if (lied.melodieId) {
      lied.melodieId.authors_string = lied.melodieId.autorId
        .map(autor => autor.name)
        .join(' ');
    }

    // combine all authors to a single string
    lied.authorStrings =
      (lied.textId?.authors_string && '') +
      ' ' +
      (lied.melodieId?.authors_string && '');
    lied.authorStrings = lied.authorStrings?.toLowerCase();

    // combine all categories to a single string
    lied.kategorieStrings = lied.kategorieId
      .map(kategorie => kategorie.kategorie_id.name)
      .join(' ');
    lied.kategorieStrings = lied.kategorieStrings?.toLowerCase();
  });
}

export const gbDataSlice = createSlice({
  name: 'gbData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchGBData.pending, state => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchGBData.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload.gesangbuchlied;
        dataPreprocessing(state.data);
        state.error = null;
      })
      .addCase(fetchGBData.rejected, (state, action) => {
        state.loading = 'failed';
        console.log(action);
        state.error = JSON.stringify(action) || 'An unknown error occurred.';
      });
  },
});

export default gbDataSlice.reducer;
