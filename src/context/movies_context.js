// IMPORTS
import React, { useContext, useEffect, useReducer } from 'react';

import {
	INIT_MOVIES,
	ADD_MOVIE,
	GET_MOVIE_BEGIN,
	GET_MOVIE_END,
	REMOVE_MOVIE,
	CLEAR_ALL,
	TOGGLE_FAV,
	SET_ALERT,
} from './actions';
import { HERO, LIST } from './variables';
import reducer from './movies_reducer';
import fetchItem from '../utils/fetchItem';
import demo_data from './demo_data';

const initLocalStorage = () => {
	let data = localStorage.getItem('movies');
	if (data) return JSON.parse(localStorage.getItem('movies'));
	else return [];
};

// ===========================
// STATE
// ===========================
const initialState = {
	movies: initLocalStorage(),
	provider: '',
	vimeo_movies: [],
	alert: { show: false, type: 'success', msg: '', place: HERO },
	isLoading: false,
};

// ===========================
// CONTEXT & PROVIDER
// ===========================
const MoviesContext = React.createContext();
export const MoviesProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// save state as local storage
	useEffect(() => {
		localStorage.setItem('movies', JSON.stringify(state.movies));
	}, [state.movies]);

	// init demo data
	useEffect(() => {
		if (state.movies.length) return;
		dispatch({ type: INIT_MOVIES, payload: demo_data });
		// eslint-disable-next-line
	}, []);

	// check if movie is already in the state
	const isPresent = item =>
		state.movies.findIndex(movie => movie.movieUrl === item.movieUrl) !== -1;

	// async fetch item function
	// supports isLoading state and resolution alert
	const addItem = (movieInput, provider, place) => {
		dispatch({ type: GET_MOVIE_BEGIN });
		fetchItem(movieInput, provider)
			.then(newItem => {
				if (isPresent(newItem)) {
					dispatch({ type: GET_MOVIE_END });
					return setAlert(
						true,
						'The movie is already in your list!',
						'warning',
						place
					);
				}
				dispatch({ type: ADD_MOVIE, payload: newItem });
				setAlert(
					true,
					'Movie successfully added to the list!',
					'success',
					place
				);
				dispatch({ type: GET_MOVIE_END });
			})
			.catch(error => {
				setAlert(true, "I'm sorry, adding the movie failed!", 'danger', place);
				dispatch({ type: GET_MOVIE_END });
			});
	};

	const setAlert = (
		show = false,
		msg = '',
		type = state.alert.type,
		place = HERO
	) => {
		dispatch({ type: SET_ALERT, payload: { show, msg, type, place } });
	};

	const addAllDemo = () => {
		demo_data.forEach(item => {
			addItem(item.movieUrl, item.provider, LIST);
		});
	};

	// handle movie card buttons affecting original state
	const removeMovie = id => {
		dispatch({ type: REMOVE_MOVIE, payload: id });
	};
	const clearMovies = () => dispatch({ type: CLEAR_ALL });
	const toggleFavourites = id => dispatch({ type: TOGGLE_FAV, payload: id });

	return (
		<MoviesContext.Provider
			value={{
				...state,
				addItem,
				setAlert,
				removeMovie,
				toggleFavourites,
				clearMovies,
				addAllDemo,
			}}>
			{children}
		</MoviesContext.Provider>
	);
};

// 	custom use-movies-context hook
export const useMoviesContext = () => {
	return useContext(MoviesContext);
};
