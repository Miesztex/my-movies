import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

const Footer = () => {
	return (
		<Row>
			<Col>
				<p className='text-center'>
					Created by{' '}
					<a href='https://github.com/Miesztex'>Mieszko Krzyżański</a>
				</p>
			</Col>
		</Row>
	);
};

export default Footer;
