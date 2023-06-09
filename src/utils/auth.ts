import { BASE_URL } from '../constants';
import { User } from '../types';
import axios, { AxiosError } from 'axios';

interface ErrorResponse extends Error {
	message: string;
}

export const isErrorResponse = (data: unknown): data is ErrorResponse => {
	if (typeof data === 'object' && data !== null) {
		return (
			'message' in data && typeof (data as ErrorResponse).message === 'string'
		);
	}
	return false;
};

export const login = ({ name, email }: User): Promise<User> => {
	return axios
		.post(
			`${BASE_URL}/auth/login`,
			{
				name,
				email,
			},
			{
				withCredentials: true,
			}
		)
		.then((res) => {
			const userData: User = res.data;

			return userData;
		})
		.catch((error) => {
			const axiosError = error as AxiosError;
			if (axiosError.response && isErrorResponse(axiosError.response.data)) {
				throw new Error(axiosError.response.data.message);
			}

			throw new Error('An error occurred while logging in.');
		});
};

export const logout = () => {
	return axios
		.post(`${BASE_URL}/auth/logout`)
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.error(error);
		});
};
