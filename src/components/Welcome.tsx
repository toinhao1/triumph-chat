import { ReactComponent as TriumphLogo } from '../img/logo-symbol.98e44a7.svg';

export const Welcome = ({ skipSignIn }: { skipSignIn: () => void }) => {
	return (
		<main className='welcome'>
			<h2>Welcome to Triumph Chat</h2>
			<TriumphLogo width={100} height={100} />
			<p>Skip sign in</p>
			<button className='skip-signin' onClick={skipSignIn}>
				Continue to chat
			</button>
		</main>
	);
};
