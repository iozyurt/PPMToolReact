import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

// eslint-disable-next-line
export default function () {
  return configureStore({
    reducer,
  });
}
