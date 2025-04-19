import { formatDistanceToNow, isToday, isYesterday, format } from "date-fns";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (isToday(date)) {
    return formatDistanceToNow(date) + " ago"; // e.g., "1 hour ago"
  } else if (isYesterday(date)) {
    return "Yesterday"; // if the date was yesterday
  } else {
    return format(date, "d/M/yyyy"); // otherwise, return the full date (e.g., 2/4/2025)
  }
};

console.log(formatDate("2025-04-07T12:11:01.253Z"))

export default formatDate