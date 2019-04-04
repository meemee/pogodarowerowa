import { createStore, applyMiddleware, compose } from "redux";
import state from "../reducers";
import axios from "axios";
import { multiClientMiddleware } from "redux-axios-middleware";


const clients = {
  default: {
    client: axios.create({
       baseURL: '',
       responseType: 'json'
    })
  },
  ogApi: {
    client: axios.create({
       responseType: 'json'
    })
  },
  googleMaps: {
    client: axios.create({
        baseURL:'https://maps.googleapis.com/maps/api',
        responseType: 'json'
    })
  }
}

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

let middlewares = [
  multiClientMiddleware(clients)
];

const store = createStore(
  state,
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
);

export default store;