import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home, About, Movies, SingleMovie, Error } from './pages/index';

import { Navbar, Footer } from './components/index';
import { Container, Row } from 'reactstrap';

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
						<Movies />
					</Route>
					<Route exact path='/about'>
						<About />
					</Route>
					<Route path='/movies/:id' children={<SingleMovie />} />
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
