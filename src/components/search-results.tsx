import { BASE_URL } from '../constants';
import { useDogContext } from '../context/dog-context';
import { Dog } from '../types';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';

const SearchResults: FC = () => {
	const {
		state: { dogSearchResponse },
	} = useDogContext();
	const [dogs, setDogs] = useState<Dog[]>();

	const fetchDogs = async (dogIdArray: string[]): Promise<Dog[]> => {
		try {
			const response = await axios.post(`${BASE_URL}/dogs`, dogIdArray, {
				withCredentials: true,
			});

			const dogs: Dog[] = response.data;
			setDogs(dogs);
			return dogs;
		} catch (error) {
			throw new Error('Failed to fetch dogs');
		}
	};

	useEffect(() => {
		console.log('run effect');
		const fetchData = async () => {
			try {
				const dogs = await fetchDogs(dogSearchResponse.resultIds);
				console.log(dogs);
				// Update your context/state with the fetched data if necessary
			} catch (error) {
				console.error(error);
			}
		};

		if (dogSearchResponse.resultIds.length > 0) {
			fetchData();
		}
	}, [dogSearchResponse]);

	return (
		<div className='grid grid-cols-2 gap-2 md:grid-cols-4'>
			{dogs?.map((d) => (
				<div className='flex flex-col p-4 gap-2 items-center border border-gray-200 shadow-sm rounded-lg'>
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
				</div>
			))}
		</div>
	);
};

export default SearchResults;
