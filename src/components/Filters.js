import React, { useState } from 'react';
import {
	Card,
	CardBody,
	Collapse,
	FormGroup,
	Form,
	Input,
	Button,
	InputGroup,
	CustomInput,
	InputGroupAddon,
	InputGroupText,
} from 'reactstrap';

import { NAME_AZ, NAME_ZA, OLD, NEW } from '../context/variables';
import { useFilterContext } from '../context/filter_context';
import { useMoviesContext } from '../context/movies_context';
import Pagination from './Pagination';

const Filters = () => {
	const {
		all_movies,
		sort,
		list_view,
		filters: { favourite },
		updateFilters,
		updateSort,
		setListView,
		pages,
		updatePagination,
		pagination,
		per_page,
		updatePerPage,
	} = useFilterContext();
	const { clearMovies, addAllDemo } = useMoviesContext();

	const [filterOpen, setFilterOpen] = useState(false);
	const handleToggle = () => setFilterOpen(!filterOpen);

	const clearOrAdd =
		all_movies.length < 1 ? (
			<Button onClick={addAllDemo}>Get demo</Button>
		) : (
			<Button onClick={clearMovies}>Remove all</Button>
		);

	return (
		<div className='collapse-container'>
			{/* ========= BUTTONS ============ */}
			<div className='options-btn-container'>
				<Button color='primary' onClick={handleToggle}>
					Options
				</Button>
				<Pagination
					updatePagination={updatePagination}
					pagination={pagination}
					pages={pages}
				/>
				{clearOrAdd}
			</div>
			{/* ======== COLLAPSE ========== */}
			<Collapse isOpen={filterOpen}>
				<Card>
					<CardBody>
						<Form>
							<InputGroup>
								<InputGroupAddon addonType='prepend'>
									<InputGroupText className='px-4'> View: </InputGroupText>
								</InputGroupAddon>
								<Input
									type='select'
									value={list_view}
									onChange={setListView}
									inline>
									<option value={true}>List view</option>
									<option value={false}>Grid view</option>
								</Input>
							</InputGroup>
							<br />
							<InputGroup>
								<InputGroupAddon addonType='prepend'>
									<InputGroupText className='px-2'> Per page: </InputGroupText>
								</InputGroupAddon>
								<Input
									type='select'
									value={per_page}
									onChange={updatePerPage}
									inline>
									<option value='5'>5</option>
									<option value='10'>10</option>
									<option value='15'>15</option>
								</Input>
							</InputGroup>
							<br />
							<InputGroup>
								<InputGroupAddon addonType='prepend'>
									<InputGroupText className='px-3'> Sort by: </InputGroupText>
								</InputGroupAddon>
								<Input type='select' value={sort} onChange={updateSort} inline>
									<option value={NAME_AZ}>A-Z</option>
									<option value={NAME_ZA}>Z-A</option>
									<option value={OLD}>Least recently published</option>
									<option value={NEW}>Most recently published</option>
								</Input>
							</InputGroup>
							<br />
							<FormGroup>
								<div>
									<CustomInput
										type='switch'
										id='favourite'
										name='favourite'
										label='Show favourites'
										checked={favourite}
										onClick={updateFilters}
									/>
								</div>
							</FormGroup>
						</Form>
					</CardBody>
				</Card>
			</Collapse>
		</div>
	);
};

export default Filters;
