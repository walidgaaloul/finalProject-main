import React, { Fragment } from 'react';

import Banner from '../Home/Banner/Banner';
import Covid from '../Home/Covid/Covid';
import LiveAnyWhere from '../Home/LiveAnyWhere/LiveAnyWhere';
import Places from '../Home/Places/Places';
import Header from './Header/Header'
import Footer  from "./Footer/Footer";
import Experiences from '../Home/Experiences/Experiences';
import Gift from '../Home/Gift/Gift';
import JionUs from '../Home/JionUs/JionUs';
import NavbarDown from '../Home/Navbar/NavbarDown';

const Home = (props) => {
	const onSearch =(location , guests , start , end)=>{
		props.onSearch(location, guests ,start ,end)
	}

	return (
		<Fragment>
			<Covid />
			<Header onSearch={onSearch}/>
			<Banner />
			<Places />
			<LiveAnyWhere />
			<Experiences />
			<Gift />
			<JionUs />
			<Footer />
			<NavbarDown/>
		</Fragment>
	);
};

export default Home;
