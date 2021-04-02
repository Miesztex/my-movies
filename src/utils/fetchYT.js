const extractIdYT = movieInput => {
	// we assume that id has always 11 characters and no other params are included in url
	return movieInput.substring(movieInput.length - 11, movieInput.length);
};

export const getUrlYT = movieInput => {
	const movieId = extractIdYT(movieInput);

	const fetchUrl = `https://www.googleapis.com/youtube/v3/videos?id=${movieId}&key=${process.env.REACT_APP_GOOGLE_API_KEY}
  &part=snippet,contentDetails,statistics,status`;

	const movieUrl = `https://www.youtube.com/watch?v=${movieId}`;

	return { fetchUrl, movieUrl };
};

export const formItemYT = (data, provider, movieUrl) => {
	// destructure response
	const {
		snippet: {
			localized: { title },
			thumbnails: {
				medium: { url: imageUrl },
			},
			publishedAt,
		},
		statistics: { likeCount: likes, viewCount: views },
	} = data.items[0];

	const newItem = {
		id: new Date().getTime(),
		title,
		provider,
		movieUrl,
		imageUrl,
		publishedAt,
		likes,
		views,
		favourite: false,
	};
	return newItem;
};
