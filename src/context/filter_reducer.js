import {
	LOAD_MOVIES,
	SET_VIEW,
	UPDATE_SORT,
	SORT_MOVIES,
	UPDATE_FILTERS,
	FILTER_MOVIES,
} from './actions';

import { NAME_AZ, NAME_ZA, OLD, NEW } from './variables';

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
			console.log(filtered_movies);
			let sortedMovies = [...filtered_movies];
			// ---------- sort functions ----------
			if (sort === OLD) {
				sortedMovies = sortedMovies.sort((a, b) => b.price - a.price);
			}
			if (sort === NEW) {
				sortedMovies = sortedMovies.sort((a, b) => a.price - b.price);
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
			} = state;
			let filtered = [...all_movies]; // reset template
			if (favourite) {
				filtered = filtered.filter(item => item.favourite);
			}
			return { ...state, filtered_movies: filtered };
		case UPDATE_FILTERS:
			const { name, checked } = action.payload;
			console.log(name);
			return {
				...state,
				filters: { ...state.filters, [name]: checked },
			};

		default:
			throw new Error(`No Matching "${action.type}" - action type`);
	}
};

export default filter_reducer;
