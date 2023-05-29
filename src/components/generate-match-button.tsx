import { FC } from 'react';
import useDogContext from '../context/useDogContext';

export const GenerateMatchButton: FC = () => {
	const {
		state: { selectedFavorite },
	} = useDogContext();

	const showGenerateMatchButton = selectedFavorite.length >= 2;

	return (
		<>
			{showGenerateMatchButton && (
				<button className='border border-blue-200 rounded-lg py-2 px-4 bg-blue-500 text-white text-sm fade-in sparkle'>
					Unleash the perfect match!
				</button>
			)}
			{!showGenerateMatchButton && (
				<button
					disabled
					className='border border-blue-200 rounded-lg py-2 px-4 bg-blue-500 text-white text-sm fade-out'
				>
					Unleash the perfect match!
				</button>
			)}
		</>
	);
};
