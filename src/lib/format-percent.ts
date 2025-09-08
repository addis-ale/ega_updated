export function formatPercentage(
  value: number,
  fractionDigits: number = 0
): string {
  return `${value.toFixed(fractionDigits)}%`;
}
