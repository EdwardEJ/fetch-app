import React, { FC, PropsWithChildren, createContext, useState } from 'react';

type AuthContextType = {
	isLoggedIn: boolean;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	setLoggedIn: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isLoggedIn, setLoggedIn] = useState(false);

	return (
		<AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
};
