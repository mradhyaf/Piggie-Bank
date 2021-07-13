// Returns the input if a function is given and returns a no-op otherwise
export default function optionalFunction(f) {
  return typeof f == 'function'
    ? f
    : () => {}
}