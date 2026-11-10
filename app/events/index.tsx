import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { EventRow } from "../../src/components/EventRow";
import { useEvents } from "../../src/hooks/useEvents";

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [query, setQuery] = useState("");

  function toggleSaved(id: number) {
    setSavedIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
    );
  }

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Could not load events</Text>
        <Text>{error.message}</Text>
        <Pressable onPress={() => refetch()} style={styles.button}>
          <Text>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const visible = data.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search events"
        style={styles.input}
      />
      <Text style={styles.hint}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>
      <FlatList
        data={visible}
        keyExtractor={(e) => String(e.id)}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onLongPress={() => toggleSaved(item.id)}
          />
        )}
        ListEmptyComponent={<Text>No events match</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 24,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  hint: {
    marginBottom: 12,
  },
});