import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productReducer from "./slices/product-slice";
import cartReducer from "./slices/cart-slice";
import userSlice from "./slices/user-slice";
import loader from "./slices/loader";

const persistConfig = {
  key: "flone",
  version: 1.1,
  storage,
  blacklist: ["product"],
};

export const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  user: userSlice,
  loader: loader,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
