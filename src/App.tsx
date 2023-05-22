import { useContext } from 'react';
import './App.css';
import Login from './components/login';
import { AuthContext } from './context/AuthContext';
import Search from './components/search';

function App() {
	const { isLoggedIn } = useContext(AuthContext);
	console.log('isLoggedIn', isLoggedIn);
	return (
		<>
			<Login />
			{isLoggedIn && <Search />}
		</>
	);
}

export default App;
