export function formatCurrency(
  value: number | string | null | undefined
): string {
  if (value === null || value === undefined || value === "") return "";

  const num =
    typeof value === "number" ? value : Number(String(value).replace(/,/g, ""));
  if (!isFinite(num)) return "";

  return new Intl.NumberFormat("ja-JP", {
    useGrouping: true,
    maximumFractionDigits: 0,
  }).format(num);
}
