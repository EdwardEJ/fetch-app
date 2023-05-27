import { Dispatch } from 'react';
import { ResponseData, Dog } from '../types';

export type State = {
	isLoggedIn: boolean;
	dogSearchResponse: ResponseData;
	selectedFavorite: Dog['id'][];
};

export type Action =
	| { type: 'SET_LOGGED_IN'; payload: boolean }
	| { type: 'SET_DOG_SEARCH_RESPONSE'; payload: ResponseData }
	| { type: 'SET_SELECTED_FAVORITES'; payload: Dog['id'] };

export type DogContextDispatch = Dispatch<Action>;

export type DogContextProps = {
	state: State;
	dispatch: DogContextDispatch;
} | null;
