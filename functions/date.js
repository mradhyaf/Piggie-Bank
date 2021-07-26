export function format(dateString, style) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const monthString = monthNames[month - 1];
  const year = date.getFullYear();

  switch (style) {
    case "MM/YYYY":
      return `${month}/${year}`;
    case "Month YYYY":
      return `${monthString} ${year}`;
    case "DD/MM/YYYY":
    default:
      return `${day}/${month}/${year}`;
  }
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
