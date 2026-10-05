// Checks normalizePhone: the web form must send numbers in the stored form (international digits, no "+").
// Run: node --experimental-strip-types Scripts/CheckNormalizePhone.mts
// @ts-expect-error -- Node type stripping needs the explicit .ts extension
import { normalizePhone } from "../src/lib/deleteAccount.ts";

const cases: Array<[string, string | null]> = [
  ["01012345678", "201012345678"],
  ["+20 101 234 5678", "201012345678"],
  ["00201012345678", "201012345678"],
  ["201012345678", "201012345678"],
  ["+966 50 123 4567", "966501234567"],
  ["12", null],
  ["abc", null],
  ["", null],
];
let failures = 0;
for (const [input, expected] of cases) {
  const actual = normalizePhone(input);
  const ok = actual === expected;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${JSON.stringify(input)} -> ${JSON.stringify(actual)}${ok ? "" : ` (expected ${JSON.stringify(expected)})`}`);
}
process.exit(failures === 0 ? 0 : 1);
