import React from 'react';
import {
	CardBody,
	CardText,
	CardTitle,
	CardImg,
	Col,
	Container,
	Row,
	Card,
	List,
	CardFooter,
	ListInlineItem,
	Button,
} from 'reactstrap';
import Moment from 'react-moment';

const TilesView = ({ movies, toggleFavourites, removeMovie }) => {
	return (
		<Container>
			<Row>
				{movies.map(item => {
					const {
						id,
						title,
						publishedAt,
						likes,
						views,
						imageUrl,
						movieUrl,
						provider,
						favourite,
					} = item;
					return (
						<Col xs='12' md='6' lg='6' xl='4' key={id}>
							<Card outline color='primary'>
								<CardBody>
									<CardImg top width='100%' src={imageUrl} alt={title} />
									<CardTitle tag='h6'>{title}</CardTitle>
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
								</CardBody>
								<CardFooter>
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
								</CardFooter>
							</Card>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
};

export default TilesView;
