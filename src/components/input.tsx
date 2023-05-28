import { FC, forwardRef } from 'react';
import { InputProps } from '../types';

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			id,
			type = 'text',
			placeholder,
			value,
			label,
			onChange,
			className,
			...props
		},
		ref
	) => {
		return (
			<input
				id={id}
				ref={ref}
				type={type}
				aria-label={label}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={`border border-gray-300 shadow-sm text-sm placeholder:text-sm rounded-md focus:border-blue-600 hover:border-blue-600 outline-blue-600 placeholder-gray-500 py-1 px-2 w-full ${className}`}
				{...props}
			/>
		);
	}
);

export default Input;
