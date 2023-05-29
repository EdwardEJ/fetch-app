import { FC } from 'react';
import useDogContext from '../context/useDogContext';

export const GenerateMatch: FC = () => {
	const {
		state: { matchedDog },
		dispatch,
	} = useDogContext();

	const onClickNewSearch = () => {
		dispatch({
			type: 'SET_MATCHED_DOG',
			payload: { id: '', img: '', name: '', age: 0, zip_code: '', breed: '' },
		});
	};

	return (
		<>
			{matchedDog && (
				<div className='flex flex-col gap-2 items-center fade-in'>
					<p className='text-4xl font-medium text-indigo-900'>
						Congratulation!
					</p>
					<p className='text-sm text-indigo-600 font-medium'>
						Say hello to {matchedDog.name}! Your new fur pal :D
					</p>
					<div
						key={matchedDog.id}
						className='flex flex-col p-4 gap-2 items-center border border-gray-200 shadow-sm rounded-lg w-fit fade-in'
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
					<p className='text-sm '>
						Select more favorites and create a new match
					</p>
					<button
						onClick={onClickNewSearch}
						className='bg-blue-600 py-2 px-4 rounded-lg text-white text-sm'
					>
						Search for a new friend
					</button>
				</div>
			)}
		</>
	);
};
