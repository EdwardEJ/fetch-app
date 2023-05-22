import {
	FC,
	PropsWithChildren,
	createContext,
	useContext,
	useReducer,
} from 'react';
import { reducer } from './reducer';
import { DogContextProps, State } from './types';

const initialState: State = {
	dogSearchResponse: {
		next: null,
		prev: null,
		resultIds: [],
		total: 0,
	},
	isLoggedIn: false,
};

export const DogStateContext = createContext<DogContextProps>(null);

const DogProvider: FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const value = { state, dispatch };

	return (
		<DogStateContext.Provider value={value}>
			{children}
		</DogStateContext.Provider>
	);
};

function useDogContext() {
	const context = useContext(DogStateContext);

	if (context === null) {
		throw new Error('useDogContext must be used within a DogProvider');
	}

	return context;
}

export { DogProvider, useDogContext };
