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

const Hero = () => {
	const { fetchMovie, alert } = useGlobalContext();
	const [movieId, setMovieId] = useState('');
	const [channel, setChannel] = useState('YouTube');

	const handleSubmit = e => {
		e.preventDefault();
		fetchMovie(movieId, channel);
		setMovieId('');
		setChannel('YouTube');
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
								value={movieId}
								onChange={e => setMovieId(e.target.value)}
							/>
						</FormGroup>
						<FormGroup>
							<Input
								type='select'
								name='select'
								id='exampleSelect'
								value={channel}
								onChange={e => setChannel(e.target.value)}>
								<option value='YouTube'>YouTube</option>
								<option value='Vimeo'>Vimeo</option>
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
