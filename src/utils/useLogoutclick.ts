import useDogContext from '../context/useDogContext';
import { logout } from './auth';

export const useLogoutClick = () => {
	const { dispatch } = useDogContext();

	return logout()
		.then(() => {
			dispatch({
				type: 'SET_LOGGED_IN',
				payload: false,
			});
		})
		.catch((error) => {
			console.error(error);
		});
};
