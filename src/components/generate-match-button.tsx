import { FC } from 'react';
import useDogContext from '../context/useDogContext';
import { fetchDogMatch } from '../utils/fetchDogMatch';

export const GenerateMatchButton: FC = () => {
	const {
		state: { selectedFavorite },
		dispatch,
	} = useDogContext();

	const handleFetchDogMatch = (selectedFavoriteDogID: string[]) => {
		fetchDogMatch(selectedFavoriteDogID)
			.then((dogMatch) => {
				if (dogMatch) {
					dispatch({
						type: 'SET_MATCHED_DOG',
						payload: dogMatch,
					});
				}
			})
			.catch((error) => {
				console.error('Catch Error:', error);
			});
	};

	const showButton = selectedFavorite.length >= 2;

	return (
		<button
			onClick={() => handleFetchDogMatch(selectedFavorite)}
			disabled={!showButton}
			className={`border border-blue-200 rounded-lg py-2 px-4 bg-blue-500 text-white text-sm ${
				showButton ? 'fade-in sparkle' : 'fade-out'
			}`}
		>
			Unleash the perfect match!
		</button>
	);
};
