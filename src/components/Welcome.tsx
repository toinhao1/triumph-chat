import React from 'react';
import GoogleSignin from '../img/btn_google_signin_dark_pressed_web.png';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

export const Welcome = () => {
	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithRedirect(auth, provider);
	};

	return (
		<main className='welcome'>
			<h2>Welcome to Triumph Chat.</h2>
			<img src='/logo-symbol.98e44ay.svg' alt='Triumph Logo' width={50} height={50} />
			<p>Sign in with Google to chat!.</p>
			<button className='sign-in'>
				<img onClick={googleSignIn} src={GoogleSignin} alt='sign in with google' />
			</button>
		</main>
	);
};
