import {
	ADD_MOVIE,
	GET_MOVIE_BEGIN,
	GET_MOVIE_END,
	ALERT_FADE,
	INIT_MOVIES,
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
			return { ...state, isLoading: false, alert: action.payload };
		case ALERT_FADE:
			const fadeAlert = {
				show: false,
				type: 'success',
				msg: ``,
			};
			return { ...state, alert: fadeAlert };
		default:
			throw new Error(`WROCNG ACTION TYPE: ${action.type}`);
	}
};

export default reducer;
