import axios, { AxiosResponse } from 'axios';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../constants';

import { ProcessedData, SearchParams } from '../types';
import { handleSubmitData } from '../utils/handleSubmitData';
import useDogContext from '../context/useDogContext';

const Search: FC = () => {
	const { dispatch } = useDogContext();
	const { register, handleSubmit } = useForm<Partial<SearchParams>>();
	const [breedsData, setBreedsData] = useState<string[]>([]);

	useEffect(() => {
		axios
			.get(`${BASE_URL}/dogs/breeds`, { withCredentials: true })
			.then((response) => {
				setBreedsData(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleDogSearch = async (params: ProcessedData) => {
		axios
			.get(`${BASE_URL}/dogs/search`, {
				withCredentials: true,
				params: params,
			})
			.then((response: AxiosResponse) => {
				dispatch({
					type: 'SET_DOG_SEARCH_RESPONSE',
					payload: response.data,
				});
			})
			.catch((error: any) => {
				console.error(error);
			});
	};

	const onSubmit = async (data: Partial<SearchParams>) => {
		const processedData = handleSubmitData(data);
		handleDogSearch(processedData);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='grid grid-cols-2 gap-4 md:grid-cols-5'>
					{breedsData.map((breed, index) => (
						<div
							key={index}
							className='flex gap-2 items-center p-2 rounded-lg border border-gray-200 shadow-sm '
						>
							<input
								id={breed}
								type='checkbox'
								value={breed}
								{...register('breeds')}
							/>
							<label
								htmlFor={breed}
								className='text-sm text-gray-800 text-left'
							>
								{breed}
							</label>
						</div>
					))}
				</div>
				<div className='flex flex-col items-start gap-2'>
					<label className='text-sm'>Zip Codes</label>
					<input
						className='border border-blue-600 rounded-md outline-none focus:border-blue-600 placeholder-gray-500 py-1 px-2'
						{...register('zipCodes')}
						type='text'
						placeholder='Enter Zipcode'
					/>
				</div>
				<div className='flex flex-col items-start gap-2'>
					<label className='text-sm'>Min Age</label>
					<input
						className='border border-blue-600 rounded-md outline-none focus:border-blue-600 placeholder-gray-500 py-1 px-2'
						{...register('ageMin')}
						type='number'
						min='0'
					/>
				</div>
				<div className='flex flex-col items-start gap-2'>
					<label className='text-sm'>Max Age</label>
					<input
						className='border border-blue-600 rounded-md outline-none focus:border-blue-600 placeholder-gray-500 py-1 px-2'
						{...register('ageMax')}
						type='number'
						min='0'
					/>
				</div>
				<div className='flex flex-col items-start gap-2'>
					<label className='text-sm'>Sort By</label>
					<select
						className='border border-blue-600 rounded-md outline-none focus:border-blue-600 placeholder-gray-500 py-1 px-2'
						{...register('sort.field')}
					>
						<option value=''>-- Select Order --</option>
						<option value='age'>Age</option>
						<option value='breed'>Breed</option>
						<option value='name'>Name</option>
					</select>
				</div>
				<div className='flex flex-col items-start gap-2'>
					<label className='text-sm'>Sort Order</label>
					<select
						className='border border-blue-600 rounded-md outline-none focus:border-blue-600 placeholder-gray-500 py-1 px-2'
						{...register('sort.order')}
					>
						<option value=''>-- Select Order --</option>
						<option value='asc'>Ascending</option>
						<option value='desc'>Descending</option>
					</select>
				</div>
				<button
					className='text-sm rounded-md px-4 py-2 text-white bg-blue-500'
					aria-label='Submit Search Dogs Form'
					type='submit'
				>
					Submit
				</button>
			</form>
		</>
	);
};

export default Search;
