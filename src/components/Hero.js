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

import { HERO, VIMEO, YOUTUBE } from '../context/variables';
import { useMoviesContext } from '../context/movies_context';

const Hero = () => {
	const { addItem, alert, setAlert, isLoading } = useMoviesContext();
	const [movieInput, setMovieInput] = useState('');
	const [provider, setProvider] = useState(YOUTUBE);
	const [isDisabled, setIsDisabled] = useState(false);

	// alert aut-fade effect
	useEffect(() => {
		if (!alert.show) return;
		setTimeout(() => {
			setAlert();
			setIsDisabled(false);
		}, 3000);
		// eslint-disable-next-line
	}, [alert]);

	const handleSubmit = e => {
		e.preventDefault();
		if (!movieInput.length) return;
		addItem(movieInput, provider, HERO);
		setMovieInput('');
		setProvider(YOUTUBE);
		setIsDisabled(true);
	};

	const spinnerOrButton = isLoading => {
		return isLoading ? (
			<Spinner color='primary' className='align-self-center' />
		) : (
			<Button size='lg' type='submit' color='primary' disabled={isDisabled}>
				Add
			</Button>
		);
	};

	const fetchAlert = alert.place === HERO && (
		<Alert color={alert.type} isOpen={alert.show} className='text-center'>
			{alert.msg}
		</Alert>
	);

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
						{fetchAlert}
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
