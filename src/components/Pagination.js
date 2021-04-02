import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { PREV_PAGE, NEXT_PAGE } from '../context/variables';

const PaginationPanel = ({ updatePagination, pagination, pages }) => {
	return pages.length ? (
		<Pagination size='sm'>
			{pages.length > 1 && (
				<PaginationItem>
					<PaginationLink
						previous
						onClick={() => {
							updatePagination(PREV_PAGE);
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
							updatePagination(NEXT_PAGE);
						}}
					/>
				</PaginationItem>
			)}
		</Pagination>
	) : null;
};

export default PaginationPanel;
