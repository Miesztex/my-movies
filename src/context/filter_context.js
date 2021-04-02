import React, { useEffect, useContext, useReducer } from 'react';

import {
	LOAD_MOVIES,
	SET_VIEW,
	PAGINATE,
	SORT_MOVIES,
	FILTER_MOVIES,
	UPDATE_SORT,
	UPDATE_FILTERS,
	UPDATE_PER_PAGE,
	UPDATE_PROVIDER,
	UPDATE_PAGINATION,
	UPDATE_CURRENT_MOVIE,
	SET_MODAL,
} from './actions';
import { NAME_AZ } from './variables';
import reducer from './filter_reducer';
import { useMoviesContext } from './movies_context';

// ------ STATE ------
const initialState = {
	// movies to render
	all_movies: [],
	filtered_movies: [],
	pages: [],
	// filters & sorts
	list_view: true,
	sort: NAME_AZ,
	filters: { fav: false },
	// movie player info
	modal_open: false,
	current_movie: null,
	// pagination
	provider: '',
	pagination: 1,
	per_page: 5,
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

	// reset the list on every state change
	useEffect(() => {
		dispatch({ type: FILTER_MOVIES });
		dispatch({ type: SORT_MOVIES });
		dispatch({ type: PAGINATE });
		dispatch({ type: UPDATE_PAGINATION, payload: 'reset' });
	}, [
		movies,
		state.sort,
		state.filters,
		state.provider,
		state.pagination,
		state.per_page,
	]);

	// hadle filter
	const updateFilters = e => {
		const { name, checked } = e.target;
		dispatch({ type: UPDATE_FILTERS, payload: { name, checked } });
	};
	// handle items-per-page input
	const updatePerPage = e => {
		dispatch({ type: UPDATE_PER_PAGE, payload: e.target.value });
	};

	// handle provider param change
	const updateProvider = provider => {
		dispatch({ type: UPDATE_PROVIDER, payload: provider });
	};
	// handle pagination buttons
	const updatePagination = action => {
		dispatch({ type: UPDATE_PAGINATION, payload: action });
	};
	// handle modal
	const updateModal = () => dispatch({ type: SET_MODAL });
	const updateCurrentMovie = movieUrl => {
		dispatch({ type: UPDATE_CURRENT_MOVIE, payload: movieUrl });
		updateModal();
	};

	// --- provider ---
	return (
		<FilterContext.Provider
			value={{
				...state,
				setListView,
				updateSort,
				updateFilters,
				updatePerPage,
				updateProvider,
				updatePagination,
				updateCurrentMovie,
				updateModal,
			}}>
			{children}
		</FilterContext.Provider>
	);
};

// custom use-filter-context hook
export const useFilterContext = () => {
	return useContext(FilterContext);
};
