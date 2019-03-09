import { createStore, applyMiddleware } from "redux";
import state from "../reducers";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

const defaultClient = axios.create({
  responseType: ["json"]
});

const store = createStore(
  state,
  applyMiddleware(axiosMiddleware(defaultClient)),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;