import React from 'react';
import { List } from 'reactstrap';

import MovieModal from './MovieModal';
import MovieActionBtns from './MovieActionBtns';
import MovieInfoList from './MovieInfoList';
import { LIST_VIEW } from '../context/variables';

const ListView = props => {
	const { movies } = props;

	const moviesList = movies.map(item => {
		const { title, id } = item;
		return (
			<li className='list-group-item py-4' key={id}>
				<div className='list-info'>
					<h5>{title}</h5>
					<MovieInfoList {...item} />
				</div>
				<MovieActionBtns item={item} place={LIST_VIEW} />
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
