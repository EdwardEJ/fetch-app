import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

export type User = {
	name: string;
	email: string;
};

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
	size: number;
	from: number;
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
	next: string;
	prev: string;
}

export interface ProcessedData
	extends Partial<Omit<SearchParams, 'zipCodes' | 'sort'>> {
	zipCodes?: string[];
	sort?: string;
}

export interface Match {
	match: string;
}

export interface InputProps {
	id: string;
	name: string;
	label?: string;
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	min?: string | number;
	max?: string | number;
	value?: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}
