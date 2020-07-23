import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import exchangeRatesReducer, { initialState as exchangeRatesInitialState } from '../features/exchangeRates/slice';

const initialState = {
    exchangeRates: exchangeRatesInitialState
};

const rootReducer = combineReducers({
    exchangeRates: exchangeRatesReducer
});

const persistConfig = {
    key: 'root',
    storage
};

export const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initialState,
    middleware: [thunk]
});

export const persistor = persistStore(store);