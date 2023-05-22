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
				console.log('response', response);
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
				{breedsData.map((breed, index) => (
					<label key={index}>
						{breed}
						<input type='checkbox' value={breed} {...register('breeds')} />
					</label>
				))}
				<label>
					Zip Codes
					<input {...register('zipCodes')} type='text' />
				</label>
				<label>
					Min Age
					<input {...register('minAge')} type='number' min='0' />
				</label>
				<label>
					Max Age
					<input {...register('maxAge')} type='number' min='0' />
				</label>
				<button type='submit'>Submit</button>
			</form>
		</>
	);
};

export default Search;
