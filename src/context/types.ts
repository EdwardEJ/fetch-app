import { Dispatch } from 'react';
import { ResponseData, Dog, User } from '../types';

export type State = {
	isLoggedIn: boolean;
	dogSearchResponse: ResponseData;
	selectedFavorite: Dog['id'][];
	userInfo: User;
	matchedDog: Dog;
};

export type Action =
	| { type: 'SET_LOGGED_IN'; payload: boolean }
	| { type: 'SET_USER_INFO'; payload: User }
	| { type: 'SET_DOG_SEARCH_RESPONSE'; payload: ResponseData }
	| { type: 'SET_SELECTED_FAVORITES'; payload: Dog['id'] }
	| { type: 'SET_MATCHED_DOG'; payload: Dog };

export type DogContextDispatch = Dispatch<Action>;

export type DogContextProps = {
	state: State;
	dispatch: DogContextDispatch;
} | null;
