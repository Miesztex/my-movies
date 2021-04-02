import React, { useState, useEffect } from 'react';
import {
	Form,
	FormGroup,
	Button,
	Input,
	Alert,
	Spinner,
	InputGroup,
	InputGroupAddon,
	Container,
} from 'reactstrap';

import { VIMEO, YOUTUBE } from '../context/variables';
import { useMoviesContext } from '../context/movies_context';

const Hero = () => {
	const { addItem, alert, setAlert, isLoading } = useMoviesContext();
	const [movieInput, setMovieInput] = useState('');
	const [provider, setProvider] = useState(YOUTUBE);

	// alert aut-fade effect
	useEffect(() => {
		let alertFadeTO;
		if (!alert.show) return;
		alertFadeTO = setTimeout(() => {
			setAlert();
		}, 5000);
		return () => {
			clearTimeout(alertFadeTO);
		};
		// eslint-disable-next-line
	}, [alert]);

	const handleSubmit = e => {
		e.preventDefault();
		addItem(movieInput, provider);
		setMovieInput('');
		setProvider(YOUTUBE);
	};

	const spinnerOrButton = isLoading => {
		return isLoading ? (
			<Spinner color='primary' className='align-self-center' />
		) : (
			<Button size='lg' type='submit' color='primary'>
				Add
			</Button>
		);
	};

	return (
		<main>
			<Container className='hero mt-5'>
				<h5 className='text-center'>
					Keep all your favourite movies in one place!
				</h5>
				<h4 className='text-uppercase mt-4 text-center'>
					Just enter the URL or ID
				</h4>
				{/* === ALERT === */}
				<Form className='input-form mt-4' onSubmit={handleSubmit}>
					<div className='input'>
						<InputGroup>
							<Input
								type='text'
								name='url'
								id='url'
								placeholder="Your movie's URL/ID"
								value={movieInput}
								onChange={e => setMovieInput(e.target.value)}
							/>
							<InputGroupAddon addonType='append'>
								<Input
									type='select'
									name='select'
									id='select'
									value={provider}
									onChange={e => setProvider(e.target.value)}>
									<option value={YOUTUBE}>YouTube</option>
									<option value={VIMEO}>Vimeo</option>
								</Input>
							</InputGroupAddon>
						</InputGroup>
						<FormGroup></FormGroup>
						<FormGroup></FormGroup>
					</div>
					<div className='alert-container' style={{ flexBasis: '80px' }}>
						<Alert
							color={alert.type}
							isOpen={alert.show}
							className='text-center'>
							{alert.msg}
						</Alert>
					</div>
					<div className='spinner-container align-self-center'>
						{spinnerOrButton(isLoading)}
					</div>
				</Form>
			</Container>
		</main>
	);
};

export default Hero;
