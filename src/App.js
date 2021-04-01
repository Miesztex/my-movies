import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home, About, Movies, SingleMovie, Error } from './pages/index';

import { Navbar, Footer } from './components/index';
import { Container, Row } from 'reactstrap';
import MoviesList from './components/MoviesList';

function App() {
	return (
		<Router>
			<Container>
				<Navbar />
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route exact path='/movies'>
						<About />
					</Route>
					<Route path='/movies/:filter' children={<MoviesList />} />
					<Route exact path='/about'>
						<About />
					</Route>
					<Route path='*'>
						<Error />
					</Route>
				</Switch>
				<Footer />
			</Container>
		</Router>
	);
}

export default App;
