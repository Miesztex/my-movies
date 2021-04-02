import React from 'react';
import { List, Button, ListInlineItem } from 'reactstrap';
import { FaPlay, FaHeart, FaTrash } from 'react-icons/fa';

import { LIST_VIEW } from '../context/variables';
import { useMoviesContext } from '../context/movies_context';
import { useFilterContext } from '../context/filter_context';

const ActionBtns = ({ item, place }) => {
	const { id, favourite } = item;
	const { removeMovie, toggleFavourites } = useMoviesContext();
	const { updateCurrentMovie } = useFilterContext();

	return (
		<List
			type='inline'
			className={`${
				place === LIST_VIEW ? 'list-btn-container' : 'tile-btn-container'
			}`}>
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
		</List>
	);
};

export default ActionBtns;
