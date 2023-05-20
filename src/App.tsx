import { useAuthState } from 'react-firebase-hooks/auth';

import './App.css';
import { NavBar } from './components/NavBar';
import { Chat } from './components/Chat';
import { Welcome } from './components/Welcome';
import { auth } from './firebase';

export const App = () => {
	const [user] = useAuthState(auth);

	return (
		<div className='App'>
			<NavBar />
			{!user ? (
				<Welcome />
			) : (
				<>
					<Chat />
				</>
			)}
		</div>
	);
};
