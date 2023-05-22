import { Dispatch } from 'react';
import { ResponseData } from '../types';

export type State = {
	isLoggedIn: boolean;
	dogSearchResponse: ResponseData;
};

export type Action =
	| { type: 'SET_LOGGED_IN'; payload: boolean }
	| { type: 'SET_DOG_SEARCH_RESPONSE'; payload: ResponseData };

export type DogContextDispatch = Dispatch<Action>;

export type DogContextProps = {
	state: State;
	dispatch: DogContextDispatch;
} | null;
