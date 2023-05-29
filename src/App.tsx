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
		state: { isLoggedIn, dogSearchResponse, matchedDog },
	} = useDogContext();
	const shouldAnimate = useEnterAnimation();

	return (
		<>
			{!isLoggedIn ? (
				<Login />
			) : (
				<div
					className={`flex flex-col flex-1 gap-2 md:w-2/3 md:m-auto ${
						shouldAnimate && 'app-enter'
					}`}
				>
					<Header />
					<div className='relative'>
						{matchedDog.name === '' ? (
							<>
								<Search />
								{dogSearchResponse.resultIds.length > 0 && <SearchResults />}
							</>
						) : (
							<GenerateMatch />
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default App;
