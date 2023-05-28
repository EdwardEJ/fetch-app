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
		<div className='flex flex-col justify-between'>
			{!isLoggedIn ? (
				<Login />
			) : (
				<div className='flex flex-col gap-2 self-end'>
					<div className='flex flex-col items-end gap-2'>
						<p className='text-lg font-semibold'>Welcome {name}!</p>
						<button className='text-red-500' onClick={handleLogoutClick}>
							Log Out
						</button>
					</div>
					<Search />
					{dogSearchResponse && (
						<>
							<SearchResults />
							<GenerateMatch />
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default App;
