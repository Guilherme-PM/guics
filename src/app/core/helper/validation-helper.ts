export function isNotNullOrEmpty(value: string | null | undefined): boolean {
  return value != null && value.trim() !== '';
}