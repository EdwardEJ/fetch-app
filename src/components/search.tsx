import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BASE_URL } from '../constants';
import { SearchParams } from '../types';

const Search: FC = () => {
	const { register, handleSubmit } = useForm<SearchParams>({
		defaultValues: {
			breeds: [],
			zipCodes: [],
			minAge: null,
			maxAge: null,
		},
	});
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

	const onSubmit = async (data: SearchParams) => {
		try {
			const response = await axios.get(`${BASE_URL}/dogs/search`, {
				withCredentials: true,
				params: data,
			});
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
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
						{...register('minAge')}
						type='number'
						min='0'
					/>
				</div>
				<div className='flex flex-col items-start gap-2'>
					<label className='text-sm'>Max Age</label>
					<input
						className='border border-blue-600 rounded-md outline-none focus:border-blue-600 placeholder-gray-500 py-1 px-2'
						{...register('maxAge')}
						type='number'
						min='0'
					/>
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
