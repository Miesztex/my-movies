import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Filters, MoviesList } from '../components';

const MoviesListPage = () => {
	return (
		<Container>
			<Row>
				<Col>
					<Filters md='2' />
				</Col>
				<Col md='10'>
					<MoviesList />
				</Col>
			</Row>
		</Container>
	);
};

export default MoviesListPage;
