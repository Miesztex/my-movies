import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import { Home, About, Movies, Error } from './pages/index';
import { Navbar, Footer } from './components/index';

function App() {
	return (
		<Router>
			<Container>
				<Navbar />
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/movies/:provider' children={<Movies />} />
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
