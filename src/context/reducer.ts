import { Action, State } from './types';

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_LOGGED_IN':
			return { ...state, isLoggedIn: action.payload };
		case 'SET_DOG_SEARCH_RESPONSE':
			return { ...state, dogSearchResponse: action.payload };
		case 'SET_SELECTED_FAVORITES':
			if (state.selectedFavorite.includes(action.payload)) {
				return {
					...state,
					selectedFavorite: state.selectedFavorite.filter(
						(value) => value !== action.payload
					),
				};
			} else {
				return {
					...state,
					selectedFavorite: [...state.selectedFavorite, action.payload],
				};
			}
		default:
			return state;
	}
};
