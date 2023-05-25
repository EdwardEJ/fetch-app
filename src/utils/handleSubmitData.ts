import { ProcessedData, SearchParams } from '../types';

export const handleSubmitData = (data: Partial<SearchParams>) => {
	const processedData: ProcessedData = {};

	if (data.breeds) {
		processedData.breeds = data.breeds;
	}

	if (data.zipCodes) {
		processedData.zipCodes = data.zipCodes
			.split(',')
			.map((zipCode) => zipCode.trim());
	}

	if (data.ageMax) {
		processedData.ageMax = data.ageMax;
	}

	if (data.ageMin) {
		processedData.ageMin = data.ageMin;
	}

	if (data.sort) {
		processedData.sort = `${data.sort.field ? data.sort.field : 'breed'}:${
			data.sort.order ? data.sort.order : 'asc'
		}`;
	}

	return processedData;
};
