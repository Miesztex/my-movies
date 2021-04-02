import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const ErrorPage = () => {
	return (
		<main
			style={{ minHeight: '80vh' }}
			className='error d-flex flex-column justify-content-center align-items-center'>
			<h4 className='mb-5'>I'm sorry, page not found...</h4>
			<Link to='/'>
				<Button>Go back home</Button>
			</Link>
		</main>
	);
};

export default ErrorPage;
