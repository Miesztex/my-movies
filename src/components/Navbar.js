import React, { useState } from 'react';
import {
	Navbar,
	NavbarBrand,
	NavItem,
	Nav,
	NavLink,
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
						<NavLink href='/'>Add new</NavLink>
					</NavItem>
					<Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
						<DropdownToggle nav caret>
							Movies
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem>
								<NavLink href='movies'>All</NavLink>
							</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>
								<NavLink href='movies'>Youtube</NavLink>
							</DropdownItem>
							<DropdownItem>
								<NavLink href='movies'>Vimeo</NavLink>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<NavItem>
						<NavLink href='/'>About</NavLink>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
};

export default NavbarComponent;
