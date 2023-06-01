import {
	FieldError,
	FieldValues,
	Path,
	RegisterOptions,
	UseFormRegister,
} from 'react-hook-form';
import { InputProps } from '../types';
import Input from './input';

export type FormInputProps<TFormValues extends FieldValues> = {
	error?: FieldError;
	name: Path<TFormValues>;
	rules?: RegisterOptions;
	required?: boolean;
	children?: React.ReactNode;
	register?: UseFormRegister<TFormValues>;
} & Omit<InputProps, 'name'>;

export const FormInput = <TFormValues extends Record<string, unknown>>({
	label,
	placeholder,
	required,
	error,
	name,
	rules,
	register,
}: FormInputProps<TFormValues>): JSX.Element => {
	return (
		<div className='flex flex-col'>
			<div className='flex justify-between items-end text-sm font-medium'>
				<label htmlFor={name} className='text-gray-800'>
					{label}
				</label>
				{required && <span className='text-gray-600 text-xs'>Required</span>}
			</div>
			<div className='flex flex-col mt-1'>
				<Input
					id={name}
					name={name}
					label={label}
					placeholder={placeholder}
					{...(register && register(name, rules))}
				/>
				{error && <p className='text-xs text-gray-800 mt-1'>{error.message}</p>}
			</div>
		</div>
	);
};
