import { combineReducers } from 'redux';
import { homeReducer } from './homeReducer';
import NavReducer from './NavReducer';
import ListingReducer from './ListingReducer';
import AuthReducer from './AuthReducer';
import AuthReducers from './authReducers';
import ReviewReducer from './ReviewReducer';
import BookingsReducer from './BookingsReducer';
const RootReducer = combineReducers({
  AuthReducers,
  AuthReducer,
  homeReducer,
  NavReducer,
  ListingReducer,
  ReviewReducer,
  BookingsReducer,
});

export default RootReducer;
