import axios, { AxiosError, AxiosResponse } from 'axios';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../constants';
import { ProcessedData, SearchParams } from '../types';
import { handleSubmitData } from '../utils/handleSubmitData';
import useDogContext from '../context/useDogContext';
import Input from './input';
import { FormInput } from './form-input';
import { scrollToTop } from '../utils/scrollToTop';
import { GenerateMatchButton } from './generate-match-button';
import { isErrorResponse } from '../utils/auth';
import { useCollapseOnScroll } from '../utils/useCollapseOnScroll';

const Search: FC = () => {
	const { dispatch } = useDogContext();
	const { register, handleSubmit } = useForm<Partial<SearchParams>>();
	const [breedsData, setBreedsData] = useState<string[]>([]);
	const [filterText, setFilterText] = useState('');
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const onScroll = useCollapseOnScroll();

	useEffect(() => {
		axios
			.get(`${BASE_URL}/dogs/breeds`, { withCredentials: true })
			.then((response) => {
				setBreedsData(response.data);
			})
			.catch((err) => {
				const axiosError = err as AxiosError;
				console.log(axiosError);
				if (axiosError.response && isErrorResponse(axiosError.response.data)) {
					throw new Error(axiosError.response.data.message);
				}
			});
	}, []);

	const handleDogSearch = async (params: ProcessedData) => {
		axios
			.get(`${BASE_URL}/dogs/search`, {
				withCredentials: true,
				params: params,
			})
			.then((response: AxiosResponse) => {
				console.log('response', response);
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
		scrollToTop();
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		if (onScroll) {
			setIsOpen(!onScroll);
		}
	}, [onScroll]);
	return (
		<>
			<div className='flex gap-2 sticky z-10 top-0 py-2 bg-[#d4b8e1]'>
				<button
					className='border rounded-lg border-green-200 py-2 px-4 bg-green-500 text-white text-sm w-fit'
					onClick={handleToggle}
				>
					{isOpen ? 'Close' : 'Open'}
				</button>
				<GenerateMatchButton />
			</div>
			<form
				className={`flex flex-col gap-4 transition-all overflow-hidden ${
					isOpen ? 'max-h-[36rem] opacity-100' : 'max-h-0 opacity-0'
				}`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-2 p-4 gap-4 md:grid-cols-5 overflow-scroll no-scrollbar shadow-md border rounded-lg max-h-[28rem]'>
					<div className='col-span-full flex flex-col justify-between gap-1 text-sm'>
						<label
							htmlFor='filterBreed'
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
						<label
							htmlFor='sortField'
							className='font-medium text-sm text-gray-800'
						>
							Sort By
						</label>
						<select
							id='sortField'
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
						<label
							htmlFor='sortOrder'
							className='font-medium text-sm text-gray-800'
						>
							Sort Order
						</label>
						<select
							id='sortOrder'
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
		</>
	);
};

export default Search;
