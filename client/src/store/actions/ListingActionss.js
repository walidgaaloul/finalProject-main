import * as types from '../constants/actionTypes';
import moment from 'moment';
//import setToken from '../../App/setToken';
import axios from 'axios';


const startListingLoading = () => ({
  type: types.START_LISTING_LOADING,
});

const clearListingLoading = () => ({
  type: types.CLEAR_LISTING_LOADING,
});

const receiveListingErrors = () => ({
  type: types.START_LISTING_LOADING,
});

export const receiveListings = (listings) => ({
  type: types.RECEIVE_LISTINGS,
  payload: {
    listings,
  },
});

export const receiveListing = (listing) => {
  const formatedListing = {
    ...listing,
    center: { lat: '40.785091', lng: '73.968285' },
  };
  return {
    type: types.RECEIVE_LISTING,
    payload: {
      listing: formatedListing,
    },
  };
};

export const receiveListingSleepArgms = (sleeping_arrangements) => ({
  type: types.RECEIVE_LISTING_SLEEP_ARGMS,
  payload: {
    sleeping_arrangements,
  },
});
export const receiveCalendar = (calendar) => ({
  type: types.RECEIVE_CALENDAR,
  payload: {
    calendar,
  },
});


export const createListing = (listing) => {
  // TODO: RECHECK THIS METHOD

  //const userId = localStorage.getItem('userId');
  // check sleeping arrangement == bedrooms

  return async (dispatch, useSelector) => {
    let state = useSelector((state) => state);
    const isCreated = state.ListingReducer.isCreated;
    const userId = state.AuthReducers.user._id;

    console.log('isCreatedfalse', isCreated)



    console.log('userId', userId)
    console.log('isCreated', isCreated)
    try {

      let res = await axios.post(`/listings`, {
        ...listing,
        owner: userId,
      });
      /*   let bedsInRom={...listing.sleeping_arrangements,listingId:res.data._id}
 
         let res2 = await axios.post('/listings/sleepArgs', {bedsInRom});*/




      dispatch(fetchListing(res.data._id));

      return res.data._id;


    } catch (error) { }



  };



};
/*
export const createListing = (listing) => {
  // TODO: RECHECK THIS METHOD
//  setToken();

  //const userId = localStorage.getItem('userId');
  

  // check sleeping arrangement == bedrooms
  return async (dispatch,useSelector) => {
    const userId = useSelector((state) => state.AuthReducers.user._id);
    try {
      let res = await axios.post(`/listings`, {
        host_id: userId,
        listing_title,
        //room_type,
guests,
num_bedrooms,
num_beds,
num_bathrooms,
price,
min_nights,
max_nights,
summary,
the_space,
the_availability,
neighborhood,
the_getting_around,
lat,
lng,
//city,
//street,
//country,
state,
zip_code,
spaces,
amenities,
house_rules,
is_publish,
completed,
owner,
review,
      });
      const { data } = res;
      dispatch(fetchListing(data.id));
      return data.id;
    } catch (error) {}
  };
};
*/
const preProcessingListing = (listing) => {
  let processedListing = { ...listing };

  // check sleeping arrangement == bedrooms
  const num_bedrooms = Number(processedListing.num_bedrooms);
  processedListing = {
    ...processedListing,
    num_bedrooms,
    sleeping_arrangements: processedListing.sleeping_arrangements.slice(
      0,
      num_bedrooms + 1
    ),
    // processing calendar moment
    // only blocked day
    calendar: processedListing.calendar.map((day) => ({
      date_type: 'blocked',
      date: moment(day).format('DD/MM/YYYY'),
    })),
  };

  return processedListing;
};





export const updateListing = (prevlisting) => {
  const listing = preProcessingListing(prevlisting);
  return async (dispatch, useSelector) => {
    let state = useSelector((state) => state);
    const userId = state.AuthReducers.user._id;
    try {
      let res = await axios.put(`/listings/listing/${listing._id}`, {
        ...listing
      });

      for (let photo of listing.photos) {
        if (photo.hasOwnProperty('caption')) {
      

          //await axios.put(`/listings/${listing.id}/images`, photo);
        }
      }
   

      // FIXME IF U CAN
      // let resCalendar = await axios.post(`/listings/${listing.id}/dates`, {
      let dates = prevlisting.calendar
      let listingId=prevlisting._id
      const resCalendar=[]
      if (dates) {
         dates = dates.map(date =>{moment(date).format('DD/MM/YYYY')
         let res = axios.post(`/listings/dates`, { date,listingId});
         resCalendar=[...resCalendar, res.data.date]
        
        });
        console.log('resCalendar',resCalendar)
        dispatch(receiveListing(res.data));
      }
      // dispatch(fetchOtherListingInfo(res.data.id));
    } catch (error) { }
  };
};

