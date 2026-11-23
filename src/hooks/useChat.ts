import { useEffect, useState } from 'react';
import { subscribeToChat, type ChatMessage } from '../lib/chat';

export function useChat(eventId: number, eventTitle: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<'connecting' | 'live' | 'error'>('connecting');

  useEffect(() => {
    const unsubscribe = subscribeToChat(
      eventId,
      (list) => {
        setMessages(list);
        setStatus('live');
      },
      () => setStatus('error'),
    );
    return unsubscribe;
  }, [eventId, eventTitle]);

  return { messages, status };
}