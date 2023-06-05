import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../constants';
import { Dog } from '../types';

const fetchDogs = (dogIDList: string[]) => {
	return axios
		.post<Dog[]>(`${BASE_URL}/dogs`, dogIDList, { withCredentials: true })
		.then((response: AxiosResponse<Dog[]>) => {
			return response.data;
		})
		.catch((error) => {
			console.log(error);
			throw new Error('Failed to fetch dogs');
		});
};

export default fetchDogs;
