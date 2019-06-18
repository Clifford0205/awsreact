import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import news from "./store/reducers/newsReducer";
import loading from "./store/reducers/loadingReducer";
import fullArticle from "./store/reducers/fullArticleReducer";
import cart from "./store/reducers/cartReducer";
//import loginStatus from './store/reducers/loginReducer';
import products from "./store/reducers/productsReducer";
import modal from "./store/reducers/modalReducer";
import verify from "./store/reducers/verifyReducer";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
//r_reducers----------------
import routeReducer from "./containers/Route/reducers/routeReducer";
import routeSingleReducer from "./containers/Route/reducers/routeSingleReducer";
import routeCountryChange from "./containers/Route/reducers/routeCountryChange";
import routeAddNewLocation from "./containers/Route/reducers/routeAddNewLocation";
import routeFormCheck from "./containers/Route/reducers/routeFormCheck";
import alertReducer from "./containers/Route/reducers/alertReducer";
import likeRouteReducer from "./containers/Route/reducers/likeRouteReducer";
//import userStatus from './containers/Route/reducers/userStatus';

const rootReducer = combineReducers({
  loading,
  news,
  fullArticle,
  cart,
  //loginStatus,
  products,
  modal,
  verify,
  routeReducer,
  routeSingleReducer,
  routeCountryChange,
  routeAddNewLocation,
  routeFormCheck,
  alertReducer,
  likeRouteReducer
  //userStatus
});

// function configureStore(preloadedState) {
//   return createStore(
//     rootReducer,
//     preloadedState,
//     applyMiddleware(thunkMiddleware)
//   );
// }

// const store = configureStore();

// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
const store = createStore(
  rootReducer,
   compose(
    applyMiddleware(thunkMiddleware),
    //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
 );

const token = localStorage.getItem("token");
if (token) {
  axios
    .get("http://18.139.60.49:5000/get_user", {
      params: {
        token: token
      }
    })
    .then(res =>
      store.dispatch({
        type: "ALREADY_AUTH",
        user: res.data
      })
    );
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
if (module.hot) {
  module.hot.accept();
}
