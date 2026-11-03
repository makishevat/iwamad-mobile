import { Pressable, StyleSheet, Text } from "react-native";
import type { CampusEvent } from "../data/events";

type EventRowProps = {
  event: CampusEvent;
  saved?: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

export function EventRow({ event, saved, onPress, onLongPress }: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text>
        {event.date} · {event.place}
      </Text>
      {saved && <Text>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
  },
  cardPressed: {
    backgroundColor: "#e5e7eb",
  },
  title: {
    fontSize: 18,
  },
});