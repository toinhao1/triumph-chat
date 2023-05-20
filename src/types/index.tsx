export interface MessageType {
	id: string;
	text?: string;
	createdAt?: {
		seconds: number;
	};
	name?: string;
	avatar?: string;
	uid?: string;
}
