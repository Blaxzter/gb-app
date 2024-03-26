import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import reducers
import gbDataReducer from './features/songsSlice.ts';
import settingsReducer from './features/settingsSlice';
import playlistReducer from './features/playlistSlice';

const rootReducer = combineReducers({
  playlists: playlistReducer,
  settings: settingsReducer,
  gbData: gbDataReducer,
  // other reducers...
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['settings', 'playlists'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
