// Checks outcomeFor: the form may say "deleted" only when Adham confirmed it in the body.
// Run: node --experimental-strip-types Scripts/CheckDeleteOutcome.mts
// @ts-expect-error -- Node type stripping needs the explicit .ts extension
import { outcomeFor } from "../src/lib/deleteAccount.ts";

const confirmed = { code: 200, error: false, data: { ClientId: 1, Deleted: true } };

const cases: Array<[string, number, unknown, string]> = [
  ["200 with data.Deleted true", 200, confirmed, "deleted"],
  ["200 without Deleted", 200, { code: 200, error: false, data: { ClientId: 1 } }, "error"],
  ["200 with Deleted as a string", 200, { data: { Deleted: "true" } }, "error"],
  ["200 with an unreadable body (interstitial HTML)", 200, null, "error"],
  ["302 redirect, even with a confirming body", 302, confirmed, "error"],
  ["201 with data.Deleted true", 201, confirmed, "error"],
  ["429", 429, null, "locked"],
  ["401", 401, null, "invalid"],
  ["400", 400, null, "invalid"],
  ["422", 422, null, "invalid"],
  ["403 staff account", 403, null, "error"],
  ["500", 500, null, "error"],
];
let failures = 0;
for (const [name, status, json, expected] of cases) {
  const actual = outcomeFor(status, json);
  const ok = actual === expected;
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name} -> ${actual}${ok ? "" : ` (expected ${expected})`}`);
}
process.exit(failures === 0 ? 0 : 1);
