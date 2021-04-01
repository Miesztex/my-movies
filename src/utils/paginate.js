export const paginate = (items, perPage) => {
	const pages = Math.ceil(items.length / perPage);

	// length, fn returning items for each place
	const newItems = Array.from({ length: pages }, (_, index) => {
		const start = index * perPage;
		return items.slice(start, start + perPage);
	});

	return newItems;
};
