import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import counterReducer from "./counterSlice";
import userReducer from "./userSlice";

const store = configureStore({
  middleware: [thunk],
  reducer: {
    counter: counterReducer,
    users: userReducer,
  },
});

export default store;
