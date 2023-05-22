export interface User {
	name: string;
	email: string;
}

export interface Error {
	message: string;
	status: number;
}

export interface SearchParams {
	breeds: string[];
	zipCodes: string[];
	minAge: number | null;
	maxAge: number | null;
}

export interface Dog {
	id: string;
	img: string;
	name: string;
	age: number;
	zip_code: string;
	breed: string;
}

export interface ResponseData {
	resultIds: string[];
	total: number;
	next: string | null;
	prev: string | null;
}
