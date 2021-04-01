import moment from 'moment';
import {
	LOAD_MOVIES,
	SET_VIEW,
	FILTER_MOVIES,
	SORT_MOVIES,
	UPDATE_FILTERS,
	UPDATE_SORT,
	UPDATE_PROVIDER,
	UPDATE_PAGINATION,
	PAGINATE,
	UPDATE_CURRENT_MOVIE,
	SET_MODAL,
} from './actions';

import { paginate } from '../utils/paginate';

import { NAME_AZ, NAME_ZA, OLD, NEW, itemsNumberPerPage } from './variables';

const filter_reducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		case LOAD_MOVIES:
			return {
				...state,
				all_movies: [...action.payload],
				filtered_movies: [...action.payload],
			};
		case SET_VIEW:
			// boolean from string
			let view = action.payload;
			view = view === 'true';
			console.log(view);
			return { ...state, list_view: view };
		case UPDATE_SORT:
			return { ...state, sort: action.payload };
		case SORT_MOVIES:
			const { sort, filtered_movies } = state;
			let sortedMovies = [...filtered_movies];
			// ========- sort functions ===========
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
			// ---------- ------------ ----------
			return { ...state, filtered_movies: sortedMovies };
		case FILTER_MOVIES:
			const {
				all_movies,
				filters: { favourite },
				provider,
			} = state;
			let filtered = [...all_movies]; // reset template
			// handle rendered provider
			if (provider !== 'all') {
				filtered = filtered.filter(
					item => item.provider === provider.toUpperCase()
				);
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
		case UPDATE_PROVIDER:
			return { ...state, provider: action.payload };
		case UPDATE_PAGINATION:
			let newPagination = state.pagination;
			if (action.payload === 'next') {
				newPagination += 1;
				if (newPagination > state.pages.length) {
					newPagination = 1;
				}
			} else if (action.payload === 'prev') {
				newPagination -= 1;
				if (newPagination < 1) {
					newPagination = state.pages.length;
				}
			}
			return { ...state, pagination: newPagination };
		case PAGINATE:
			const newPages = paginate(state.filtered_movies, itemsNumberPerPage);
			return { ...state, pages: newPages };
		case SET_MODAL:
			return { ...state, modal_open: !state.modal_open };
		case UPDATE_CURRENT_MOVIE:
			return { ...state, current_movie: action.payload };
		default:
			throw new Error(`No Matching "${action.type}" - action type`);
	}
};

export default filter_reducer;
