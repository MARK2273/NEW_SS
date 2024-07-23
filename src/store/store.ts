import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customerSlice";
import formReducer from "./formSlice";

const store = configureStore({
  reducer: {
    customers: customerReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
