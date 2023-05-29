import { FC, PropsWithChildren, useReducer } from 'react';
import { reducer } from './reducer';
import { State } from './types';
import { DogStateContext } from './dog-context-state';

const initialState: State = {
	dogSearchResponse: {
		next: null,
		prev: null,
		resultIds: [],
		total: 0,
	},
	isLoggedIn: false,
	userInfo: {
		name: '',
		email: '',
	},
	selectedFavorite: [],
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
