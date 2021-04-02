import React from 'react';
import { Col, Row } from 'reactstrap';
import { FaGithubSquare, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
	return (
		<>
			<Row>
				<Col>
					<p className='text-center p-4'>
						Created by{' '}
						<a
							href='https://www.facebook.com/mieszko.krzyzanski/'
							target='_blank'>
							Mieszko Krzyżański{' '}
							<span>
								<FaFacebookF className='fb-icon' />
							</span>
							<a href='https://github.com/Miesztex' target='_blank'>
								<FaGithubSquare className='github-icon' />
							</a>
						</a>
					</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<p className='text-center'>
						<small>
							Project created exclusively for{' '}
							<a href='https://digimonkeys.com' target='_blank'>
								digimonkeys'{' '}
							</a>
							job interview assignment.
						</small>
					</p>
				</Col>
			</Row>
		</>
	);
};

export default Footer;
