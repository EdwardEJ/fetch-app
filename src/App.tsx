import './App.css';
import { useEnterAnimation } from './animations/useEnterAnimation';
import { GenerateMatch } from './components/generate-match';
import { Header } from './components/header';
import Login from './components/login';
import Search from './components/search';
import SearchResults from './components/search-results';
import useDogContext from './context/useDogContext';

function App() {
	const {
		state: { isLoggedIn, dogSearchResponse },
	} = useDogContext();
	const shouldAnimate = useEnterAnimation();

	return (
		<>
			{!isLoggedIn ? (
				<Login />
			) : (
				<div
					className={`enter flex flex-col gap-2 self-end w-full ${
						shouldAnimate && 'app-enter'
					}`}
				>
					<Header />
					<Search />
					{dogSearchResponse.resultIds.length > 0 && (
						<>
							<SearchResults />
						</>
					)}
					{/* <GenerateMatch /> */}
				</div>
			)}
		</>
	);
}

export default App;
