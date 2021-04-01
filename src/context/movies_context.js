// IMPORTS
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from './movies_reducer';

import {
	ADD_MOVIE,
	GET_MOVIE_BEGIN,
	GET_MOVIE_END,
	INIT_MOVIES,
	REMOVE_MOVIE,
	TOGGLE_FAV,
	CLEAR_ALL,
	SET_ALERT,
} from './actions';

import { VIMEO, YOUTUBE } from './variables';
import fetchItem from '../fetches/fetchItem';
import demo_data from './demo_data';

// --------------- STATE ------------------
const initialState = {
	movies: [],
	provider: '',
	vimeo_movies: [],
	alert: { show: false, type: 'success', msg: '' },
	isLoading: false,
};

// --------------- CONTEXT ------------------
const MoviesContext = React.createContext();

// --------------- PROVIDER -------------
export const MoviesProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		if (state.movies.length) return;
		dispatch({ type: INIT_MOVIES, payload: demo_data });
	}, []);

	const isPresent = item =>
		state.movies.findIndex(movie => movie.movieUrl === item.movieUrl) !== -1;

	const addItem = (movieInput, provider) => {
		dispatch({ type: GET_MOVIE_BEGIN });
		fetchItem(movieInput, provider)
			.then(newItem => {
				if (isPresent(newItem)) {
					return setAlert(
						true,
						'The movie is already in your list!',
						'warning'
					);
				}
				dispatch({ type: ADD_MOVIE, payload: newItem });
				setAlert(true, 'Movie successfully added to the list!', 'success');
			})
			.catch(error => {
				setAlert(true, "I'm sorry, adding the movie failed!", 'danger');
			});
		dispatch({ type: GET_MOVIE_END });
	};

	const setAlert = (show = false, msg = '', type = 'success') => {
		dispatch({ type: SET_ALERT, payload: { show, msg, type } });
	};

	const removeMovie = id => {
		console.log(id);
		dispatch({ type: REMOVE_MOVIE, payload: id });
	};

	const clearMovies = () => dispatch({ type: CLEAR_ALL });

	const toggleFavourites = id => dispatch({ type: TOGGLE_FAV, payload: id });

	// ====== RETURN ======
	return (
		<MoviesContext.Provider
			value={{
				...state,
				addItem,
				setAlert,
				removeMovie,
				toggleFavourites,
				clearMovies,
			}}>
			{children}
		</MoviesContext.Provider>
	);
};

// CUSTOM CONTEXT HOOK
export const useMoviesContext = () => {
	return useContext(MoviesContext);
};
