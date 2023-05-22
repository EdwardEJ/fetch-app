import { Dispatch } from 'react';

export type State = {
	isLoggedIn: boolean;
	dogIdResults: string[];
};

export type Action =
	| { type: 'SET_LOGGED_IN'; payload: boolean }
	| { type: 'SET_RESULT_DOG_IDS'; payload: string[] };

export type DogContextDispatch = Dispatch<Action>;

export type DogContextProps = {
	state: State;
	dispatch: DogContextDispatch;
} | null;
