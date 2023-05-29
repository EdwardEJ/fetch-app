import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../constants';
import { Match } from '../types';
import fetchDogs from './fetchDogs';

export const fetchDogMatch = (selectedFavoriteDogID: string[]) => {
	return axios
		.post(`${BASE_URL}/dogs/match`, selectedFavoriteDogID, {
			withCredentials: true,
		})
		.then((postResponse: AxiosResponse<Match>) => {
			const postReponseMatch = [postResponse.data.match];
			return fetchDogs(postReponseMatch);
		})
		.then((getResponse) => {
			const dogMatch = getResponse[0];
			return dogMatch;
		})
		.catch((error) => {
			console.error('Catch Error:', error);
		});
};
