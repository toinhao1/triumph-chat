import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MessageType } from '../types';

export const Message = ({ message, guestUser }: { message: MessageType; guestUser: string }) => {
	const [user] = useAuthState(auth);

	const correctuser = guestUser ? guestUser : user?.uid;

	const messageDate = message?.createdAt?.seconds
		? new Date(message?.createdAt?.seconds * 1000).toISOString()
		: null;

	return (
		<div className={`chat-bubble ${message.uid === correctuser ? 'right' : ''}`}>
			<img className='chat-bubble__left' src={message.avatar} alt='user avatar' />
			<div className='chat-bubble__right'>
				<p className='user-name'>{messageDate}</p>
				<p className='user-name'>{message.name}</p>
				<p className='user-message'>{message.text}</p>
			</div>
		</div>
	);
};
