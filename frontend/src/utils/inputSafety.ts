export function isUnsafeInput(value: string): boolean {
  return /<[^>]*>|[<>]/.test(value);
}
