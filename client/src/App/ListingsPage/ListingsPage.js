import React, { useEffect, useState } from 'react';
import FilterBar from './FilterBar/FilterBar';
import LocationsGrid from './LocationsGrid/LocationsGrid';
import { S } from './styled';
import { connect } from 'react-redux';
import { fetchListingsFilter,fetchAllListing } from '../../store/actions/ListingActionss';

const ListingsPage = ({ fetchListingsFilter, listings, history, location,fetchAllListing }) => {
  const [mapShowing, setMapShowing] = useState(true);
  const toggleMapShowing = () => {
    setMapShowing(!mapShowing);
  };

  useEffect(() => {
    // fetchAllListing();
    // fetching listings base on url
     const search = location.search;
     fetchListingsFilter(search);
     return () => {};
  }, []);

  return (
    <S.MainContainer>
      <FilterBar
        toggleMapShowing={toggleMapShowing}
        mapShowing={mapShowing}
        history={history}
      />
      <S.DivFixedPosition />
      <LocationsGrid listings={listings} mapShowing={mapShowing} />
    </S.MainContainer>
  );
};

const mapStateToProps = (state) => ({
  listings: state.ListingReducer.listings,
});

const mapDispatchToProps = {
  fetchListingsFilter,
  fetchAllListing,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingsPage);
