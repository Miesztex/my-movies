import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { useFilterContext } from '../context/filter_context';
import { useMoviesContext } from '../context/movies_context';

import TilesView from './TilesView';
import ListView from './ListView';

const MoviesList = () => {
	const {
		filtered_movies: movies,
		list_view,
		updateProvider,
		pages,
		pagination,
	} = useFilterContext();

	const { toggleFavourites, removeMovie } = useMoviesContext();

	// set currently rendered page from param to state
	const { provider } = useParams();

	useEffect(() => {
		updateProvider(provider);
	}, [provider]);

	const currentPageItems = pages[pagination - 1];
	if (movies.length < 1) {
		return <h4 className='text-center'>Sorry, no movies found...</h4>;
	}
	if (!list_view) {
		return (
			<TilesView
				movies={currentPageItems}
				toggleFavourites={toggleFavourites}
				removeMovie={removeMovie}
			/>
		);
	}
	return (
		<ListView
			movies={currentPageItems}
			toggleFavourites={toggleFavourites}
			removeMovie={removeMovie}
		/>
	);
};

export default MoviesList;
