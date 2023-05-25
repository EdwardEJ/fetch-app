import { FC, FormEvent, useState } from 'react';
import { useDogContext } from '../context/dog-context';
import { User } from '../types';
import { login } from '../utils/auth';

const Login: FC = () => {
	const { dispatch } = useDogContext();
	const [credentials, setCredentials] = useState<User>({
		name: '',
		email: '',
	});
	const [error, setError] = useState('');

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const user = await login(credentials.name, credentials.email);
			if (user) {
				dispatch({
					type: 'SET_LOGGED_IN',
					payload: true,
				});
			}
		} catch (err) {
			const errorMessage =
				(err as Error).message || 'An error occurred while logging in.';
			setError(errorMessage);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setCredentials((prevCredentials) => ({
			...prevCredentials,
			[name]: value,
		}));
	};

	return (
		<form className='flex flex-row gap-4' onSubmit={handleSubmit}>
			<div className='flex gap-2 items-center'>
				<label className='text-sm' htmlFor='name'>
					Name
				</label>
				<input
					className='border border-blue-600 rounded-md outline-none focus:border-blue-600 placeholder-gray-500 py-1 px-2 placeholder:text-sm'
					type='text'
					id='name'
					name='name'
					placeholder='Enter Name'
					value={credentials.name}
					onChange={handleChange}
					required
					autoComplete='name'
				/>
			</div>
			<div className='flex gap-2 items-center'>
				<label className='text-sm' htmlFor='email'>
					Email
				</label>
				<input
					className='border border-blue-600 rounded-md outline-none focus:border-blue-600 placeholder-gray-500 py-1 px-2 placeholder:text-sm'
					type='email'
					id='email'
					name='email'
					placeholder='Enter Email'
					value={credentials.email}
					onChange={handleChange}
					required
					autoComplete='email'
				/>
			</div>
			<button
				className='text-sm rounded-md px-4 py-2 text-white bg-blue-500'
				type='submit'
				aria-label='Log in'
			>
				Log in
			</button>
			{error && <p>{error}</p>}
		</form>
	);
};

export default Login;
