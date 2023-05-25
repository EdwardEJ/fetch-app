export interface User {
	name: string;
	email: string;
}

export interface Error {
	message: string;
	status: number;
}

export interface Sort {
	field: string;
	order: 'asc' | 'desc';
}

export interface SearchParams {
	breeds: string[];
	zipCodes: string;
	ageMin: number | null;
	ageMax: number | null;
	sort: Sort;
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

export interface ProcessedData
	extends Partial<Omit<SearchParams, 'zipCodes' | 'sort'>> {
	zipCodes?: string[];
	sort?: string;
}
