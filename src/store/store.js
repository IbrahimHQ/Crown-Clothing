import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; //logs state before dispatch, the action dispatched, and state after
import { rootReducer } from './root-reducer';

const middleWares = [logger]; //stands between dispatched action and reducer
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers); //second argument defines any additional default states for testing