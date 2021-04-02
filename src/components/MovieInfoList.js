import React from 'react';
import Moment from 'react-moment';
import { List } from 'reactstrap';
import { FiChevronRight } from 'react-icons/fi';
import { FaYoutube, FaVimeoV } from 'react-icons/fa';
import { YOUTUBE } from '../context/variables';

const MovieInfoList = ({ publishedAt, likes, views, provider }) => {
	const providerIcon = provider =>
		provider === YOUTUBE ? (
			<span>
				<FaYoutube className='yt-icon' />
			</span>
		) : (
			<span>
				<FaVimeoV className='vimeo-icon' />
			</span>
		);

	return (
		<>
			{providerIcon(provider)}
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
		</>
	);
};

export default MovieInfoList;
