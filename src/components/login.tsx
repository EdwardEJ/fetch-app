import { FC, FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../utils/auth';
import { User } from '../types';

const Login: FC = () => {
	const { setLoggedIn } = useContext(AuthContext);
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
				setLoggedIn(true);
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
		<form onSubmit={handleSubmit}>
			<label htmlFor='name'>Name</label>
			<input
				type='text'
				id='name'
				name='name'
				placeholder='Enter Name'
				value={credentials.name}
				onChange={handleChange}
				required
				autoComplete='name'
			/>
			<label htmlFor='email'>Email</label>
			<input
				type='email'
				id='email'
				name='email'
				placeholder='Enter Email'
				value={credentials.email}
				onChange={handleChange}
				required
				autoComplete='email'
			/>
			<button type='submit' aria-label='Log in'>
				Log in
			</button>
			{error && <p>{error}</p>}
		</form>
	);
};

export default Login;
