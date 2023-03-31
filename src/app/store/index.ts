import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { productsReducer, filtersReducer } from "modules/ProductsModule";
import { cartReducer } from "modules/CartModule";

const rootReducer = combineReducers({
  productsReducer,
  filtersReducer,
  cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer"],
};

const presistedReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: presistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
