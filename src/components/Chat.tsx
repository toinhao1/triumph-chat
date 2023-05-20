import { useEffect, useRef, useState } from 'react';
import { query, collection, orderBy, onSnapshot, limit, Unsubscribe } from 'firebase/firestore';
import { db } from '../firebase';
import { Message } from './Message';
import { SendMessage } from './SendMessage';
import { MessageType } from '../types';

export const Chat = ({ guestUser }: { guestUser: string }) => {
	const [messages, setMessages] = useState<MessageType[]>([]);
	const scroll = useRef(null);

	const useUnsubScribe = () => {
		let unsubscribe = useRef<Unsubscribe>();
		useEffect(() => {
			const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'), limit(75));
			unsubscribe.current = onSnapshot(q, (QuerySnapshot) => {
				const fetchedMessages: MessageType[] = [];
				QuerySnapshot.forEach((doc) => {
					const documentToUuse = doc.data({ serverTimestamps: 'estimate' });
					fetchedMessages.push({ ...documentToUuse, id: doc.id });
				});
				const sortedMessages = fetchedMessages.sort(
					(a, b) =>
						(a.createdAt ? a.createdAt?.seconds : 0) - (b.createdAt ? b.createdAt?.seconds : 0),
				);
				setMessages(sortedMessages);
			});
		}, []);
		return () => unsubscribe;
	};

	useUnsubScribe();

	return (
		<main className='chat-box'>
			<div className='messages-wrapper'>
				{messages?.map((message) => (
					<Message guestUser={guestUser} key={message.id} message={message} />
				))}
			</div>
			<span ref={scroll}></span>
			<SendMessage guestUser={guestUser} scroll={scroll} />
		</main>
	);
};
