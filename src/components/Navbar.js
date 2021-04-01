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

const NavbarComponent = () => {
	const [collapsed, setCollapsed] = useState(true);
	const toggleNavbar = () => setCollapsed(!collapsed);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen(!dropdownOpen);

	return (
		<Navbar color='light' light expand='md'>
			<NavbarBrand href='/'>My movies</NavbarBrand>
			<NavbarToggler onClick={toggleNavbar} className='mr-2' />
			<Collapse isOpen={!collapsed} navbar>
				<Nav className='mr-auto' navbar>
					<NavItem>
						<Link to='/'>Add new</Link>
					</NavItem>
					<Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
						<DropdownToggle nav caret>
							<Link to='/movies'>Movies</Link>
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem>
								<Link to='/movies'>All</Link>
							</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>
								<Link to='/movies/youtube'>YouTube</Link>
							</DropdownItem>
							<DropdownItem>
								<Link to='/movies/vimeo'>Vimeo</Link>
							</DropdownItem>
						</DropdownMenu>
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
