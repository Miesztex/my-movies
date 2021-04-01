import React, { useState } from 'react';
import {
	Button,
	Card,
	CardBody,
	Collapse,
	FormGroup,
	Label,
	Form,
	Input,
	CustomInput,
} from 'reactstrap';
import { useFilterContext } from '../context/filter_context';
import { useMoviesContext } from '../context/movies_context';
import { NAME_AZ, NAME_ZA, OLD, NEW } from '../context/variables';

const Filters = () => {
	const {
		sort,
		list_view,
		filters: { favourite },
		updateFilters,
		updateSort,
		setListView,
	} = useFilterContext();
	const { clearMovies } = useMoviesContext();

	const [filterOpen, setFilterOpen] = useState(false);

	const handleToggle = () => setFilterOpen(!filterOpen);
	return (
		<div>
			<Button
				color='primary'
				onClick={handleToggle}
				style={{ marginBottom: '1rem' }}>
				Options
				{/* R icons  */}
			</Button>
			<Collapse isOpen={filterOpen}>
				<Card>
					<CardBody>
						<Form>
							{/* <FormGroup inline>
								<Label >View: </Label>
								<div>
									<Label for='list' className={`${}`}> List</Label>
									<CustomInput type='radio' id='list' name='list' hidden />
									<Label for='tiles'> Tiles</Label>
									<CustomInput type='radio' id='tiles' name='tiles' hidden />
								</div>
							</FormGroup> */}

							<FormGroup>
								<Label inline>View: </Label>
								<Input
									type='select'
									value={list_view}
									onChange={setListView}
									inline>
									<option value={true}>List view</option>
									<option value={false}>Grid view</option>
								</Input>
							</FormGroup>
							<FormGroup>
								<Label inline>Sort by: </Label>
								<Input type='select' value={sort} onChange={updateSort} inline>
									<option value={NAME_AZ}>A-Z</option>
									<option value={NAME_ZA}>Z-A</option>
									<option value={OLD}>Oldest</option>
									<option value={NEW}>Newest</option>
								</Input>
							</FormGroup>
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
							<Button onClick={clearMovies}>Clear all movies</Button>
						</Form>
					</CardBody>
				</Card>
			</Collapse>
		</div>
	);
};

export default Filters;
