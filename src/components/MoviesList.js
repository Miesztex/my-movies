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
		updateRoute,
	} = useFilterContext();
	const { toggleFavourites, removeMovie } = useMoviesContext();
	const { provider, pagination } = useParams();
	useEffect(() => {
		updateRoute(provider, pagination);
	}, []);
	if (movies.length < 1) {
		return <h4>Sorry, no movies found...</h4>;
	}
	if (!list_view) {
		return (
			<TilesView
				movies={movies}
				toggleFavourites={toggleFavourites}
				removeMovie={removeMovie}
			/>
		);
	}
	console.log('list');
	return (
		<ListView
			movies={movies}
			toggleFavourites={toggleFavourites}
			removeMovie={removeMovie}
		/>
	);
};

export default MoviesList;
