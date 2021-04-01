import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { FaGithubSquare } from 'react-icons/fa';

const Footer = () => {
	return (
		<Row>
			<Col>
				<p className='text-center p-4'>
					Created by{' '}
					<a href='https://github.com/Miesztex'>
						Mieszko Krzyżański{' '}
						<span>
							<FaGithubSquare className='github-icon' />
						</span>
					</a>
				</p>
			</Col>
		</Row>
	);
};

export default Footer;
