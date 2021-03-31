// IMPORTS
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';

import {
	ADD_MOVIE,
	GET_MOVIE_BEGIN,
	GET_MOVIE_SUCCESS,
	GET_MOVIE_ERROR,
	ALERT_FADE,
} from './actions';

import { VIMEO, YOUTUBE } from '../context/variables';
import fetchItem from '../fetches/fetchItem';

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

	const addItem = (movieInput, provider) => {
		fetchItem(movieInput, provider).then(newItem =>
			dispatch({ type: ADD_MOVIE, payload: { newItem } })
		);
	};

	// alert auto-fade feature
	// ======== BUG ============
	// let alertTO = () => {};
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		alertTO = dispatch({ type: ALERT_FADE });
	// 	}, 5000);
	// 	return clearTimeout(alertTO);
	// }, [state.alert.show]);

	// ====== RETURN ======
	return (
		<MoviesContext.Provider value={{ ...state, addItem }}>
			{children}
		</MoviesContext.Provider>
	);
};

// CUSTOM CONTEXT HOOK
export const useGlobalContext = () => {
	return useContext(MoviesContext);
};
