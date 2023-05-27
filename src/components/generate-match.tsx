import axios from 'axios';
import { FC, useState } from 'react';
import { BASE_URL } from '../constants';
import useDogContext from '../context/useDogContext';
import { Dog } from '../types';

export const GenerateMatch: FC = () => {
	const [matchedDog, setMatchedDog] = useState<Dog>();
	const {
		state: { selectedFavorite },
	} = useDogContext();

	const fetchDogMatch = (selectedFavoriteDogID: string[]) => {
		return axios
			.post(`${BASE_URL}/dogs/match`, selectedFavoriteDogID, {
				withCredentials: true,
			})
			.then((postResponse) => {
				const postReponseMatch = [postResponse.data.match];
				console.log('postReponseMatch', postReponseMatch);
				return axios.post(`${BASE_URL}/dogs`, postReponseMatch, {
					withCredentials: true,
				});
			})
			.then((getResponse) => {
				const dogMatch = getResponse.data[0];
				setMatchedDog(dogMatch);
				console.log('dogMatch', dogMatch);
			})
			.catch((error) => {
				console.error('Catch Error:', error);
			});
	};

	return (
		<>
			{matchedDog && (
				<div
					key={matchedDog.id}
					className='flex flex-col p-4 gap-2 items-center border border-gray-200 shadow-sm rounded-lg'
				>
					<img
						className='h-28 w-28 object-contain'
						src={matchedDog.img}
						alt={matchedDog.name + ' the ' + matchedDog.breed}
					/>
					<div className='flex flex-col text-sm'>
						<div className='flex gap-1'>
							<p>Name:</p>
							<p className='font-medium'>{matchedDog.name}</p>
						</div>
						<div className='flex gap-1'>
							<p>Age:</p>
							<p className='font-medium'>{matchedDog.age}</p>
						</div>
						<div className='flex gap-1'>
							<p>Breed:</p>
							<p className='font-medium'>{matchedDog.breed}</p>
						</div>
						<div className='flex gap-1'>
							<p>Zip Code:</p>
							<p className='font-medium'>{matchedDog.zip_code}</p>
						</div>
					</div>
				</div>
			)}

			<button onClick={() => fetchDogMatch(selectedFavorite)}>
				generate-match
			</button>
		</>
	);
};
