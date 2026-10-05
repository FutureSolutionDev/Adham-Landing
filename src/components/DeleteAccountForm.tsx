"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

type Outcome = "idle" | "submitting" | "deleted" | "invalid" | "locked" | "error";
const ANSWERS: Outcome[] = ["deleted", "invalid", "locked", "error"];

// Same border and focus conventions as the rest of the site (border-primary/20, LocaleSwitcher's focus outline).
const INPUT_CLASS =
  "rounded-lg border border-primary/20 bg-white px-3 py-2 text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export default function DeleteAccountForm({ locale }: { locale: string }) {
  const t = useTranslations("DeleteAccount");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>("idle");

  if (outcome === "deleted") {
    return (
      <p role="status" className="mt-10 rounded-xl border border-primary/10 bg-surface p-6 leading-7 text-primary">
        {t("success")}
      </p>
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!confirmed || !phone || !password || outcome === "submitting") return;
    setOutcome("submitting");
    try {
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ phone, password, locale }),
      });
      const data = (await res.json().catch(() => ({}))) as { outcome?: Outcome };
      setOutcome(data.outcome && ANSWERS.includes(data.outcome) ? data.outcome : "error");
    } catch {
      setOutcome("error");
    } finally {
      setPassword("");
    }
  }

  const message =
    outcome === "invalid" ? t("errorInvalid") : outcome === "locked" ? t("errorLocked") : outcome === "error" ? t("errorNetwork") : null;
  const submitting = outcome === "submitting";

  return (
    <form onSubmit={submit} noValidate className="mt-10 grid gap-4 rounded-xl border border-primary/10 bg-surface p-6 text-primary">
      <div className="grid gap-1">
        <label htmlFor="delete-account-phone" className="font-medium">{t("phoneLabel")}</label>
        <input
          id="delete-account-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          aria-describedby="delete-account-phone-hint"
          className={INPUT_CLASS}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <p id="delete-account-phone-hint" className="text-sm opacity-70">{t("phoneHint")}</p>
      </div>
      <div className="grid gap-1">
        <label htmlFor="delete-account-password" className="font-medium">{t("passwordLabel")}</label>
        <input
          id="delete-account-password"
          type="password"
          autoComplete="current-password"
          className={INPUT_CLASS}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <label htmlFor="delete-account-confirm" className="flex items-start gap-2">
        <input
          id="delete-account-confirm"
          type="checkbox"
          className="mt-1"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        <span>{t("confirmLabel")}</span>
      </label>
      {message && (
        <p role="alert" className="text-red-600">
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={!confirmed || !phone || !password || submitting}
        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
      >
        {submitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
