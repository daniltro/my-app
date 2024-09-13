import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import dataReducer from "./slices/dataSlice";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

import { Middleware } from "redux";

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  // Вывод состояния до выполнения действия
  console.log("Перед действием:", store.getState());
  console.log("Действие:", action);

  // Вызов следующего middleware или редьюсера
  const result = next(action);

  // Вывод состояния после выполнения действия
  console.log("После действия:", store.getState());

  return result;
};

export default loggerMiddleware;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
