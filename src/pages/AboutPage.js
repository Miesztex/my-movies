import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { FaInfoCircle } from 'react-icons/fa';

const AboutPage = () => {
	return (
		<main className='about container'>
			<h4 className='mb-5'>
				App MyMovies allows you to keep all your favourite movies in{' '}
				<span>one place</span>.
			</h4>
			<h6 className='mb-3'>
				All you need to do is to enter your movie's basic data: URL or ID.
			</h6>
			<h6 className='mb-3'>
				<span>
					<FaInfoCircle className='info-icon' />
				</span>{' '}
				Please note, that at this moment the url has to be finished by an ID,
				with any following strings the app won't work.
			</h6>
			<h6 className='mb-5'>
				<span>
					<FaInfoCircle className='info-icon' />
				</span>{' '}
				At start, the app displays demo data, which can be removed. If you
				refresh with empty list, demo data will be restored. If you remove all
				your data, the "Add demo" button will be available.
			</h6>
			<Link className='align-self-center' to='/'>
				<Button color='primary' size='lg'>
					Start
				</Button>
			</Link>
		</main>
	);
};

export default AboutPage;
