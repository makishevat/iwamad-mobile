import {
  limitToLast,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  serverTimestamp,
} from 'firebase/database';
import { Platform } from 'react-native';
import { db } from './firebase';

export type ChatMessage = {
  id: string;
  author: string;
  text: string;
  sentAt: number;
  deviceId: string;
};

const MY_NAME = 'Tomiris';
export const AUTHOR = `${MY_NAME} (${Platform.OS})`;

// A new random id every time the app starts: it tells this app's messages from others'.
export const DEVICE_ID = 'd-' + Math.random().toString(36).slice(2, 10);

export function sendMessage(eventId: number, text: string) {
  return push(ref(db, `chats/${eventId}`), {
    author: AUTHOR,
    text,
    sentAt: serverTimestamp(),
    deviceId: DEVICE_ID,
  });
}

export function subscribeToChat(
  eventId: number,
  onMessages: (messages: ChatMessage[]) => void,
  onError: () => void,
) {
  const chatQuery = query(ref(db, `chats/${eventId}`), orderByChild('sentAt'), limitToLast(50));
  return onValue(
    chatQuery,
    (snapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((child) => {
        messages.push({ id: child.key!, ...child.val() });
      });
      onMessages(messages);
    },
    onError,
  );
}