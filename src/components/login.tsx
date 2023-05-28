import { FC, useState } from 'react';
import { User } from '../types';
import { login } from '../utils/auth';
import useDogContext from '../context/useDogContext';
import { useForm } from 'react-hook-form';
import { FormInput } from './form-input';
import { useEnterAnimation } from '../animations/useEnterAnimation';

const Login: FC = () => {
	const { dispatch } = useDogContext();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<User>();
	const [error, setError] = useState('');
	const shouldAnimate = useEnterAnimation();

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
			className={`flex flex-col h-96 gap-2 border border-gray-200 p-4 rounded-md shadow-sm max-w-screen-sm justify-center ${
				shouldAnimate ? 'login-enter' : 'opacity-0 -translate-y-8'
			}`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='flex flex-col text-center mb-4'>
				<h1 className='text-2xl font-semibold text-indigo-800'>
					Welcome to Fetch!
				</h1>
				<p className='text-white'>
					Login to continue and find you next dog companion
				</p>
			</div>
			<FormInput
				id='name'
				name='name'
				label='Name'
				required
				placeholder='Enter Name'
				error={errors.name}
				register={register}
				rules={{
					required: 'Please enter your name',
				}}
			/>
			<FormInput
				id='email'
				name='email'
				label='Email'
				required
				placeholder='Enter Email'
				error={errors.email}
				register={register}
				rules={{
					required: 'Please enter you email',
				}}
			/>

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
