import React from 'react';
import {
	CardBody,
	CardTitle,
	CardImg,
	Container,
	Card,
	CardFooter,
	CardDeck,
} from 'reactstrap';
import { FaPlay } from 'react-icons/fa';

import { TILES_VIEW } from '../context/variables';
import MovieModal from './MovieModal';
import MovieInfoList from './MovieInfoList';
import MovieActionBtns from './MovieActionBtns';

const TilesView = props => {
	const { movies, updateCurrentMovie } = props;

	const movieThumbail = ({ item, imageUrl, title }) => (
		<div className='movieImg-container'>
			<div
				className='movieImg-backdrop'
				onClick={() => {
					updateCurrentMovie(item);
				}}>
				<CardImg
					top
					width='100%'
					src={imageUrl}
					alt={title}
					onClick={() => {
						updateCurrentMovie(item);
					}}
					className='movieImg-img'
				/>
				<FaPlay className='movieImg-icon' />
			</div>
		</div>
	);

	const movieTiles = movies.map(item => {
		const { id, title, imageUrl } = item;
		return (
			<Card outline color='primary' className='card mt-3' key={id}>
				<CardBody className='icon-container'>
					{movieThumbail({ item, imageUrl, title })}
					<CardTitle tag='h6' className='mt-3'>
						{title}
					</CardTitle>
					<MovieInfoList {...item} />
				</CardBody>
				<CardFooter>
					<MovieActionBtns item={item} place={TILES_VIEW} />
				</CardFooter>
			</Card>
		);
	});

	return (
		<>
			<MovieModal />
			<Container>
				<CardDeck>
					<div className='tiles-container'>{movieTiles}</div>
				</CardDeck>
			</Container>
		</>
	);
};

export default TilesView;
