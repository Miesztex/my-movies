import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationPanel = ({ updatePagination, pagination, pages }) => {
	return (
		<Pagination size='sm'>
			{pages.length > 1 && (
				<PaginationItem>
					<PaginationLink
						previous
						onClick={() => {
							updatePagination('prev');
						}}
					/>
				</PaginationItem>
			)}
			<PaginationItem active>
				<PaginationLink>{pagination}</PaginationLink>
			</PaginationItem>
			{pages.length > 1 && (
				<PaginationItem>
					<PaginationLink
						next
						onClick={() => {
							updatePagination('next');
						}}
					/>
				</PaginationItem>
			)}
		</Pagination>
	);
};

export default PaginationPanel;
