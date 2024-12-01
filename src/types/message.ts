export interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  avatar?: string;
  lastSeen?: Date;
  status?: 'online' | 'offline' | 'typing';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'voice';
}

export interface Thread {
  id: string;
  participants: Contact[];
  lastMessage?: Message;
  unreadCount: number;
}