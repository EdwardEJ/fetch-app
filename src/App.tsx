import './App.css';
import Login from './components/login';
import Search from './components/search';
import SearchResults from './components/search-results';
import { useDogContext } from './context/dog-context';

function App() {
	const {
		state: { isLoggedIn, dogSearchResponse },
	} = useDogContext();
	const name = localStorage.getItem('user');

	return (
		<>
			{!isLoggedIn ? <Login /> : <p>Welcome {name}!</p>}
			{isLoggedIn && <Search />}
			{dogSearchResponse && isLoggedIn && <SearchResults />}
		</>
	);
}

export default App;
