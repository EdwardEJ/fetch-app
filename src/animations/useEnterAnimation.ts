import { useState, useEffect } from 'react';

export const useEnterAnimation = (delay = 500) => {
	const [shouldAnimate, setShouldAnimate] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShouldAnimate(true);
		}, delay);

		return () => clearTimeout(timeout);
	}, [delay]);

	return shouldAnimate;
};
