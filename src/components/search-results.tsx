import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { BASE_URL } from '../constants';
import useDogContext from '../context/useDogContext';
import { Dog } from '../types';
import fetchDogs from '../utils/fetchDogs';

const SearchResults: FC = () => {
	const [disableNextButton, setDisableNextButton] = useState<boolean>(false);
	const {
		state: { dogSearchResponse, selectedFavorite },
		dispatch,
	} = useDogContext();
	const [dogs, setDogs] = useState<Dog[]>();

	useEffect(() => {
		const fetchData = () => {
			fetchDogs(dogSearchResponse.resultIds)
				.then((dogsResponse) => {
					setDogs(dogsResponse);
				})
				.catch((error) => {
					console.error(error);
				});
		};
		fetchData();
	}, [dogSearchResponse.resultIds]);

	const fetchNextOrPrevDogs = (url: string) => {
		axios
			.get(`${BASE_URL}${url}`, {
				withCredentials: true,
			})
			.then((response) => {
				dispatch({
					type: 'SET_DOG_SEARCH_RESPONSE',
					payload: response.data,
				});
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const fetchPreviousDogs = () => {
		if (dogSearchResponse.prev) {
			fetchNextOrPrevDogs(dogSearchResponse.prev);
		}
	};

	const fetchNextDogs = () => {
		if (dogSearchResponse.next) {
			const fromParam = dogSearchResponse.next.split('&from=')[1];
			const sizeParam = dogSearchResponse.next.split('&size=')[1];

			const fromValue = parseInt(fromParam);
			const sizeValue = parseInt(sizeParam);

			const disableNextButton = fromValue + sizeValue > dogSearchResponse.total;
			setDisableNextButton(disableNextButton);
			fetchNextOrPrevDogs(dogSearchResponse.next);
		}
	};

	const onClickSelectFavorite = (id: string) => {
		dispatch({
			type: 'SET_SELECTED_FAVORITES',
			payload: id,
		});
	};

	const onClickIsFavorited = (id: string) => {
		return selectedFavorite.includes(id);
	};

	return (
		<div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
			{dogs?.map((d) => (
				<button
					key={d.id}
					onClick={() => onClickSelectFavorite(d.id)}
					className={`flex flex-col p-4 gap-2 items-center border  ${
						onClickIsFavorited(d.id) ? 'border-blue-600' : 'border-gray-200'
					} shadow-sm rounded-lg`}
				>
					<img
						className='h-28 w-28 object-contain'
						src={d.img}
						alt={d.name + ' the ' + d.breed}
					/>
					<div className='flex flex-col text-sm'>
						<div className='flex gap-1'>
							<p>Name:</p>
							<p className='font-medium'>{d.name}</p>
						</div>
						<div className='flex gap-1'>
							<p>Age:</p>
							<p className='font-medium'>{d.age}</p>
						</div>
						<div className='flex gap-1'>
							<p>Breed:</p>
							<p className='font-medium'>{d.breed}</p>
						</div>
						<div className='flex gap-1'>
							<p>Zip Code:</p>
							<p className='font-medium'>{d.zip_code}</p>
						</div>
					</div>
				</button>
			))}
			<div>
				<button
					className='text-sm rounded-md px-4 py-2 text-white bg-blue-500 disabled:bg-gray-300 disabled:text-black disabled:font-medium'
					onClick={fetchPreviousDogs}
					disabled={!dogSearchResponse.prev}
				>
					Previous
				</button>
				<button
					className='text-sm rounded-md px-4 py-2 text-white bg-blue-500 disabled:bg-gray-300 disabled:text-black disabled:font-medium'
					onClick={fetchNextDogs}
					disabled={disableNextButton}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default SearchResults;
