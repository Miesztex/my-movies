import {
	INIT_MOVIES,
	ADD_MOVIE,
	GET_MOVIE_BEGIN,
	GET_MOVIE_END,
	SET_ALERT,
	REMOVE_MOVIE,
	CLEAR_ALL,
	TOGGLE_FAV,
} from './actions';

const reducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		case INIT_MOVIES:
			return { ...state, movies: action.payload };
		case ADD_MOVIE:
			return { ...state, movies: [...state.movies, action.payload] };
		case GET_MOVIE_BEGIN:
			return { ...state, isLoading: true };
		case GET_MOVIE_END:
			return { ...state, isLoading: false };
		case SET_ALERT:
			return { ...state, alert: action.payload };
		case TOGGLE_FAV:
			const favMovies = state.movies.map(item => {
				if (item.id === action.payload) {
					return { ...item, favourite: !item.favourite };
				} else return item;
			});
			return { ...state, movies: favMovies };
		case REMOVE_MOVIE:
			const filteredMovies = state.movies.filter(
				item => item.id !== action.payload
			);
			return { ...state, movies: filteredMovies };
		case CLEAR_ALL:
			return { ...state, movies: [] };
		default:
			throw new Error(`WROCNG ACTION TYPE: ${action.type}`);
	}
};

export default reducer;
