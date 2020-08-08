export default async function <T>(
  value: T,
  delayMs: number = 1000
): Promise<T> {
  return new Promise((res) => setTimeout(() => res(value), delayMs));
}
