import { SearchParams } from '@/types';
import { Dispatch } from 'react';

export type State = {
	isLoggedIn: boolean;
	searchParams: SearchParams;
};

export type Action =
	| { type: 'SET_LOGGED_IN'; payload: boolean }
	| { type: 'SET_SEARCH_PARAMS'; payload: SearchParams };

export type AuthConextDispatch = Dispatch<Action>;

export type AuthContextProps = {
	state: State;
	dispatch: AuthConextDispatch;
} | null;
