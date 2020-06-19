import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import rootReducer from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const createStore = () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware({serializableCheck: false})],
  });

  const persistor = persistStore(store);
  //persistor.purge();
  return {persistor, store};
};

export default createStore();
