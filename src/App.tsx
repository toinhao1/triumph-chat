import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { faker } from '@faker-js/faker';

import './App.css';
import { NavBar } from './components/NavBar';
import { Chat } from './components/Chat';
import { Welcome } from './components/Welcome';
import { auth } from './firebase';

export const App = () => {
	const [user] = useAuthState(auth);
	const [guestUserName, setGuestUsername] = useState('');

	const handleSkipSignIn = () => {
		const randomName = `${faker.person.firstName()} ${faker.person.jobTitle()}`;
		setGuestUsername(randomName);
	};

	return (
		<div className='App'>
			<NavBar guestUser={guestUserName} />
			{!user && !guestUserName ? (
				<Welcome skipSignIn={handleSkipSignIn} />
			) : (
				<>
					<Chat guestUser={guestUserName} />
				</>
			)}
		</div>
	);
};
