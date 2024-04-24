import userReducer from "@/redux/features/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appApi } from "./services/appApi";

const rootReducer = combineReducers({
  userReducer,
  [appApi.reducerPath]: appApi.reducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (defaultMiddleware) => {
      return defaultMiddleware().concat(appApi.middleware);
    },
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
