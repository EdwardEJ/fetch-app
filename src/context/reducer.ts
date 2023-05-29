import { DOG_CONTEXT_ACTIONS } from './helpers/dogContextActions';
import { toggleSelectedFavorite } from './helpers/toggleSelectedFavorite';
import { Action, State } from './types';

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case DOG_CONTEXT_ACTIONS.SET_LOGGED_IN:
			return { ...state, isLoggedIn: action.payload };
		case DOG_CONTEXT_ACTIONS.SET_DOG_SEARCH_RESPONSE:
			return { ...state, dogSearchResponse: action.payload };
		case DOG_CONTEXT_ACTIONS.SET_USER_INFO:
			return { ...state, userInfo: action.payload };
		case DOG_CONTEXT_ACTIONS.SET_SELECTED_FAVORITES:
			return {
				...state,
				selectedFavorite: toggleSelectedFavorite(
					state.selectedFavorite,
					action.payload
				),
			};
		case DOG_CONTEXT_ACTIONS.SET_MATCHED_DOG:
			return { ...state, matchedDog: action.payload };
		default:
			return state;
	}
};
