import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Nav,
	Navbar,
	NavItem,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from 'reactstrap';

import { YOUTUBE, VIMEO, ALL } from '../context/variables';
import { useFilterContext } from '../context/filter_context';

const NavbarComponent = () => {
	const [collapsed, setCollapsed] = useState(true);
	const toggleNavbar = () => setCollapsed(!collapsed);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(!dropdownOpen);

	const { updateProvider } = useFilterContext();

	return (
		<Navbar color='light' light expand='md'>
			<NavbarBrand>
				<Link to='/'>MyMovies</Link>
			</NavbarBrand>
			<NavbarToggler onClick={toggleNavbar} className='mr-2' />
			<Collapse isOpen={!collapsed} navbar>
				<Nav className='mr-auto custom-toggler' navbar>
					<NavItem>
						<Link to='/'>Add new</Link>
					</NavItem>
					<Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
						<NavItem>
							<DropdownToggle nav caret>
								<Link
									to='/movies/all'
									onClick={() => {
										updateProvider(ALL);
									}}>
									Movies
								</Link>
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem>
									<Link
										to='/movies/youtube'
										onClick={() => {
											updateProvider(YOUTUBE);
										}}>
										YouTube
									</Link>
								</DropdownItem>
								<DropdownItem>
									<Link
										to='/movies/vimeo'
										onClick={() => {
											updateProvider(VIMEO);
										}}>
										Vimeo
									</Link>
								</DropdownItem>
							</DropdownMenu>
						</NavItem>
					</Dropdown>
					<NavItem>
						<Link to='/about'>About</Link>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
};

export default NavbarComponent;
