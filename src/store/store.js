import { legacy_createStore as createStore } from "redux"
import { compose, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

//currying a function is a function that returns another function
// example:
// const curryFunc = (a) => (b, c) => {
//   a + b - c;
// }
// const with3 = curryFunc(3);
// with3(2, 4);
//    this evaluates to 3 + 2 - 4

//this will be a sequence curry functions
const loggerMiddleware = (store) => (next) => (action) => {
  //if there is no action type
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('current state: ', store.getState());

  next(action);

  console.log('next state: ', store.getState());
}

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);