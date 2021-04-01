import {
	LOAD_MOVIES,
	SET_LISTVIEW,
	SET_TILEVIEW,
	UPDATE_SORT,
	SORT_MOVIES,
	UPDATE_FILTERS,
	FILTER_MOVIES,
} from './actions';

const filter_reducer = (state, action) => {
	switch (action.type) {
		case LOAD_MOVIES:
			return {
				...state,
				all_movies: [...action.payload],
				filtered_movies: [...action.payload],
			};
		case SET_TILEVIEW:
			return { ...state, list_view: false };
		case SET_LISTVIEW:
			return { ...state, list_view: true };
		case UPDATE_SORT:
			return { ...state, sort: action.payload.value };
		case SORT_MOVIES:
			const { sort, filtered_movies } = state;
			let sortedMovies = [...filtered_movies];
			// ---------- sort functions ----------
			if (sort === 'oldest') {
				sortedMovies = sortedMovies.sort((a, b) => b.price - a.price);
			}
			if (sort === 'newets') {
				sortedMovies = sortedMovies.sort((a, b) => a.price - b.price);
			}
			if (sort === 'name-a') {
				sortedMovies = sortedMovies.sort((a, b) =>
					a.title.localeCompare(b.title)
				);
			}
			if (sort === 'name-z') {
				sortedMovies = sortedMovies.sort((a, b) =>
					b.title.localeCompare(a.title)
				);
			}
			console.log('no matching sort type');
			// ---------- ------------ ----------
			return { ...state, filtered_movies: sortedMovies };
		case FILTER_MOVIES:
			const { all_movies, filter_fav } = state;
			let filtered = [...all_movies]; // reset template
			if (filter_fav) {
				filtered = filtered.filter(item => item.favourite);
			}
			// -----------------------------------------
			return { ...state, filtered_movies: filtered };

		default:
			throw new Error(`No Matching "${action.type}" - action type`);
	}
};

export default filter_reducer;
