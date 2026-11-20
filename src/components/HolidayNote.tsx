import { Text } from "react-native";
import { useHolidays } from "../hooks/useHolidays";

export function HolidayNote({ date }: { date: string }) {
  const year = Number(date.slice(0, 4));
  const { data, isPending, isError } = useHolidays(year);

  if (isPending) {
    return <Text>Checking holidays</Text>;
  }

  if (isError) {
    return <Text>Holidays unavailable</Text>;
  }

  const holiday = data.find((h) => h.date === date);

  return (
    <Text>
      {holiday ? `Public holiday: ${holiday.name}` : "Not a public holiday"}
    </Text>
  );
}