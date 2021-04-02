import React from 'react';
import Moment from 'react-moment';
import { List, Button, ListInlineItem } from 'reactstrap';

import { FaPlay, FaHeart, FaTrash, FaYoutube, FaVimeoV } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';

import MovieModal from './MovieModal';
import { YOUTUBE } from '../context/variables';

const ListView = props => {
	const { movies, removeMovie, toggleFavourites, updateCurrentMovie } = props;

	const providerIcon = provider =>
		provider === YOUTUBE ? (
			<span>
				<FaYoutube className='yt-icon' />
			</span>
		) : (
			<span>
				<FaVimeoV className='vimeo-icon' />
			</span>
		);

	const moviesList = movies.map(item => {
		const { title, publishedAt, provider, id, likes, views, favourite } = item;
		return (
			<li className='list-group-item py-4' key={id}>
				<div className='list-info'>
					<h5>{title}</h5>

					{/* ======== INFO LIST ======= */}
					<List type='unstyled' className='mb-2'>
						<li>
							<span>
								<FiChevronRight />
							</span>{' '}
							published:{' '}
							<span>
								<Moment date={publishedAt} format='MMM Do YYYY' />
							</span>
						</li>
						{likes && (
							<li>
								<span>
									<FiChevronRight />
								</span>{' '}
								likes: <span>{likes}</span>
							</li>
						)}
						{views && (
							<li>
								<span>
									<FiChevronRight />
								</span>{' '}
								views: <span>{views}</span>
							</li>
						)}
					</List>
				</div>

				{/* ======== ACTION BUTTONS ======= */}
				<List type='inline' className='list-btns'>
					<ListInlineItem>
						<Button
							size='sm'
							className='movie-action-btn'
							onClick={() => {
								updateCurrentMovie(item);
							}}>
							Play{' '}
							<span>
								<FaPlay />
							</span>
						</Button>
					</ListInlineItem>
					<ListInlineItem>
						<Button
							size='sm'
							onClick={() => toggleFavourites(id)}
							className='movie-action-btn'>
							Favourite{' '}
							<span>
								{/* conditional color render */}
								<FaHeart className={`heart-icon ${favourite && 'active'}`} />
							</span>
						</Button>
					</ListInlineItem>
					<ListInlineItem>
						<Button
							size='sm'
							onClick={() => removeMovie(id)}
							className='movie-action-btn'>
							Remove{' '}
							<span>
								<FaTrash />
							</span>
						</Button>
					</ListInlineItem>
					{providerIcon(provider)}
				</List>
			</li>
		);
	});

	return (
		<>
			<MovieModal />
			<List type='unstyled' className='movie-list'>
				{moviesList}
			</List>
		</>
	);
};

export default ListView;
