import React from 'react';
import ReactPlayer from 'react-player';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { useFilterContext } from '../context/filter_context';

const ModalExample = () => {
	const { modal_open, updateModal, current_movie } = useFilterContext();
	return (
		<div>
			<Modal
				id='fullScreenModalId'
				size='xl'
				isOpen={modal_open}
				toggle={updateModal}
				dialogClassName='fullscreen-modal'>
				<ModalHeader toggle={updateModal}>
					<h3>{current_movie && current_movie.title}</h3>
				</ModalHeader>
				<ModalBody>
					<div className='media-player-container'>
						<ReactPlayer
							url={current_movie && current_movie.movieUrl}
							width='100%'
							height='100%'
							playing
							controls
							className='media-player'
						/>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default ModalExample;
