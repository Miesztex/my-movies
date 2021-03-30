import React, { useState } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Row,
} from 'reactstrap';

const Hero = () => {
	const [url, setUrl] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		// dispatch
	};

	return (
		<main className='min-vh-100'>
			<div className='container d-flex flex-column align-items-center mt-5'>
				<h5 className='text-center'>
					Keep all your favorites movie in one place!
				</h5>
				<h4 className='text-uppercase mt-4 text-center'>Just enter the URL</h4>
				<Form className='align-self-stretch mt-5' onSubmit={handleSubmit}>
					<FormGroup>
						<Input
							type='text'
							name='url'
							id='url'
							placeholder="Your movie's URL"
							value={url}
							onChange={e => setUrl(e.target.value)}
						/>
					</FormGroup>
					<Button size='lg' type='submit' color='primary'>
						Add
					</Button>
				</Form>
			</div>
		</main>
	);
};

export default Hero;
