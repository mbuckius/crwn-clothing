import { legacy_createStore as createStore } from "redux"
import { compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//only want to render logger in development
//.filter(Boolean) filters out anything that is false
//instead it will evaluate to an empty object if we are not in development
const middleWares = [process.env.NODE_ENV === 'development' && logger, thunk].filter(Boolean);

//allow Redux Devtools
const composeEnhancer = 
  (process.env.NODE_ENV !== 'production' && 
    window && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers);

export const persistor = persistStore(store);