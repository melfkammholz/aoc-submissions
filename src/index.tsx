import React from "react";
import ReactDOM from "react-dom/client";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import logger from "redux-logger";
import "./index.css";
import App from "./App";
import { currentDay, mod } from "./utils";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

type State = {
  day: number;
  part: number;
  user: number;
};

const days = currentDay();

const initialState: State = {
  day: days - 1,
  part: 0,
  user: 0,
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    day: (state, action: PayloadAction<number>) => {
      state.day = action.payload;
    },
    nextDay: (state) => {
      state.day = mod(state.day + 1, days);
    },
    prevDay: (state) => {
      state.day = mod(state.day - 1, days);
    },
    part: (state, action: PayloadAction<number>) => {
      state.part = action.payload;
    },
    switchPart: (state) => {
      state.part = (state.part + 1) % 2;
    },
    user: (state, action: PayloadAction<number>) => {
      state.user = action.payload;
    },
    nextUser: (state) => {
      state.user = mod(state.user + 1, 10);
    },
    prevUser: (state) => {
      state.user = mod(state.user - 1, 10);
    }
  },
});

const store = configureStore({
  reducer: stateSlice.reducer,
  middleware: [logger]
});


export const { day, part, user, nextDay, prevDay, switchPart, nextUser, prevUser } = stateSlice.actions;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
