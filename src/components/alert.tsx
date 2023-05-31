import { FC, useState } from 'react';

type AlertProps = {
	title: string;
	description: string;
	alert: 'success' | 'warning' | 'danger';
};

export const Alert: FC<AlertProps> = ({
	title,
	description,
	alert,
}: AlertProps) => {
	const alertColor =
		{
			success: {
				background: 'bg-green-100',
				border: 'bg-green-400',
				btnColor: 'text-green-400',
			},
			warning: {
				background: 'bg-yellow-100',
				border: 'bg-yellow-400',
				btnColor: 'text-yellow-400',
			},
			danger: {
				background: 'bg-red-100',
				border: 'bg-red-400',
				btnColor: 'text-red-400',
			},
		}[alert] ?? 'bg-white';

	return (
		<div
			className={`relative flex p-4 rounded-lg border-l-4 border-l-red-400 justify-between login-enter ${alertColor.background} ${alertColor.border}`}
		>
			<div className='flex flex-col'>
				<div className='text-sm font-semibold '>{title}</div>
				<div className='text-sm'>{description}</div>
			</div>
			<button
				onClick={close}
				className={`absolute right-4 top-2 text-red-400 font-bold ${alertColor.btnColor}`}
			>
				&#120;
			</button>
		</div>
	);
};
