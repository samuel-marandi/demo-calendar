import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from "react-router-redux";
import createHistory from "history/createBrowserHistory";

import getRootStore from "./store/Store";
import OpenRoutes from "./routes/OpenRoutes";

const history = createHistory();
const middleware = routerMiddleware(history);
const rootStore = getRootStore(routerReducer, middleware);

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history} basename="/calendar">
        <OpenRoutes />
      </ConnectedRouter>
    );
  }
}

render(
  <Provider store={rootStore}>
    <App />
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById("container"),
);
