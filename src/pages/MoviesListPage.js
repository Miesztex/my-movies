import React from 'react';
import { Container, Row } from 'reactstrap';

import { Filters, MoviesList } from '../components';

const MoviesListPage = () => {
	return (
		<Container>
			<Row>
				<Filters />
			</Row>
			<Row>
				<MoviesList />
			</Row>
		</Container>
	);
};

export default MoviesListPage;
