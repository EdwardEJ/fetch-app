import { FC, PropsWithChildren, useReducer } from 'react';
import { reducer } from './reducer';
import { State } from './types';
import { DogStateContext } from './dog-context-state';

const initialState: State = {
	dogSearchResponse: {
		resultIds: [],
		total: 0,
		next: '',
		prev: '',
	},
	isLoggedIn: false,
	userInfo: {
		name: '',
		email: '',
	},
	selectedFavorite: [],
	matchedDog: {
		age: 0,
		breed: '',
		id: '',
		img: '',
		name: '',
		zip_code: '',
	},
};

const DogProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const value = { state, dispatch };

	return (
		<DogStateContext.Provider value={value}>
			{children}
		</DogStateContext.Provider>
	);
};

export default DogProvider;
