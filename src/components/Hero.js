import React, { useState } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Row,
	Alert,
} from 'reactstrap';
import { useGlobalContext } from '../context/context';

import { VIMEO, YOUTUBE } from '../context/variables';

const Hero = () => {
	const { addItem, alert } = useGlobalContext();
	const [movieInput, setMovieInput] = useState('');
	const [provider, setProvider] = useState(YOUTUBE);

	const handleSubmit = e => {
		e.preventDefault();
		addItem(movieInput, provider);
		setMovieInput('');
		setProvider(YOUTUBE);
	};

	return (
		<main>
			<div className='container d-flex flex-column align-items-center justify-content-center mt-5'>
				<h5 className='text-center'>
					Keep all your favorites movie in one place!
				</h5>
				<h4 className='text-uppercase mt-4 text-center'>Just enter the URL</h4>
				{alert.show && <Alert color={alert.type}>{alert.msg}</Alert>}
				<Form className='align-self-stretch mt-5' onSubmit={handleSubmit}>
					<div className='input'>
						<FormGroup>
							<Input
								type='text'
								name='url'
								id='url'
								placeholder="Your movie's URL"
								value={movieInput}
								onChange={e => setMovieInput(e.target.value)}
							/>
						</FormGroup>
						<FormGroup>
							<Input
								type='select'
								name='select'
								id='select'
								value={provider}
								onChange={e => setProvider(e.target.value)}>
								<option value={YOUTUBE}>YouTube</option>
								<option value={VIMEO}>Vimeo</option>
							</Input>
						</FormGroup>
					</div>
					<hr />
					<Button size='lg' type='submit' color='primary'>
						Add
					</Button>
				</Form>
			</div>
		</main>
	);
};

export default Hero;
