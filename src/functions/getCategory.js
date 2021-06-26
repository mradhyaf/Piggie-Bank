// Filters an array of objects with a specified category property
export default function getCategory(category, data) {
  return data.filter(el => el.category === category);
}