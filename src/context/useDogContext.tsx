import { useContext } from 'react';
import { DogStateContext } from './dog-context-state';

function useDogContext() {
	const context = useContext(DogStateContext);

	if (context === null) {
		throw new Error('useDogContext must be used within a DogProvider');
	}

	return context;
}

export default useDogContext;
