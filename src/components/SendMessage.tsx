import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState, MutableRefObject, FormEvent } from 'react';
import { auth, db } from '../firebase';

export const SendMessage = ({ scroll }: { scroll: MutableRefObject<any> }) => {
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
				createdAt: serverTimestamp(),
				uid,
			});
		} else {
			await addDoc(collection(db, 'messages'), {
				text: message,
				name: displayName,
				createdAt: serverTimestamp(),
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
