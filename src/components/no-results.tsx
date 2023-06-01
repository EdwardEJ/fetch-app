import sadDog from '../assets/sad-dog-drawing-9.jpg';

export const NoResults = () => {
	return (
		<div className='flex flex-col items-center gap-2 mt-2'>
			<img className='w-40 aspect-square' src={sadDog} alt='sad dog' />
			<p className='text-sm font-medium'>
				We couldnt find any results. Please try again with different search
				options
			</p>
		</div>
	);
};
