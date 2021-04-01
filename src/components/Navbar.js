import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Navbar,
	NavbarBrand,
	NavItem,
	Nav,
	// NavLink,
	Dropdown,
	DropdownItem,
	DropdownToggle,
	DropdownMenu,
	NavbarToggler,
	Collapse,
} from 'reactstrap';
import { useFilterContext } from '../context/filter_context';

const NavbarComponent = () => {
	const [collapsed, setCollapsed] = useState(true);
	const toggleNavbar = () => setCollapsed(!collapsed);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(!dropdownOpen);

	const { updateProvider } = useFilterContext();

	return (
		<Navbar color='light' light expand='md'>
			<NavbarBrand href='#'>
				<Link to='/'>My movies</Link>
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
										updateProvider('all');
									}}>
									Movies
								</Link>
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem>
									<Link
										to='/movies/youtube'
										onClick={() => {
											updateProvider('youtube');
										}}>
										YouTube
									</Link>
								</DropdownItem>
								<DropdownItem>
									<Link
										to='/movies/vimeo'
										onClick={() => {
											updateProvider('vimeo');
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
