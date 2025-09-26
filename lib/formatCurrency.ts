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

export async function getUsdToJpyRate(): Promise<number> {
  const res = await fetch(
    "https://fxverify.com/api/widgets/currencies/exchange-rate?from=USD&to=JPY",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.rate?.toFixed(2) || 1;
}
