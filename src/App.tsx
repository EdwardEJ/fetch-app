import './App.css';
import Login from './components/login';
import Search from './components/search';
import { useDogContext } from './context/dog-context';

function App() {
	const {
		state: { isLoggedIn },
	} = useDogContext();
	const name = localStorage.getItem('user');

	return (
		<>
			{!isLoggedIn ? <Login /> : <p>Welcome {name}!</p>}
			{isLoggedIn && <Search />}
		</>
	);
}

export default App;
