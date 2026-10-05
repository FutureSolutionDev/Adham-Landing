/**
 * Normalises a typed phone number to the form Adham stores (and the app sends): international
 * digits without "+". Arabic-Indic and Persian digits count as ASCII digits. A leading "00" is
 * dropped; a leading single "0" is an Egyptian local number.
 * Returns null when the result cannot be a phone number.
 */
export function normalizePhone(input: string): string | null {
  // Map Arabic-Indic (U+0660-0669) and Persian (U+06F0-06F9) digits to 0-9 before stripping non-digits.
  const ascii = input.replace(/[٠-٩۰-۹]/g, (d) => {
    const code = d.charCodeAt(0);
    return String(code >= 0x06f0 ? code - 0x06f0 : code - 0x0660);
  });
  let digits = ascii.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = `20${digits.slice(1)}`;
  return digits.length >= 9 && digits.length <= 15 ? digits : null;
}

export type DeleteOutcome = "deleted" | "invalid" | "locked" | "error";

/**
 * Maps Adham's answer to the form's outcome. Only a 200 whose body confirms `data.Deleted === true`
 * counts as deleted: a redirect or an interstitial page (host suspension, WAF) must never tell the
 * visitor their account is gone. `json` is the parsed body, or null when it was not JSON.
 */
export function outcomeFor(status: number, json: unknown): DeleteOutcome {
  if (status === 429) return "locked";
  if (status === 401 || status === 400 || status === 422) return "invalid";
  // Property access is safe on any parsed JSON value except null, which `?.` covers.
  const body = json as { data?: { Deleted?: unknown } | null } | null;
  return status === 200 && body?.data?.Deleted === true ? "deleted" : "error";
}
