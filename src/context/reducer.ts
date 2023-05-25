import { Action, State } from './types';

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_LOGGED_IN':
			return { ...state, isLoggedIn: action.payload };
		case 'SET_DOG_SEARCH_RESPONSE':
			return { ...state, dogSearchResponse: action.payload };
		default:
			return state;
	}
};
