import * as types from '../constants/actionTypes';
import axios from 'axios';

export const startReviewLoading = () => ({
  type: types.START_REVIEW_LOADING,
});

export const receiveReviews = (reviews) => ({
  type: types.RECEIVE_REVIEWS,
  payload: {
    reviews,
  },
});

export const receiveReviewsErrors = (error) => ({
  type: types.RECEIVE_REVIEWS_ERRORS,
  payload: {
    error,
  },
});

export const createReview = (listingId, body, ratings, bookingId) => {
//   const userId = localStorage.getItem('userId');
  // check sleeping arrangement == bedrooms
  return async (dispatch,useSelector) => {
    let auth = useSelector((state) => state.auth);
    const  userId = auth.AuthReducer.userId
    dispatch(startReviewLoading());
    try {
      let res = await axios.post(`/review/`, {
        userId: userId,
        listingId,
        bookingId,
        body,
        ratings,
      });
      const { data } = res;
      console.log(res);
      if (res.status === 202) {
        dispatch(receiveReviewsErrors(data.message));
        return {
          success: false,
          message: data.message,
        };
      } else {
        dispatch(fetchReviews(listingId));
      }
      return {
        success: true,
        message: data.id,
      };
    } catch (error) {}
  };
};

export const fetchReviews = (listingId) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`/review/${listingId}/reviews`);
      const reviews = res.data.items;
      const resReviews = reviews.map((review) => {
        review.guest_name = 'Collette';
        review.guest_photo = 'https://s3-us-west-1.amazonaws.com/guestpics/50BgQSS.jpg';
        review.guest_link = 'https://s3-us-west-1.amazonaws.com/guestpics/50BgQSS.jpg';
        return review;
      });
      dispatch(receiveReviews(resReviews));
    } catch (error) {}
  };
};
