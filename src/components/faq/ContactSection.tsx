import type { ContactItem } from "@/lib/api/adham";
import { useLocale } from "next-intl";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d27632.355155367488!2d31.4538857!3d30.0355842!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458236ec8a25869%3A0xccc6947d7bce6524!2sAF%20Property%20%7C%20Adham%20Fathallah!5e0!3m2!1sar!2seg!4v1775396978619!5m2!1sar!2seg";

/** Fixed labels + subtitles; `href` comes from API when present. */
const CONTACT_ROWS: {
  platforms: string[];
  labelAr: string;
  labelEn: string;
  subtitle: string;
}[] = [
  {
    platforms: ["Phone"],
    labelAr: "خدمة العملاء",
    labelEn: "Customer Service",
    subtitle: "+201011584105",
  },
  {
    platforms: ["Whatsapp"],
    labelAr: "واتساب",
    labelEn: "Whatsapp",
    subtitle: "Message on WhatsApp",
  },
  {
    platforms: ["Instagram"],
    labelAr: "انستغرام",
    labelEn: "Instagram",
    subtitle: "instagram.com",
  },
  {
    platforms: ["Facebook"],
    labelAr: "فيسبوك",
    labelEn: "Facebook",
    subtitle: "facebook.com",
  },
  {
    platforms: ["Youtube", "YouTube"],
    labelAr: "يوتيوب",
    labelEn: "Youtube",
    subtitle: "youtube.com",
  },
  {
    platforms: ["Email"],
    labelAr: "البريد الالكتروني",
    labelEn: "Email",
    subtitle: "info@afproperty.com",
  },
  {
    platforms: ["Address"],
    labelAr: "العنوان",
    labelEn: "Address",
    subtitle: "Open in Google Maps",
  },
];

function findContact(
  contacts: ContactItem[],
  platforms: string[],
): ContactItem | undefined {
  const wanted = new Set(platforms.map((p) => p.toLowerCase()));
  return contacts.find((c) => wanted.has(c.Platform.toLowerCase()));
}

function isExternalHref(href: string): boolean {
  return (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("//")
  );
}

function hasArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

function getLocalizedTitle(contact: ContactItem, locale: string): string {
  // API fields are inconsistent: some entries have Arabic in `TitleEn`.
  const candidates = [contact.Title ?? "", contact.TitleEn ?? ""].filter(Boolean);
  if (!candidates.length) return "";

  if (locale === "ar") return candidates.find(hasArabic) ?? candidates[0]!;
  return candidates.find((t) => !hasArabic(t)) ?? candidates[0]!;
}

function ContactIcon({
  platform,
  className = "h-7 w-7",
}: {
  platform: string;
  className?: string;
}) {
  const p = platform.toLowerCase();
  const common = `${className} shrink-0 text-copper`;
  if (p === "phone")
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    );
  if (p === "whatsapp")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    );
  if (p === "instagram")
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    );
  if (p === "facebook")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    );
  if (p === "youtube")
    return (
      <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M22.54 6.42a2.79 2.79 0 00-1.96-1.97C18.88 4 12 4 12 4s-6.88 0-8.58.45A2.79 2.79 0 001.46 6.42 29.94 29.94 0 001 12a29.94 29.94 0 00.46 5.58 2.79 2.79 0 001.96 1.97C5.12 20 12 20 12 20s6.88 0 8.58-.45a2.79 2.79 0 001.96-1.97A29.94 29.94 0 0023 12a29.94 29.94 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    );
  if (p === "email")
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    );
  if (p === "address")
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    );
  return (
    <svg
      className={common}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  );
}

export default function ContactSection({
  contacts,
  showHeading = true,
}: {
  contacts: ContactItem[];
  /** When false, page provides its own title (e.g. `/contact`). */
  showHeading?: boolean;
}) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section
      className={showHeading ? "mt-16" : "mt-0"}
      aria-labelledby={showHeading ? "contact-heading" : undefined}
      aria-label={showHeading ? undefined : "Contact channels and location"}
    >
      <div className="mx-auto">
        {showHeading ? (
          <>
            <h2
              id="contact-heading"
              className="mb-2 text-center text-xl font-semibold text-primary sm:text-2xl"
            >
              {isArabic ? "اتصل بنا" : "Contact us"}
            </h2>
            <p className="mb-8 text-center text-sm text-primary/60">
              {isArabic
                ? "تواصل مع الفريق عبر الهاتف أو وسائل التواصل أو زر مكتبنا."
                : "Reach the team by phone, social, or visit our office."}
            </p>
          </>
        ) : null}

        <div className="flex flex-col gap-12">
          <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {CONTACT_ROWS.map((row) => {
              const c = findContact(contacts, row.platforms);
              if (!c) return null;
              const platformKey = row.platforms[0];
              const external = isExternalHref(c.Link);
              const title = getLocalizedTitle(c, locale);

              return (
                <li
                  key={row.platforms.join("-")}
                  className="w-[calc(50%-0.375rem)] min-w-[9.5rem] max-w-[11.5rem] sm:w-[calc(33.333%-0.667rem)] sm:max-w-[12rem] lg:w-[calc(25%-0.75rem)]"
                >
                  <a
                    href={c.Link}
                    className="flex h-full min-h-[9.5rem] flex-col items-center rounded-2xl border border-primary/10 bg-white/95 px-3 py-4 text-center shadow-[0_4px_24px_rgba(45,55,72,0.05)] transition-all hover:-translate-y-0.5 hover:border-copper/25 hover:shadow-[0_12px_32px_rgba(196,149,106,0.12)]"
                    {...(external
                      ? {
                          target: "_blank" as const,
                          rel: "noopener noreferrer",
                        }
                      : {})}
                  >
                    <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-copper/12 text-copper ring-1 ring-copper/20">
                      <ContactIcon platform={platformKey} className="h-6 w-6" />
                    </span>
                    <span
                      className={`mt-1 line-clamp-2 text-[13px] font-semibold leading-tight text-primary ${isArabic ? "font-serif" : ""}`}
                      dir={isArabic ? "rtl" : "ltr"}
                    >
                      {title || (isArabic ? row.labelAr : row.labelEn)}
                    </span>
                    <span className="mt-auto pt-2 text-[10px] leading-snug break-words text-primary/45">
                      {row.subtitle}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="w-full">
            <p className="mb-3 text-center text-sm font-medium text-primary/70">
              {isArabic ? "زورنا" : "Visit us"}
            </p>
            <div className="overflow-hidden rounded-2xl border border-primary/10 bg-surface shadow-[0_12px_40px_rgba(45,55,72,0.08)]">
              <iframe
                title="AF Property | Adham Fathallah — Google Maps"
                src={MAP_EMBED_SRC}
                className="aspect-video w-full min-h-[200px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-center text-xs text-primary/50">
              AF Property · Adham Fathallah — Cairo, Egypt
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
