import { Action, State } from './types';

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_LOGGED_IN':
			return { ...state, isLoggedIn: action.payload };
		case 'SET_RESULT_DOG_IDS':
			return { ...state, dogIdResults: action.payload };
		default:
			return state;
	}
};
