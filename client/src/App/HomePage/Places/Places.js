import React, { Fragment } from 'react';
import classes from './Places.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Place from './Place/Place';

// import placesData from '../../Data/places.json';

import image1 from '../../../assets/home_images/places/tunis2.jpg';
import image2 from '../../../assets/home_images/places/hamamet.jpg';
import image3 from '../../../assets/home_images/places/marsa.jpg';
import image4 from '../../../assets/home_images/places/sousse1.jpg';
import image5 from '../../../assets/home_images/places/hergla1.jpg';
import image6 from '../../../assets/home_images/places/korba1.jpg';
import image7 from '../../../assets/home_images/places/imageUrl6.jpg';
import image8 from '../../../assets/home_images/places/mahdia1.jpg';

const placesData = [
	{
		_id: 1,
		imageUrl: image1,
		title: 'Tunis',
		arriveTime: 2.5,
	},
	{
		_id: 2,
		imageUrl: image2,
		title: 'Hammamet',
		arriveTime: 7,
	},
	{
		_id: 3,
		imageUrl: image3,
		title: 'Marsa',
		arriveTime: 6.5,
	},
	{
		_id: 4,
		imageUrl: image4,
		title: 'Sousse',
		arriveTime: 3.5,
	},
	{
		_id: 5,
		imageUrl: image5,
		title: 'Hergla',
		arriveTime: 2.5,
	},
	{
		_id: 6,
		imageUrl: image6,
		title: 'Korba',
		arriveTime: 4,
	},
	{
		_id: 7,
		imageUrl: image7,
		title: 'Klibia',
		arriveTime: 6,
	},
	{
		_id: 8,
		imageUrl: image8,
		title: 'Mahdia',
		arriveTime: 6.5,
	},
];

const Places = () => {
	return (
		<section className='py-5'>
			<div className='Custom__Container'>
			<div className='container-fluid'>
			<h1 className='mb-4'>Explore nearby</h1>
			</div>
				<div className='row mx-0'>
					{placesData.map(place => {
						return (
							<Fragment key={place._id}>
								<div className='col-12 col-sm-6 col-md-4 col-lg-3'>
									<Place
										imageUrl={place.imageUrl}
										title={place.title}
										arriveTime={place.arriveTime}
									/>
								</div>
							</Fragment>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Places;
