export function format(dateString, style) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  switch (style) {
    case 'DDMMYYYY':
    default:
      return `${day}/${month}/${year}`;
  }
}