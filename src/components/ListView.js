import React from 'react';
import { List, Button, ListInlineItem } from 'reactstrap';
import Moment from 'react-moment';
import { FaPlay, FaHeart, FaTrash } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';

const ListView = ({ movies, removeMovie, toggleFavourites }) => {
	return (
		<List type='unstyled' className='movie-list'>
			{movies.map(item => {
				const {
					title,
					publishedAt,
					provider,
					movieUrl,
					imageUrl,
					id,
					likes,
					views,
					favourite,
				} = item;
				return (
					<li className='list-group-item' key={id}>
						<div className='list-info'>
							<h5>{title}</h5>
							{/* --- info --- */}
							<List type='unstyled' className='mb-2'>
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
						</div>
						{/* --- buttons --- */}
						<List type='inline' className='list-btns'>
							<ListInlineItem>
								<Button size='sm' className='movie-action-btn'>
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
					</li>
				);
			})}
		</List>
	);
};

export default ListView;
