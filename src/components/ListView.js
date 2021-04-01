import React from 'react';
import { List, Button, ListInlineItem } from 'reactstrap';
import Moment from 'react-moment';

const ListView = ({ movies, removeMovie, toggleFavourites }) => {
	return (
		<List type='unstyled'>
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
						<h6>{title}</h6>
						{/* --- info --- */}
						<List type='unstyled'>
							<li>
								published:{' '}
								<span>
									<Moment date={publishedAt} format='MMM Do YYYY' />
								</span>
							</li>
							{likes && (
								<li>
									likes: <span>{likes}</span>
								</li>
							)}
							{views && (
								<li className='mb-md'>
									views: <span>{views}</span>
								</li>
							)}
						</List>
						{/* --- buttons --- */}
						<List type='inline'>
							<ListInlineItem>
								<Button size='sm'>Play</Button>
							</ListInlineItem>
							<ListInlineItem>
								<Button size='sm' onClick={() => toggleFavourites(id)}>
									Favourite
								</Button>
							</ListInlineItem>
							<ListInlineItem>
								<Button size='sm' onClick={() => removeMovie(id)}>
									Remove
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
