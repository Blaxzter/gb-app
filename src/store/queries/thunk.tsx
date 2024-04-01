import {directus, Schema, login} from '../../assets/scripts/directus.tsx';
import {createAsyncThunk} from '@reduxjs/toolkit';

const query = `
{
    gesangbuchlied(
        filter: { bewertungKleinerKreis: { bezeichner: { _eq: "Rein" } } }
        limit: 5000
    ) {
        id
        titel
        textId {
            strophenEinzeln
            autorId {
                autor_id {
                    vorname
                    nachname
                    sterbejahr
                }
            }
        }
        melodieId {
            abc_melodie
            autorId {
                autor_id {
                    vorname
                    nachname
                    sterbejahr
                }
            }
            noten {
                directus_files_id {
                    filename_download
                    id
                }
            }
        }
        kategorieId {
            kategorie_id {
                name
            }
        }
    }
}
`;

const fetchGBData = createAsyncThunk(
  'gbData/getAllData',
  async (_, {rejectWithValue}) => {
    try {
      await login();
      return await directus.query<Schema>(query);
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the fetch.
      return rejectWithValue('Failed to fetch data'); // You can customize this message or use error.message if it's more appropriate.
    }
  },
);

export default fetchGBData;
