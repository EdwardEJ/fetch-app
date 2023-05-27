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
				<div className='flex justify-end mb-4'>
					<div className='flex flex-col items-end gap-2'>
						<p className='text-lg font-semibold'>Welcome {name}!</p>
						<button className='text-red-500' onClick={handleLogoutClick}>
							Log Out
						</button>
					</div>
				</div>
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
