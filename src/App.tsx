import './App.css';
import { GenerateMatch } from './components/generate-match';
import Login from './components/login';
import Search from './components/search';
import SearchResults from './components/search-results';
import useDogContext from './context/useDogContext';
import { logout } from './utils/auth';

function App() {
	const {
		state: { isLoggedIn, dogSearchResponse },
		dispatch,
	} = useDogContext();
	const name = localStorage.getItem('user');

	const handleLogoutClick = () => {
		logout()
			.then(() => {
				dispatch({
					type: 'SET_LOGGED_IN',
					payload: false,
				});
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<>
			{!isLoggedIn ? (
				<Login />
			) : (
				<>
					<p>Welcome {name}!</p>
					<button onClick={handleLogoutClick}>Log Out</button>
				</>
			)}
			{isLoggedIn && <Search />}
			{dogSearchResponse && isLoggedIn && (
				<>
					<SearchResults />
					<GenerateMatch />
				</>
			)}
		</>
	);
}

export default App;
