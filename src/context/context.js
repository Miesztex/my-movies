// IMPORTS
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';

import {
	ADD_MOVIE,
	GET_MOVIE_BEGIN,
	GET_MOVIE_SUCCESS,
	GET_MOVIE_ERROR,
	ALERT_FADE,
} from './actions';

// --------------- STATE ------------------
const initialState = {
	movies: [],
	fav_products: [],
	grid_view: false,
	sort: 'name-a',
	per_page: 10,
	alert: { show: false, type: 'success', msg: '' },
	isLoading: false,
};

// https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=YOUR_API_KEY
//      &part=snippet,contentDetails,statistics,status
// --------------- CONTEXT ------------------

const MoviesContext = React.createContext();

export const MoviesProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// ====== FETCH FUNCTION ======
	const extractId = movieInput => {
		// we assume that id has always 11 characters and no other params are included in url
		return movieInput.substring(movieInput.length - 11, movieInput.length);
	};

	const fetchItem = movieInput => {
		const movieId = extractId(movieInput);

		const url = `https://www.googleapis.com/youtube/v3/videos?id=${movieId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}
		&part=snippet,contentDetails,statistics,status`;

		dispatch({ type: GET_MOVIE_BEGIN });
		fetch(url)
			.then(response => response.json())
			.then(data => {
				if (!data.items.length) return dispatch({ type: GET_MOVIE_ERROR });
				addItem(data);
				dispatch({ type: GET_MOVIE_SUCCESS });
			})
			.catch(error => {
				dispatch({ type: GET_MOVIE_ERROR });
			});
	};

	// ====== ACTION HANDLERS ======
	const addItem = data => {
		// destructure response
		const {
			snippet: {
				localized: { title },
				thumbnails: {
					default: { url: image_url },
				},
				publishedAt,
			},
			statistics: { likeCount: likes, viewCount: views },
		} = data.items[0];

		// form a new item from response
		const newItem = {
			id: new Date().getTime(),
			title,
			image_url,
			publishedAt,
			likes,
			views,
		};

		dispatch({ type: ADD_MOVIE, payload: newItem });
	};

	// alert auto-fade feature
	// ======= BUG =======
	useEffect(() => {
		setTimeout(() => {
			const alertTO = dispatch({ type: ALERT_FADE });
		}, 5000);
	}, [state.alert.show]);

	// ====== RETURN ======
	return (
		<MoviesContext.Provider value={{ ...state, fetchItem }}>
			{children}
		</MoviesContext.Provider>
	);
};

// make sure use
export const useGlobalContext = () => {
	return useContext(MoviesContext);
};
