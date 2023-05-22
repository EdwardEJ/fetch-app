import { BASE_URL } from '../constants';
import { Dog } from '../types';
import axios from 'axios';
import { FC, useEffect } from 'react';

const SearchResults: FC = () => {
	const fetchDogs = async (): Promise<Dog[]> => {
		try {
			const response = await axios.post(
				`${BASE_URL}/dogs`,
				// dogResponseData?.resultIds,
				{
					withCredentials: true,
				}
			);
			console.log('response.data', response);

			const dogs: Dog[] = response.data;
			console.log(dogs);
			return dogs;
		} catch (error) {
			throw new Error('Failed to fetch dogs');
		}
	};

	// useEffect(() => {
	// 	console.log('run effect');
	// 	isLoggedIn && dogResponseData && fetchDogs();
	// }, [isLoggedIn, dogResponseData]);

	return <div>search-results</div>;
};

export default SearchResults;
