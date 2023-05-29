import { useState, useEffect } from 'react';

export const useCollapseOnScroll = () => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;

			if (scrollY > 0) {
				setIsCollapsed(true);
			} else {
				setIsCollapsed(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return isCollapsed;
};
