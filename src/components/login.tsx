import { FC, useState } from 'react';
import { User } from '../types';
import { login } from '../utils/auth';
import useDogContext from '../context/useDogContext';
import { useForm } from 'react-hook-form';

const Login: FC = () => {
	const { dispatch } = useDogContext();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<User>();
	const [error, setError] = useState('');

	const onSubmit = (data: User) => {
		login({ name: data.name, email: data.email })
			.then((user) => {
				if (user) {
					dispatch({
						type: 'SET_LOGGED_IN',
						payload: true,
					});
				}
			})
			.catch((err) => {
				const errorMessage =
					(err as Error).message || 'An error occurred while logging in.';
				setError(errorMessage);
			});
	};

	return (
		<form
			className='flex flex-col h-96 gap-2 border border-gray-200 p-4 rounded-md items-center shadow-sm max-w-screen-sm justify-center'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex flex-col text-center mb-4'>
				<h1 className='text-2xl font-semibold'>Welcome to Fetch!</h1>
				<p>Login to continue and find you next dog companion</p>
			</div>
			<div className='flex gap-2 items-center'>
				<label className='text-sm' htmlFor='name'>
					Name
				</label>
				<input
					className='border border-blue-600 rounded-md outline-none focus:border-blue-600 placeholder-gray-500 py-1 px-2 placeholder:text-sm w-full'
					type='text'
					id='name'
					{...register('name', { required: true })}
					placeholder='Enter Name'
				/>
				{errors.name && <p>Name is required.</p>}
			</div>
			<div className='flex gap-2 items-center'>
				<label className='text-sm' htmlFor='email'>
					Email
				</label>
				<input
					className='border border-blue-600 rounded-md outline-none focus:border-blue-600 placeholder-gray-500 py-1 px-2 placeholder:text-sm w-full'
					type='email'
					id='email'
					{...register('email', { required: true })}
					placeholder='Enter Email'
				/>
				{errors.email && <p>Email is required.</p>}
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
