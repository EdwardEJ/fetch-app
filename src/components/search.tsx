import axios, { AxiosResponse } from 'axios';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../constants';

import { ProcessedData, SearchParams } from '../types';
import { handleSubmitData } from '../utils/handleSubmitData';
import useDogContext from '../context/useDogContext';
import Input from './input';
import { FormInput } from './form-input';
import { scrollToTop } from '../utils/scrollToTop';
import { useCollapseOnScroll } from '../utils/useCollapseOnScroll';
import { GenerateMatchButton } from './generate-match-button';
import { Alert } from './alert';

const Search: FC = () => {
	const { dispatch } = useDogContext();
	const { register, handleSubmit } = useForm<Partial<SearchParams>>();
	const [breedsData, setBreedsData] = useState<string[]>([]);
	const [filterText, setFilterText] = useState('');
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const isCollapsed = useCollapseOnScroll();
	const [error, setError] = useState<string>('');

	useEffect(() => {
		axios
			.get(`${BASE_URL}/dogs/breeds`, { withCredentials: true })
			.then((response) => {
				setBreedsData(response.data);
			})
			.catch((err) => {
				const errorMessage =
					(err as Error).message || 'An error occurred while logging in.';
				setError(errorMessage);
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
		setIsOpen(false);
	};

	const handleToggle = () => {
		setIsOpen(!isOpen);
		scrollToTop();
	};

	useEffect(() => {
		setIsOpen(!isCollapsed);
	}, [isCollapsed]);

	return (
		<>
			<Alert title='Error Fetching Breeds' description={error} alert='danger' />
			<div className='flex flex-col gap-2 pt-1 px-4 -mx-4 flex-1 sticky top-0 bg-[#d4b8e1]'>
				<div className='flex gap-2'>
					<button
						className='border rounded-lg border-green-200 py-2 px-4 bg-green-500 text-white text-sm w-fit'
						onClick={handleToggle}
					>
						{isOpen ? 'Close Search' : 'Open Search'}
					</button>
					<GenerateMatchButton />
				</div>
				<div className='overflow-hidden'>
					<form
						className={`flex flex-col gap-4 transition-all duration-300 ${
							isOpen ? 'max-h-[38rem]' : 'max-h-0'
						}`}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className='grid grid-cols-2 p-4 gap-4 md:grid-cols-5 overflow-scroll no-scrollbar shadow-md border rounded-lg'>
							<div className='col-span-full flex justify-between text-sm'>
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
							{filteredBreedsData.map((breed, index) => (
								<div
									key={index}
									className='flex gap-2 items-center p-2 rounded-lg border bg-white border-purple-400 shadow-sm'
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
							<FormInput
								id='ageMax'
								name='ageMax'
								label='Max Age'
								placeholder='Enter a maximum age'
								type='number'
								min='0'
								register={register}
							/>
							<div className='flex flex-col'>
								<label className='font-medium text-sm text-gray-800'>
									Sort By
								</label>
								<select
									className='border border-gray-300 shadow-sm text-sm rounded-md focus:border-blue-600 placeholder-gray-500 py-1 px-2 mt-1 w-full'
									{...register('sort.field')}
								>
									<option value=''>-- Select Order --</option>
									<option value='age'>Age</option>
									<option value='breed'>Breed</option>
									<option value='name'>Name</option>
								</select>
							</div>
							<div className='flex flex-col'>
								<label className='font-medium text-sm text-gray-800'>
									Sort Order
								</label>
								<select
									className='border border-gray-300 text-sm  rounded-md focus:border-blue-600 placeholder-gray-500 py-1 px-2 mt-1 w-full'
									{...register('sort.order')}
								>
									<option value=''>-- Select Order --</option>
									<option value='asc'>Ascending</option>
									<option value='desc'>Descending</option>
								</select>
							</div>

							<FormInput
								id='zipCodes'
								name='zipCodes'
								label='Zip Codes'
								placeholder='Enter Zip Codes'
								type='number'
								register={register}
							/>
						</div>
						<button
							className='text-sm rounded-md px-4 py-2 text-white bg-blue-500 w-full md:w-28'
							aria-label='Submit Search Dogs Form'
							type='submit'
						>
							Search
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Search;
