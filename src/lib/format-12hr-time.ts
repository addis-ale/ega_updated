export const formatTime12Hour = (time24: string) => {
  if (!time24) return "";
  const [hoursStr, minutes] = time24.split(":");
  let hours = parseInt(hoursStr, 10);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 -> 12
  return `${hours}:${minutes} ${ampm}`;
};
