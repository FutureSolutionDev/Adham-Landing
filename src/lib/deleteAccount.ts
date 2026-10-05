/**
 * Normalises a typed phone number to the form Adham stores (and the app sends): international
 * digits without "+". A leading "00" is dropped; a leading single "0" is an Egyptian local number.
 * Returns null when the result cannot be a phone number.
 */
export function normalizePhone(input: string): string | null {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = `20${digits.slice(1)}`;
  return digits.length >= 9 && digits.length <= 15 ? digits : null;
}
