import qs from 'qs';

export const createURL = (path: string, params: object) => {
	const queryString = qs.stringify(params, { arrayFormat: 'brackets' });
	return `${path}?${queryString}`;
};
