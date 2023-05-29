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
					className={`flex flex-col gap-2 m-auto ${
						shouldAnimate && 'app-enter'
					}`}
				>
					<Header />
					<div className='relative'>
						<Search />
						{dogSearchResponse.resultIds.length > 0 && (
							<>
								<SearchResults />
							</>
						)}
					</div>
					{/* <GenerateMatch /> */}
				</div>
			)}
		</>
	);
}

export default App;
