import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import { useFilterContext } from '../context/filter_context';
import { useMoviesContext } from '../context/movies_context';
import { TILES_VIEW } from '../context/variables';

import TilesView from './TilesView';
import ListView from './ListView';

const MoviesList = () => {
	const {
		filtered_movies: movies,
		updateProvider,
		pages,
		view,
		pagination,
		updateCurrentMovie,
	} = useFilterContext();

	const { toggleFavourites, removeMovie } = useMoviesContext();

	// set currently rendered page from param to state
	const { provider } = useParams();
	const varProvider = provider.toUpperCase();
	//updates provider on every param change
	useEffect(() => {
		updateProvider(varProvider);
		// eslint-disable-next-line
	}, [provider]);

	const currentPageItems = pages[pagination - 1];
	if (movies.length < 1) {
		return (
			<div className='no-movies'>
				<h4 className='text-center '>Sorry, no movies found...</h4>
			</div>
		);
	}

	// view switch
	if (view === TILES_VIEW) {
		return (
			<TilesView
				movies={currentPageItems}
				toggleFavourites={toggleFavourites}
				removeMovie={removeMovie}
				updateCurrentMovie={updateCurrentMovie}
			/>
		);
	}
	return (
		<ListView
			movies={currentPageItems}
			toggleFavourites={toggleFavourites}
			removeMovie={removeMovie}
			updateCurrentMovie={updateCurrentMovie}
		/>
	);
};

export default MoviesList;
