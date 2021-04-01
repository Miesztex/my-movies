import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { useFilterContext } from '../context/filter_context';

const ModalExample = () => {
	const { modal_open, updateModal, current_movie } = useFilterContext();
	return (
		<div>
			<Modal isOpen={modal_open} toggle={updateModal}>
				<ModalHeader toggle={updateModal}>{current_movie}</ModalHeader>
				<ModalBody>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</ModalBody>
			</Modal>
		</div>
	);
};

export default ModalExample;
