import {
	ADD_MOVIE,
	GET_MOVIE_BEGIN,
	GET_MOVIE_SUCCESS,
	GET_MOVIE_ERROR,
	ALERT_FADE,
} from './actions';

const reducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		case ADD_MOVIE:
			return { ...state, movies: [...state.movies, action.payload] };
		case GET_MOVIE_BEGIN:
			return { ...state, isLoading: true };
		case GET_MOVIE_SUCCESS:
			const successAlert = {
				show: true,
				type: 'success',
				msg: 'Movie added to your list!',
			};
			return { ...state, isLoading: false, alert: successAlert };
		case GET_MOVIE_ERROR:
			const errorAlert = {
				show: true,
				type: 'danger',
				msg: `I'm sorry, adding movie failed`,
			};
			return { ...state, isLoading: false, alert: errorAlert };
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
