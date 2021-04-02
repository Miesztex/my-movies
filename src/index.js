import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { MoviesProvider } from './context/movies_context';
import { FilterProvider } from './context/filter_context';

ReactDOM.render(
	<React.StrictMode>
		<MoviesProvider>
			<FilterProvider>
				<App />
			</FilterProvider>
		</MoviesProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
