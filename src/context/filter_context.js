import React, { useEffect, useContext, useReducer } from 'react';

import {
	UPDATE_FILTERS,
	LOAD_MOVIES,
	SET_VIEW,
	UPDATE_SORT,
	FILTER_MOVIES,
	SORT_MOVIES,
} from './actions';

import { NAME_AZ, NAME_ZA, OLD, NEW } from './variables';

import reducer from './filter_reducer';
import { useMoviesContext } from './movies_context';

// ------ STATE ------
const initialState = {
	all_movies: [],
	filtered_movies: [],
	list_view: true,
	sort: NAME_AZ,
	filters: { fav: false },
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
		dispatch({ type: LOAD_MOVIES, payload: movies });
	}, [movies]);

	// --- view ---
	const setListView = e =>
		dispatch({ type: SET_VIEW, payload: e.target.value });

	// --- sort ---
	const updateSort = e => {
		dispatch({ type: UPDATE_SORT, payload: e.target.value });
	};
	useEffect(() => {
		dispatch({ type: FILTER_MOVIES });
		dispatch({ type: SORT_MOVIES });
	}, [movies, state.sort, state.filters]);

	// --- filter ---
	const updateFilters = e => {
		const { name, checked } = e.target;
		dispatch({ type: UPDATE_FILTERS, payload: { name, checked } });
	};

	// --- provider ---
	return (
		<FilterContext.Provider
			value={{
				...state,
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
