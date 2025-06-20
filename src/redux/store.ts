import { configureStore } from "@reduxjs/toolkit";
// import { dashboardApi } from "./slices/dashboardSlice";
import { persistReducer, persistStore } from "redux-persist";
// ...

import storage from "redux-persist/lib/storage";
// defaults to localStorage for web

import rootReducer from "./reducers";

const persistConfig = {
  key: "root-borrower",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }).concat(dashboardApi.middleware),
});

// setupListeners(store.dispatch);

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
