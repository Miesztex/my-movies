import React, { useState, useEffect } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Row,
	Alert,
	Spinner,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Container,
} from 'reactstrap';
import { useMoviesContext } from '../context/movies_context';

import { VIMEO, YOUTUBE } from '../context/variables';

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
	}, [alert]);

	const handleSubmit = e => {
		e.preventDefault();
		addItem(movieInput, provider);
		setMovieInput('');
		setProvider(YOUTUBE);
	};

	return (
		<main>
			<Container className='container d-flex flex-column align-items-center justify-content-center mt-5'>
				<h5 className='text-center'>
					Keep all your favorites movie in one place!
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
								placeholder="Your movie's URL or ID"
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
					{isLoading ? (
						<Spinner color='primary' className='align-self-center' />
					) : (
						<Button
							size='lg'
							type='submit'
							color='primary'
							className='align-self-center'>
							Add
						</Button>
					)}
				</Form>
			</Container>
		</main>
	);
};

export default Hero;
