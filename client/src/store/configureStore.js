
import { createStore, applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from './reducers/RootReducer';

const configureStore = (preloadedState = {}) =>
  createStore(RootReducer, preloadedState,compose(applyMiddleware( thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default configureStore;


/* import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from './reducers/RootReducer';

const configureStore = (preloadedState = {}) =>
  createStore(RootReducer, preloadedState, applyMiddleware(logger, thunk));

export default configureStore;*/