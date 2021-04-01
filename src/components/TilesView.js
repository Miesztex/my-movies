import React from 'react';
import Moment from 'react-moment';
import { FaPlay, FaHeart, FaTrash } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import {
	CardBody,
	CardTitle,
	CardImg,
	Container,
	Card,
	List,
	CardFooter,
	ListInlineItem,
	Button,
	CardDeck,
} from 'reactstrap';

import MovieModal from './MovieModal';
const TilesView = ({
	movies,
	toggleFavourites,
	removeMovie,
	updateCurrentMovie,
}) => {
	return (
		<>
			<MovieModal />
			<Container>
				<CardDeck>
					<div className='tiles-container'>
						{movies.map(item => {
							const {
								id,
								title,
								publishedAt,
								likes,
								views,
								imageUrl,
								provider,
								favourite,
							} = item;
							return (
								<Card outline color='primary' className='card mt-3'>
									<CardBody>
										<CardImg top width='100%' src={imageUrl} alt={title} />
										<CardTitle tag='h6' className='mt-3'>
											{title}
										</CardTitle>
										<List type='unstyled'>
											<li>
												<span>
													<FiChevronRight />
												</span>{' '}
												published:{' '}
												<span>
													<Moment date={publishedAt} format='MMM Do YYYY' />
												</span>
											</li>
											{likes && (
												<li>
													<span>
														<FiChevronRight />
													</span>{' '}
													likes: <span>{likes}</span>
												</li>
											)}
											{views && (
												<li>
													<span>
														<FiChevronRight />
													</span>{' '}
													views: <span>{views}</span>
												</li>
											)}
										</List>
									</CardBody>
									<CardFooter>
										<List type='inline' className='tile-btn-container mt-2'>
											<ListInlineItem>
												<Button
													size='sm'
													className='movie-action-btn'
													onClick={() => {
														updateCurrentMovie(item);
													}}>
													Play{' '}
													<span>
														<FaPlay />
													</span>
												</Button>
											</ListInlineItem>
											<ListInlineItem>
												<Button
													size='sm'
													onClick={() => toggleFavourites(id)}
													className='movie-action-btn'>
													Favourite{' '}
													<span>
														<FaHeart
															className={`heart-icon ${favourite && 'active'}`}
														/>
													</span>
												</Button>
											</ListInlineItem>
											<ListInlineItem>
												<Button
													size='sm'
													onClick={() => removeMovie(id)}
													className='movie-action-btn'>
													Remove{' '}
													<span>
														<FaTrash />
													</span>
												</Button>
											</ListInlineItem>
										</List>
									</CardFooter>
								</Card>
								// </Col>
							);
						})}
					</div>
				</CardDeck>
			</Container>
		</>
	);
};

export default TilesView;
