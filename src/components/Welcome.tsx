import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { auth } from '../firebase';

import GoogleSignin from '../img/btn_google_signin_dark_pressed_web.png';
import { ReactComponent as TriumphLogo } from '../img/logo-symbol.98e44a7.svg';

export const Welcome = ({ skipSignIn }: { skipSignIn: () => void }) => {
	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithRedirect(auth, provider);
	};

	return (
		<main className='welcome'>
			<h2>Welcome to Triumph Chat</h2>
			<TriumphLogo width={100} height={100} />
			<p>Sign in with Google to chat!</p>
			<button className='sign-in'>
				<img onClick={googleSignIn} src={GoogleSignin} alt='sign in with google' />
			</button>
			<p>Skip Sign In</p>
			<button className='skip-signin' onClick={skipSignIn}>
				Continue to chat
			</button>
		</main>
	);
};
