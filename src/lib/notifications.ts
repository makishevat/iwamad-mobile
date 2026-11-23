import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import type { ChatMessage } from './chat';

const supported = Platform.OS !== 'web';

if (supported) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

export async function askNotificationPermission(): Promise<void> {
  if (!supported) {
    return;
  }
  await Notifications.requestPermissionsAsync();
}

export async function notifyNewMessage(eventTitle: string, message: ChatMessage): Promise<void> {
  if (!supported) {
    return;
  }
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `New message: ${eventTitle}`,
      body: `${message.author}: ${message.text}`,
    },
    trigger: null,
  });
}