import React, { useEffect, useContext, useReducer } from 'react';

import {
	UPDATE_FILTERS,
	LOAD_MOVIES,
	SET_LISTVIEW,
	SET_TILEVIEW,
	UPDATE_SORT,
	FILTER_MOVIES,
	SORT_MOVIES,
} from './actions';

import reducer from './filter_reducer';
import { useMoviesContext } from './movies_context';

// ------ STATE ------
const initialState = {
	all_movies: [],
	filtered_movies: [],
	list_view: true,
	sort: 'name-a',
	filter_fav: false,
	modal_open: false,
	current_movie: null,
};

// ------ CONTEXT ------
const FilterContext = React.createContext();

//
// ========= PROVIDER =========
export const FilterProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// fetch state.movies into filter's state
	const { movies } = useMoviesContext();
	useEffect(() => {
		console.log(movies);
		dispatch({ type: LOAD_MOVIES, payload: movies });
	}, [movies]);

	// --- view ---
	const setGridView = () => dispatch({ type: SET_TILEVIEW });
	const setListView = () => dispatch({ type: SET_LISTVIEW });

	// --- sort ---
	const updateSort = e => {
		const { value } = e.target;
		dispatch({ type: UPDATE_SORT, payload: { value } });
	};
	useEffect(() => {
		dispatch({ type: FILTER_MOVIES });
		dispatch({ type: SORT_MOVIES });
	}, [movies, state.sort, state.filters]);

	// --- filter ---
	const updateFilters = e => {};

	// --- provider ---
	return (
		<FilterContext.Provider
			value={{
				...state,
				setGridView,
				setListView,
				updateSort,
				updateFilters,
			}}>
			{children}
		</FilterContext.Provider>
	);
};
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext);
};
