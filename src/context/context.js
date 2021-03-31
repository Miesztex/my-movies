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

// import fetchVimeo from '../fetches/fetchVimeo';

// --------------- STATE ------------------
const initialState = {
	movies: [],
	channel: '',
	vimeo_movies: [],
	alert: { show: false, type: 'success', msg: '' },
	isLoading: false,
};

// --------------- CONTEXT ------------------
const MoviesContext = React.createContext();

// --------------- PROVIDER -------------
export const MoviesProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// ======  HANDLE YT FETCH ======
	const fetchMovie = (movieInput, channel) => {
		if (channel === 'YouTube') fetchYT(movieInput);
		else if (channel === 'Vimeo') fetchVimeo(movieInput);
	};

	const extractIdYT = movieInput => {
		// we assume that id has always 11 characters and no other params are included in url
		return movieInput.substring(movieInput.length - 11, movieInput.length);
	};

	const fetchYT = movieInput => {
		const movieId = extractIdYT(movieInput);

		const fetchUrl = `https://www.googleapis.com/youtube/v3/videos?id=${movieId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}
		&part=snippet,contentDetails,statistics,status`;

		const movieUrl = `https://www.youtube.com/watch?v=${movieId}`;

		dispatch({ type: GET_MOVIE_BEGIN });
		fetch(fetchUrl)
			.then(response => response.json())
			.then(data => {
				if (!data.items.length) return dispatch({ type: GET_MOVIE_ERROR });
				// 3a
				addMovieYT(data, 'YouTube', movieUrl);
				dispatch({ type: GET_MOVIE_SUCCESS });
			})
			.catch(error => {
				dispatch({ type: GET_MOVIE_ERROR });
			});
	};

	const addMovieYT = (data, channel, movie_url) => {
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
			channel,
			movie_url,
			image_url,
			publishedAt,
			likes,
			views,
		};

		dispatch({ type: ADD_MOVIE, payload: newItem });
	};

	// ======  HANDLE VIMEO FETCH ======

	const extractIdVimeo = movieInput => {
		return movieInput.substring(movieInput.length - 9, movieInput.length);
	};

	const fetchVimeo = movieInput => {
		const movieId = extractIdVimeo(movieInput);

		const fetchUrl = `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${movieId}`;

		const movieUrl = `https://www.vimeo.com/${movieId}`;
		dispatch({ type: GET_MOVIE_BEGIN });
		fetch(fetchUrl)
			.then(response => response.json())
			.then(data => {
				// if (!data.items.length) return dispatch({ type: GET_MOVIE_ERROR });
				console.log(data);
				addMovieVimeo(data, 'Vimeo', movieUrl);
				dispatch({ type: GET_MOVIE_SUCCESS });
			})
			.catch(error => {
				console.log(error);
				dispatch({ type: GET_MOVIE_ERROR });
			});
	};

	const addMovieVimeo = (
		data,
		channel,
		movie_url,
		likes = 'undefined',
		views = 'undefined'
	) => {
		// destructure response
		const { title, thumbnail_url: image_url, upload_date: publishedAt } = data;
		console.log(title);

		// form a new item from response
		const newItem = {
			id: new Date().getTime(),
			title,
			channel,
			movie_url,
			image_url,
			publishedAt,
			likes,
			views,
		};

		dispatch({ type: ADD_MOVIE, payload: newItem });
	};

	// alert auto-fade feature
	// ======== BUG ============
	let alertTO = () => {};
	useEffect(() => {
		setTimeout(() => {
			alertTO = dispatch({ type: ALERT_FADE });
		}, 5000);
		return clearTimeout(alertTO);
	}, [state.alert.show]);

	// ====== RETURN ======
	return (
		<MoviesContext.Provider value={{ ...state, fetchMovie }}>
			{children}
		</MoviesContext.Provider>
	);
};

// CUSTOM CONTEXT HOOK
export const useGlobalContext = () => {
	return useContext(MoviesContext);
};
