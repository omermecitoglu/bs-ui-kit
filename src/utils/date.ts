export function formatDate(iso8601: string, locale: string, dateStyle?: Intl.DateTimeFormatOptions["dateStyle"]) {
  const date = new Date(iso8601);
  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle,
  });
  return formatter.format(date);
}

function getDayOfWeek(date: Date, startDay: "saturday" | "sunday" | "monday") {
  switch (startDay) {
    case "saturday":
      return (date.getDay() + 1) % 7;
    case "sunday":
      return date.getDay();
    case "monday":
      return (date.getDay() + 6) % 7;
    default:
      throw new Error("Unknown start day");
  }
}

export function getFirstDayOfWeek(input: Date, startDay: "saturday" | "sunday" | "monday") {
  return adjustDate(input, -1 * getDayOfWeek(input, startDay));
}

function isSameYear(date1: Date, date2: Date) {
  return date1.getFullYear() === date2.getFullYear();
}

export function isSameMonth(date1: Date, date2: Date) {
  if (!isSameYear(date1, date2)) return false;
  return date1.getMonth() === date2.getMonth();
}

export function isSameDay(date1: Date, date2: Date) {
  if (!isSameYear(date1, date2)) return false;
  if (!isSameMonth(date1, date2)) return false;
  return date1.getDate() === date2.getDate();
}

export function adjustDate(input: Date, days: number) {
  const output = new Date(input.getTime());
  output.setDate(input.getDate() + days);
  return output;
}