export const receivePhotos = (photos) => ({
  type: types.RECEIVE_LISTING_PHOTOS,
  payload: {
    photos,
  },
});

export const removeListingPhoto = (listingID, image) => {
  return async (dispatch) => {
    try {
      let res = await axios.delete(`/listings/${listingID}/images`, {
        data: image,
      });
      if (res.status === 204) {
        return {
          success: true,
          message: 'Success',
        };
      } else {
        return {
          success: true,
          message: 'Something wrong.',
        };
      }
    } catch (error) {
      dispatch(receiveListingErrors(error.message));
    }
  };
};

export const uploadPhoto = (image) => {
  return async (dispatch, useSelector) => {
    let state = useSelector((state) => state);
    const listingId = state.ListingReducer.listing._id;

    let formData = new FormData()

    formData.append("files", image)
    formData.append("listingId", listingId)
    dispatch(startListingLoading());
    try {
      let res = await axios.post(`/listings/images`, formData);
      dispatch(clearListingLoading());


      return res.data;
    } catch (error) {
      dispatch(receiveListingErrors(error.message));
    }
  };
};
export const changePublishListing = (is_publish) => ({
  type: types.CHANGE_PUBLISH_LISTING,
  payload: {
    is_publish,
  },
});

export const publishListing = (id, isPublish) => {
  return async (dispatch) => {
    let res = await axios.put(`/listings/${id}/publish`, { is_publish: isPublish });
    dispatch(changePublishListing(isPublish));
  };
};

export const fetchListingsFilter = (search) => {
  console.log(search);
  return async (dispatch) => {
    let res = await axios.get(`/listings/search${search}`);
    console.log('res',res)
    const listings = res.data;
    console.log('success',listings)

    for (let listing of listings) {
      let resPhoto = await axios.get(`/listings/${listing._id}/images`);
      listing.photos = resPhoto.data;
      let resReview = await axios.get(`/listings/${listing._id}/reviews`);
      listing.reviews = resReview.data;
    }
    dispatch(receiveListings(listings));
  };
};


///////////////////////

export const fetchAllListing = () => {
  return async (dispatch) => {
    let res = await axios.get(`/listings/list`);
    const listings = res.data;
    
console.log(listings);
    for (let listing of listings) {
      let resPhoto = await axios.get(`/listings/${listing._id}/images`);
      listing.photos = resPhoto.data.items;
   let resReview = await axios.get(`/listings/${listing._id}/reviews`);
       listing.reviews = resReview.data.items;
    }
    dispatch(receiveListings(listings));
  };
};

export const fetchListingByUser = () => {

  return async (dispatch) => {

    const userId = localStorage.getItem('userId');
    let res = await axios.get(`/listings/users/${userId}/listings`);
    console.log('res.data', res.data)
    let items = res.data;
    // const {data: { items },} = res.data;
    console.log('res.datacccc', items)
    for (let listing of items) {
      let resPhoto = await axios.get(`/listings/${listing._id}/images`);
      listing.photos = resPhoto.data;
      console.log('listing.photos', resPhoto.data)

    }
    dispatch(receiveListings(items));
  };
};

export const fetchListingSleepArgms = (listingId) => {
  return async (dispatch) => {
    try {
      //let res = await axios.get(`/listings/${listingId}/sleep_argms`);
      let res = await axios.get(`/listings/${listingId}`);
      let item = res.data.sleeping_arrangements
      dispatch(receiveListingSleepArgms(item));
    } catch (error) { }
  };
};

export const fetchCalendar = (listingId) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`/listings/${listingId}/dates`);
      console.log('res',res.data)
      // date to moment
      const calendar = res.data.items.map((item) => moment(item.date, 'DD/MM/YYYY'));
      dispatch(receiveCalendar(calendar));
    } catch (error) { }
  };
};

export const fetchPhoto = (listingId) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`/listings/${listingId}/images`);
      // date to moment
      const photos = res.data;
      dispatch(receivePhotos(photos));
    } catch (error) { }
  };
};

export const fetchOtherListingInfo = (listingId) => {
  return (dispatch) => {
    dispatch(fetchListingSleepArgms(listingId));
    dispatch(fetchCalendar(listingId));
    dispatch(fetchPhoto(listingId));
  };
};

export const fetchListing = (listingId) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`/listings/${listingId}`);
      const { data } = res;
      dispatch(receiveListing(data));
      dispatch(fetchOtherListingInfo(listingId));
      return data.id;
    } catch (error) {
      dispatch(resetListing());
    }
  };
};

export const resetListing = () => ({
  type: types.RESET_LISTING,
});

