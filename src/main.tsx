import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import DogProvider from './context/provider.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<DogProvider>
			<App />
		</DogProvider>
	</React.StrictMode>
);
