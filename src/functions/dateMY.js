export default function dateMY(date) {
  return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
}