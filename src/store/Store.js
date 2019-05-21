/* eslint-disable no-underscore-dangle */
/*
 *  Copyright (c) 2018.
 *  This  code file/snippet/block, including any other configuration files,
 *  is for the sole use of the Evive Health, LLC and may contain business
 *  confidential and privileged information.
 *  Any unauthorized review, use, disclosure or distribution is prohibited.
 */

import { applyMiddleware, createStore, compose, combineReducers } from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import reducer from "../reducer";

const getRootStore = (routerReducer, routerMiddleware) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  let middleware = [thunk];
  if (process.env.NODE_ENV !== "production") {
    const loggerMiddleware = createLogger({
      predicate: () => ({ logger: console, diff: true })
    });

    middleware = [...middleware, loggerMiddleware];
  }

  return createStore(
    combineReducers({
      ...reducer,
      router: routerReducer
    }),
    composeEnhancers(applyMiddleware(...middleware, routerMiddleware))
  );
};

export default getRootStore;
