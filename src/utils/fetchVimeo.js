const extractIdVimeo = movieInput => {
	return movieInput.substring(movieInput.length - 9, movieInput.length);
};

export const getUrlVimeo = movieInput => {
	const movieId = extractIdVimeo(movieInput);

	const fetchUrl = `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${movieId}`;

	const movieUrl = `https://www.vimeo.com/${movieId}`;
	return { fetchUrl, movieUrl };
};

export const formItemVimeo = (data, provider, movieUrl) => {
	// destructure response
	const { title, thumbnail_url: imageUrl, upload_date: publishedAt } = data;
	const likes = undefined;
	const views = undefined;

	// form a new item from response
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
