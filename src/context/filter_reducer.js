import moment from 'moment';

import {
	LOAD_MOVIES,
	FILTER_MOVIES,
	SET_VIEW,
	SORT_MOVIES,
	PAGINATE,
	UPDATE_SORT,
	UPDATE_FILTERS,
	UPDATE_PER_PAGE,
	UPDATE_PROVIDER,
	UPDATE_PAGINATION,
	UPDATE_CURRENT_MOVIE,
	SET_MODAL,
} from './actions';
import {
	NAME_AZ,
	NAME_ZA,
	OLD,
	NEW,
	NEXT_PAGE,
	PREV_PAGE,
	ALL,
} from './variables';
import { paginate } from '../utils/paginate';

const filter_reducer = (state, action) => {
	switch (action.type) {
		case LOAD_MOVIES:
			return {
				...state,
				all_movies: [...action.payload],
				filtered_movies: [...action.payload],
			};
		case SET_VIEW:
			return { ...state, view: action.payload };
		// ================================
		// SORT
		// ===============================
		case UPDATE_SORT:
			return { ...state, sort: action.payload };
		case SORT_MOVIES:
			const { sort, filtered_movies } = state;
			let sortedMovies = [...filtered_movies];
			if (sort === OLD) {
				sortedMovies = sortedMovies.sort((a, b) =>
					moment(a.publishedAt).diff(b.publishedAt)
				);
			}
			if (sort === NEW) {
				sortedMovies = sortedMovies.sort((a, b) =>
					moment(b.publishedAt).diff(a.publishedAt)
				);
			}
			if (sort === NAME_AZ) {
				sortedMovies = sortedMovies.sort((a, b) =>
					a.title.localeCompare(b.title)
				);
			}
			if (sort === NAME_ZA) {
				sortedMovies = sortedMovies.sort((a, b) =>
					b.title.localeCompare(a.title)
				);
			}
			return { ...state, filtered_movies: sortedMovies };
		// ========================================
		// FILTER
		// ========================================
		case FILTER_MOVIES:
			const {
				all_movies,
				filters: { favourite },
				provider,
			} = state;
			let filtered = [...all_movies]; // reset template
			// handle rendered provider
			if (provider !== ALL) {
				filtered = filtered.filter(item => item.provider === provider);
			}
			// handle filters
			if (favourite) {
				filtered = filtered.filter(item => item.favourite);
			}
			return { ...state, filtered_movies: filtered };
		case UPDATE_FILTERS:
			const { name, checked } = action.payload;
			return {
				...state,
				filters: { ...state.filters, [name]: checked },
			};
		// =====================================
		// PROVIDER & PAGE TO DISPLAY
		// =====================================
		case UPDATE_PROVIDER:
			return { ...state, provider: action.payload };
		case UPDATE_PAGINATION:
			let newPagination = state.pagination;
			if (action.payload === NEXT_PAGE) {
				newPagination += 1;
				if (newPagination > state.pages.length) {
					newPagination = 1;
				}
			} else if (action.payload === PREV_PAGE) {
				newPagination -= 1;
				if (newPagination < 1) {
					newPagination = state.pages.length;
				}
			} else if (
				action.payload === 'reset' &&
				state.pagination > state.pages.length
			)
				newPagination = 1;
			return { ...state, pagination: newPagination };
		case PAGINATE:
			const newPages = paginate(state.filtered_movies, state.per_page);
			return { ...state, pages: newPages };
		case UPDATE_PER_PAGE:
			return { ...state, per_page: action.payload };
		// ========================================
		// MOVIE PLAYER
		// ========================================
		case SET_MODAL:
			return { ...state, modal_open: !state.modal_open };
		case UPDATE_CURRENT_MOVIE:
			return { ...state, current_movie: action.payload };
		//
		default:
			return console.log(`No Matching "${action.type}" - action type`);
	}
};

export default filter_reducer;
