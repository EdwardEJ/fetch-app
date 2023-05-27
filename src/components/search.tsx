import axios, { AxiosResponse } from 'axios';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../constants';

import { ProcessedData, SearchParams } from '../types';
import { handleSubmitData } from '../utils/handleSubmitData';
import useDogContext from '../context/useDogContext';
import Input from './input';
import { FormInput } from './form-input';

const Search: FC = () => {
	const { dispatch } = useDogContext();
	const { register, handleSubmit } = useForm<Partial<SearchParams>>();
	const [breedsData, setBreedsData] = useState<string[]>([]);
	const [filterText, setFilterText] = useState('');

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

	const filteredBreedsData = breedsData.filter((breed) =>
		breed.toLowerCase().includes(filterText.toLowerCase())
	);
	const handleFilterTextChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFilterText(event.target.value);
	};

	const onSubmit = async (data: Partial<SearchParams>) => {
		const processedData = handleSubmitData(data);
		handleDogSearch(processedData);
	};

	return (
		<>
			<form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
				<div className='flex justify-between text-sm'>
					<label
						htmlFor='filteredBreed'
						className='font-medium text-gray-800 text-left'
					>
						Filter By Breed:
					</label>
					<Input
						id='filterBreed'
						name='filterBreed'
						type='text'
						value={filterText}
						onChange={handleFilterTextChange}
					/>
				</div>
				<div className='grid grid-cols-2 p-4 gap-4 md:grid-cols-5 max-h-[32rem] overflow-scroll no-scrollbar shadow-md border rounded-lg'>
					{filteredBreedsData.map((breed, index) => (
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
								className='text-xs md:text-sm text-gray-800 text-left'
							>
								{breed}
							</label>
						</div>
					))}
				</div>
				<div className='grid grid-cols-2 md:grid-cols-5 gap-2'>
					<FormInput
						id='ageMin'
						name='ageMin'
						label='Min Age'
						placeholder='Enter a minimum age'
						type='number'
						min='0'
						register={register}
					/>

					<div className='flex flex-col items-start gap-2'>
						<label className='text-xs md:text-base'>Max Age</label>
						<input
							className='border border-blue-600 text-sm md:text-base placeholder:text-xs placeholder:md:text-base  rounded-md outline-none focus:border-blue-600 placeholder-gray-500 py-1 px-2 w-full'
							{...register('ageMax')}
							type='number'
							placeholder='Enter a maximum age'
							min='0'
						/>
					</div>
					<div className='flex flex-col items-start gap-2'>
						<label className='text-xs md:text-base'>Sort By</label>
						<select
							className='border border-blue-600 text-sm md:text-base placeholder:text-xs placeholder:md:text-base  rounded-md outline-none focus:border-blue-600 placeholder-gray-500 py-1 px-2 w-full'
							{...register('sort.field')}
						>
							<option value=''>-- Select Order --</option>
							<option value='age'>Age</option>
							<option value='breed'>Breed</option>
							<option value='name'>Name</option>
						</select>
					</div>
					<div className='flex flex-col items-start gap-2'>
						<label className='text-xs md:text-base'>Sort Order</label>
						<select
							className='border border-blue-600 text-sm md:text-base placeholder:text-xs placeholder:md:text-base  rounded-md outline-none focus:border-blue-600 placeholder-gray-500 py-1 px-2 w-full'
							{...register('sort.order')}
						>
							<option value=''>-- Select Order --</option>
							<option value='asc'>Ascending</option>
							<option value='desc'>Descending</option>
						</select>
					</div>
					<div className='flex flex-col items-start gap-2'>
						<label className='text-xs md:text-base'>Zip Codes</label>
						<input
							className='border border-blue-600 text-sm md:text-base placeholder:text-xs placeholder:md:text-base rounded-md outline-none focus:border-blue-600 placeholder-gray-500 py-1 px-2 w-full'
							{...register('zipCodes')}
							type='text'
							placeholder='Enter Zipcode'
						/>
					</div>
				</div>
				<button
					className='text-xs md:text-base rounded-md px-4 py-2 text-white bg-blue-500 w-full md:w-28'
					aria-label='Submit Search Dogs Form'
					type='submit'
				>
					Search
				</button>
			</form>
		</>
	);
};

export default Search;
