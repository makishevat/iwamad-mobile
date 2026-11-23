import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useChat } from "../hooks/useChat";
import { sendMessage } from "../lib/chat";
import { useEffect, useState } from "react";
import { askNotificationPermission } from "../lib/notifications";

type ChatPanelProps = {
  eventId: number;
  eventTitle: string;
};

export function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState("");
  useEffect(() => {
  askNotificationPermission();
  }, []);

  const canSend = text.trim().length > 0;

  function handleSend() {
    sendMessage(eventId, text.trim());
    setText("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live chat</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Write a message"
        maxLength={200}
        style={styles.input}
      />
      <Pressable
        onPress={handleSend}
        disabled={!canSend}
        style={[styles.button, !canSend && styles.buttonDisabled]}
      >
        <Text>Send</Text>
      </Pressable>

      {status === "connecting" && <Text>Connecting</Text>}
      {status === "error" && <Text>Chat unavailable</Text>}
      {status === "live" && messages.length === 0 && <Text>No messages yet</Text>}

      {[...messages].reverse().map((m) => (
        <Text key={m.id} style={styles.message}>
          {m.author}: {m.text}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  heading: {
    fontSize: 20,
    marginBottom: 8,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 24,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  message: {
    marginBottom: 4,
  },
});