import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ChatPanel } from "../../src/components/ChatPanel";
import { HolidayNote } from "../../src/components/HolidayNote";
import { useEvents } from "../../src/hooks/useEvents";

export default function EventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError, error, refetch } = useEvents();

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Text>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Could not load events</Text>
        <Text>{error.message}</Text>
        <Pressable onPress={() => refetch()} style={styles.button}>
          <Text>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const event = data.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Not found" }} />
        <Text style={styles.title}>Event not found</Text>
        <Text>No event with id {id}.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Stack.Screen options={{ title: event.title }} />
      <Text style={styles.title}>{event.title}</Text>
      <Text>Date: {event.date}</Text>
      <HolidayNote date={event.date} />
      <Text>Place: {event.place}</Text>
      <Text>Seats: {event.seats}</Text>
      <ChatPanel eventId={event.id} eventTitle={event.title} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  button: {
    minHeight: 44,
    padding: 12,
  },
});