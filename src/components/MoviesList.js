import React from 'react';
import { useFilterContext } from '../context/filter_context';
import { useMoviesContext } from '../context/movies_context';

import TilesView from './TilesView';
import ListView from './ListView';

const MoviesList = () => {
	const { filtered_movies: movies, list_view } = useFilterContext();
	const { toggleFavourites, removeMovie } = useMoviesContext();
	console.log(list_view);
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
