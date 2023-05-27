import { BASE_URL } from '../constants';
import useDogContext from '../context/useDogContext';
import { Dog } from '../types';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';

const SearchResults: FC = () => {
	const [disableNextButton, setDisableNextButton] = useState<boolean>(false);
	const {
		state: { dogSearchResponse, selectedFavorite },
		dispatch,
	} = useDogContext();
	const [dogs, setDogs] = useState<Dog[]>();

	const fetchDogs = async (dogIdArray: string[]): Promise<Dog[]> => {
		try {
			const response = await axios.post(`${BASE_URL}/dogs`, dogIdArray, {
				withCredentials: true,
			});
			const dogs: Dog[] = response.data;
			return dogs;
		} catch (error) {
			throw new Error('Failed to fetch dogs');
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dogs = await fetchDogs(dogSearchResponse.resultIds);
				setDogs(dogs);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, [dogSearchResponse.resultIds]);

	const fetchNextOrPrevDogs = async (url: string) => {
		try {
			const response = await axios.get(`${BASE_URL}${url}`, {
				withCredentials: true,
			});

			dispatch({
				type: 'SET_DOG_SEARCH_RESPONSE',
				payload: response.data,
			});
		} catch (error) {
			console.error(error);
		}
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
		console.log('id', id);
		dispatch({
			type: 'SET_SELECTED_FAVORITES',
			payload: id,
		});
	};

	const isSelected = (id: string) => {
		const test = selectedFavorite.includes(id);
		console.log('test', test);
		return test;
	};

	return (
		<div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
			{dogs?.map((d) => (
				<button
					key={d.id}
					onClick={() => onClickSelectFavorite(d.id)}
					className={`flex flex-col p-4 gap-2 items-center border  ${
						isSelected(d.id) ? 'border-blue-600' : 'border-gray-200'
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
