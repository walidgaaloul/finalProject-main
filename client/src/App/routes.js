import React from 'react';
import { Route, Switch } from 'react-router';
import AuthRoute from '../shared/Auth/AuthRoute';
import NotAuthRoute from '../shared/Auth/NotAuthRoute';
import { useState, useCallback, lazy, Suspense, useEffect } from 'react';

import HomePage from './HomePage/HomePage';
import Signup from './LoginSignup/Signup';
import Login from './LoginSignup/Login';
import Password from './LoginSignup/Password';
import ListingsSearchPage from './ListingsPage/ListingsPage';
import ListingShow from './ListingShow/ListingShow';

import CardList from './ProfileSittngs/cardList';
import editProfile from './ProfileSittngs/EditApp'
import Personal from './ProfileSittngs/edit/personal_2'
import Logine from './ProfileSittngs/edit/Login'
import Payments from './ProfileSittngs/edit/Payments '

import AddListing from './AddListing/AddListing';
import PageSelectStep from './AddListing/PageSelectStep';
import AddListingDuplicate from './AddListing/AddListingDuplicate';
import PageCreateListing from './AddListing/PageCreateListing';
import BookingPage from './BookingPage/BookingPage';
import { Spinner } from 'react-bootstrap';
import UpdateProfile from './accom_after_host/UpdateProfile';

import NotFoundPage from './NotFoundPage';
import withFooter from './Layout/withFooter';
import HostPage from './BecomHost/HostPage/HostPage';

import AddonOne from './addons/AddonOne';
import AddonTwo from './addons/AddonTwo';
import AddonThree from './addons/AddonThree';
import AddonFour from './addons/AddonFour';
import AddonFive from './addons/AddonFive';
const Sitings = lazy(() => import('./ProfileSittngs/EditApp'));

const CREATE_PAGES = ['room', 'bedrooms', 'bathrooms','addresses','location','amenities',
'spaces',
'photos',
'description',
'title',
'guest_requirements',
'house_rules',
'availability',
'calendar',
'price',];

const UPDATE_PAGES = [
  ...CREATE_PAGES,
  'location',
  'amenities',
  'spaces',
  'photos',
  'description',
  'title',
  'guest_requirements',
  'house_rules',
  'availability',
  'calendar',
  'price',
];

const RegCreatePage = CREATE_PAGES.join('|');
const RegUpdatePage = UPDATE_PAGES.join('|');
const routes = (
  <Switch>
    <AuthRoute
      path={`/become-a-host/:listingId(\\d+)/:page(${RegUpdatePage})`}
      component={AddListing}
    />
    <AuthRoute exact path="/become-a-host/:listingId(\d+)" component={PageSelectStep} />
    <AuthRoute path={`/become-a-host/:page(${RegCreatePage})`} component={AddListing} />
    <AuthRoute path="/become-a-host/duplicate" component={AddListingDuplicate} />
    <AuthRoute exact path="/become-a-host" component={PageSelectStep} />
    <AuthRoute path="/bookings" exact component={BookingPage} />

    
            <AuthRoute path="/update/:id" component={UpdateProfile} />

    <Route exact path="/listings" component={ListingsSearchPage} />
    <Route exact path="/listings/:listingsId" component={ListingShow} />
    <AuthRoute exact path="/edit_profile/edit" component={editProfile} />
    <AuthRoute exact path="/edit_profile/edit/personal" component={Personal} />
    <AuthRoute exact path="/edit_profile/edit/login" component={Logine} />
    <AuthRoute exact path="/edit_profile/edit/Payments" component={Payments} />

    
    <Route path="/terms" component={AddonOne} />
					<Route path="/about" component={AddonTwo} />
					<Route path="/safty" component={AddonThree} />
					<Route path="/associates" component={AddonFour} />
					<Route path="/fighting_racism" component={AddonFive} />
          <Route component={HostPage} path="/become_host" />

    <NotAuthRoute path="/password" component={withFooter(Password)} />
    <NotAuthRoute path="/login" component={withFooter(Login)} />
    <NotAuthRoute path="/signup" component={withFooter(Signup)} />
    <Route exact path="/" component={HomePage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default routes;
