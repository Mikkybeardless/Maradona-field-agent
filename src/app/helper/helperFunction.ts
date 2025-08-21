import dayjs from "dayjs";

export function generateRandomNumber(max: number, min: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const formatDayJs = (date: dayjs.Dayjs | null): string => {
  if (!date) return "";
  const formatted = dayjs(date).toISOString();
  return formatted;
};
export default formatDayJs;

export const formatIsoString = (
  isoString: string
): { formattedDate: string; formattedTime: string } => {
  const date = new Date(isoString);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  // Format the date and time
  let formattedDate = date.toLocaleDateString("en-GB");
  // Format time with AM/PM
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Ensures AM/PM format
  });
  formattedDate = `${dayName}, ${formattedDate}`;

  return { formattedDate, formattedTime };
};

export const buildCleanParams = (
  filters: Record<string, string | string[]>,
  query?: string,
  page?: number,
  per_page?: number
): URLSearchParams => {
  const params = new URLSearchParams();

  // Add search query if it exists
  if (query && query.trim() !== "") {
    params.set("search", query);
  }
  if (page && per_page) {
    params.set("page", page.toString());
    params.set("per_page", per_page.toString());
  }

  // Add filters with proper cleaning
  Object.entries(filters).forEach(([key, value]) => {
    // Skip if value is falsy or empty
    if (!value || value === "" || value === "all" || value === "any") {
      return;
    }

    // Handle arrays (for multi-select filters)
    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.set(key, value.join(","));
      }
      return;
    }

    // Handle objects (for complex filters like price ranges)
    if (typeof value === "object") {
      // Skip if all properties are empty
      const hasValue = Object.values(value).some(
        (v) => v !== "" && v !== null && v !== undefined
      );
      if (hasValue) {
        params.set(key, JSON.stringify(value));
      }
      return;
    }

    // Handle primitive values
    params.set(key, String(value));
  });

  return params;
};
