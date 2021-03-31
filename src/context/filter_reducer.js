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
				all_movies: [...action.payload.movies], // ... makes a copy
				filtered_movies: [...action.payload.movies],
			};
		case SET_TILEVIEW:
			return { ...state, list_view: false };
		case SET_LISTVIEW:
			return { ...state, list_view: true };
		case UPDATE_SORT:
			return { ...state, sort: action.payload.value };
		case SORT_MOVIES:
			const { sort, filtered_products } = state;
			let sortedProducts = [...filtered_products];
			// ---------- sort functions ----------
			if (sort === 'price-highest') {
				sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
			} else if (sort === 'price-lowest') {
				sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
			} else if (sort === 'name-a') {
				sortedProducts = sortedProducts.sort((a, b) =>
					a.name.localeCompare(b.name)
				);
			} else if (sort === 'name-z') {
				sortedProducts = sortedProducts.sort((a, b) =>
					b.name.localeCompare(a.name)
				);
			} else console.log('no matching sort type');
			// ---------- ------------ ----------
			return { ...state, filtered_products: sortedProducts };
		case FILTER_MOVIES:
			const { all_movies } = state;
			let filtered = [...all_movies]; // reset template
			filtered = filtered.filter(item => item.favourite);
			// -----------------------------------------
			return { ...state, filtered_products: filtered };

		default:
			throw new Error(`No Matching "${action.type}" - action type`);
	}
};

export default filter_reducer;
