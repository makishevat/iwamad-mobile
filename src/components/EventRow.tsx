import { Pressable, StyleSheet, Text } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from "react-native-reanimated";
import type { CampusEvent } from "../data/events";

type EventRowProps = {
  event: CampusEvent;
  saved?: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export function EventRow({ event, saved, onPress, onToggleSaved }: EventRowProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
      style={styles.wrapper}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{saved ? "Unsave" : "Save"}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text>
            {event.date} · {event.place}
          </Text>
           {saved && (<Animated.Text entering={ZoomIn} style={styles.badge}>★ Saved</Animated.Text>)}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  card: {
    minHeight: 44,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  cardPressed: {
    backgroundColor: "#e5e7eb",
  },
  title: {
    fontSize: 18,
  },
  action: {
    minHeight: 44,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "#1d4ed8",
  },
  actionText: {
    color: "#fff",
  },
  badge: {
  alignSelf: "flex-start",
},
});