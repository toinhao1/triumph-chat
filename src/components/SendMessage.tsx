import { addDoc, collection } from 'firebase/firestore';
import { useState, MutableRefObject, FormEvent } from 'react';
import { auth, db } from '../firebase';

export const SendMessage = ({
	scroll,
	guestUser,
}: {
	scroll: MutableRefObject<any>;
	guestUser: string;
}) => {
	const [message, setMessage] = useState('');

	const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (message.trim() === '') {
			alert('Enter valid message');
			return;
		}
		if (auth.currentUser) {
			const { uid, displayName, photoURL } = auth.currentUser;
			await addDoc(collection(db, 'messages'), {
				text: message,
				name: displayName,
				avatar: photoURL,
				createdAt: new Date(),
				uid,
			});
		} else {
			await addDoc(collection(db, 'messages'), {
				text: message,
				name: guestUser,
				createdAt: new Date(),
				avatar: 'https://gravatar.com/avatar/84018e5801585b89f0d478d2fb5cb7be?s=400&d=robohash&r=x',
				uid: guestUser,
			});
		}
		setMessage('');
		scroll.current.scrollIntoView({ behavior: 'smooth' });
	};
	return (
		<form onSubmit={(event) => sendMessage(event)} className='send-message'>
			<label htmlFor='messageInput' hidden>
				Enter Message
			</label>
			<input
				id='messageInput'
				name='messageInput'
				type='text'
				className='form-input__input'
				placeholder='type message...'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button type='submit'>Send</button>
		</form>
	);
};
