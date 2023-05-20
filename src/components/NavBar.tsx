import { useAuthState } from 'react-firebase-hooks/auth';
import { ReactComponent as TriumphLogo } from '../img/logo-symbol.98e44a7.svg';

import { auth } from '../firebase';

export const NavBar = ({ guestUser }: { guestUser: string }) => {
	const [user] = useAuthState(auth);

	const signOut = () => {
		if (guestUser) {
			window.location.reload();
		} else if (user) {
			auth.signOut();
		}
	};

	return (
		<nav className='nav-bar'>
			<div>
				<div style={{ display: 'inline-block' }}>
					<TriumphLogo style={{ paddingTop: 12 }} width={42} height={42} />
				</div>
				<div style={{ display: 'inline-block', paddingLeft: 5 }}>
					<h1 style={{ fontSize: 32 }}>Triumph Chat</h1>
				</div>
			</div>
			{user || guestUser ? (
				<button onClick={signOut} className='sign-out' type='button'>
					Sign Out
				</button>
			) : null}
		</nav>
	);
};
