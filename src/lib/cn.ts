/** Minimal className combiner — joins truthy values with a space. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
