import { Action, State } from './types';

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_LOGGED_IN':
			return { ...state, isLoggedIn: action.payload };
		case 'SET_SEARCH_PARAMS':
			return { ...state, searchParams: action.payload };
		default:
			return state;
	}
};
