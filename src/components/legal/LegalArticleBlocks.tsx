import type { LegalArticle, LegalPoint } from "@/lib/api/adham";

type Locale = "en" | "ar";

function pick(locale: Locale, ar?: string, en?: string): string {
  if (locale === "ar") return ar || en || "";
  return en || ar || "";
}

function isDefinitionPoint(p: LegalPoint): boolean {
  return typeof p.Term === "string" || typeof p.TermEn === "string";
}

function DefinitionBlock({ point, locale }: { point: LegalPoint; locale: Locale }) {
  const term = pick(locale, point.Term as string, point.TermEn as string);
  const def = pick(locale, point.Definition as string, point.DefinitionEn as string);
  if (!term && !def) return null;
  return (
    <div className="border-l-2 border-copper/40 pl-4">
      <dt className={`font-semibold text-primary ${locale === "ar" ? "font-serif" : ""}`} dir={locale === "ar" ? "rtl" : "ltr"}>
        {term}
      </dt>
      <dd className={`mt-1 text-sm leading-relaxed text-primary/80 ${locale === "ar" ? "font-serif" : ""}`} dir={locale === "ar" ? "rtl" : "ltr"}>
        {def}
      </dd>
    </div>
  );
}

function BulletPoint({ point, locale }: { point: LegalPoint; locale: Locale }) {
  const text = pick(locale, point.Text as string, point.TextEn as string);
  if (!text) return null;
  return (
    <li className={`text-primary/90 ${locale === "ar" ? "font-serif" : ""}`} dir={locale === "ar" ? "rtl" : "ltr"}>
      {text}
    </li>
  );
}

function RichPoint({ point, locale }: { point: LegalPoint; locale: Locale }) {
  const text = pick(locale, point.Text as string, point.TextEn as string);
  if (!text) return null;
  const extra: string[] = [];
  if (Array.isArray(point.Examples)) {
    extra.push(...(point.Examples as string[]));
  }
  return (
    <li className={`text-primary/90 ${locale === "ar" ? "font-serif" : ""}`} dir={locale === "ar" ? "rtl" : "ltr"}>
      <span>{text}</span>
      {extra.length > 0 && (
        <span className="mt-1 block text-xs text-primary/60">
          {extra.join(" · ")}
        </span>
      )}
    </li>
  );
}

function PermissionPoint({ point, locale }: { point: LegalPoint; locale: Locale }) {
  const text = pick(locale, point.Text as string, point.TextEn as string);
  if (!text) return null;
  const android = point.AndroidPermission as string | undefined;
  const ios = point.IOSPermission as string | undefined;
  return (
    <li className={`text-primary/90 ${locale === "ar" ? "font-serif" : ""}`} dir={locale === "ar" ? "rtl" : "ltr"}>
      <span className="font-medium">{text}</span>
      {(android || ios) && (
        <span className="mt-0.5 block text-xs text-primary/55">
          {[android && `Android: ${android}`, ios && `iOS: ${ios}`]
            .filter(Boolean)
            .join(" · ")}
        </span>
      )}
    </li>
  );
}

function renderPoint(point: LegalPoint, index: number, locale: Locale) {
  if (isDefinitionPoint(point)) {
    return <DefinitionBlock key={index} point={point} locale={locale} />;
  }
  if (
    typeof point.permissionType === "string" ||
    typeof point.PermissionType === "string" ||
    point.AndroidPermission ||
    point.IOSPermission
  ) {
    return <PermissionPoint key={index} point={point} locale={locale} />;
  }
  if (point.DataType || Array.isArray(point.Examples)) {
    return <RichPoint key={index} point={point} locale={locale} />;
  }
  if (point.Purpose || point.RecipientType || point.RightType) {
    return <BulletPoint key={index} point={point} locale={locale} />;
  }
  if (typeof point.Text === "string" || typeof point.TextEn === "string") {
    return <BulletPoint key={index} point={point} locale={locale} />;
  }
  return null;
}

export function LegalArticleView({
  article,
  locale,
}: {
  article: LegalArticle;
  locale: Locale;
}) {
  const title = pick(locale, article.Title, article.TitleEn);
  const content = pick(locale, article.Content, article.ContentEn);
  const points = article.Points ?? [];
  const first = points[0];
  const useDefinitionList = first && isDefinitionPoint(first as LegalPoint);

  return (
    <article className="border-b border-primary/10 pb-10 last:border-0 last:pb-0">
      <h3
        className={`text-lg font-semibold text-primary sm:text-xl ${locale === "ar" ? "font-serif" : ""}`}
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        {title}
      </h3>

      {content ? (
        <p
          className={`mt-4 text-sm leading-relaxed text-primary/90 sm:text-base ${locale === "ar" ? "font-serif" : ""}`}
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          {content}
        </p>
      ) : null}

      {points.length > 0 && (
        <>
          {useDefinitionList ? (
            <dl className="mt-4 space-y-4">
              {points.map((p, i) => (
                <DefinitionBlock key={i} point={p as LegalPoint} locale={locale} />
              ))}
            </dl>
          ) : (
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-copper">
              {points.map((p, i) => renderPoint(p as LegalPoint, i, locale))}
            </ul>
          )}
        </>
      )}

      {(article.footerEn || article.footer) && (
        <p
          className={`mt-4 text-sm leading-relaxed text-primary/85 ${locale === "ar" ? "font-serif" : ""}`}
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          {pick(locale, article.footer, article.footerEn)}
        </p>
      )}

      {(article.additionalContentEn || article.additionalContent) && (
        <p
          className={`mt-4 text-sm font-medium text-primary ${locale === "ar" ? "font-serif" : ""}`}
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          {pick(locale, article.additionalContent, article.additionalContentEn)}
        </p>
      )}

      {article.additionalPoints && article.additionalPoints.length > 0 && (
        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-copper">
          {article.additionalPoints.map((p, i) => (
            <BulletPoint key={i} point={p as LegalPoint} locale={locale} />
          ))}
        </ul>
      )}

      {article.ContactInfo &&
        (article.ContactInfo.Email || article.ContactInfo.Phone) && (
          <div className="mt-4 rounded-2xl bg-surface px-4 py-3 text-sm text-primary">
            {article.ContactInfo.Email && (
              <p>
                Email:{" "}
                <a
                  className="text-copper underline-offset-2 hover:underline"
                  href={`mailto:${article.ContactInfo.Email}`}
                >
                  {article.ContactInfo.Email}
                </a>
              </p>
            )}
            {article.ContactInfo.Phone && (
              <p className="mt-1">
                Phone:{" "}
                <a
                  className="text-copper underline-offset-2 hover:underline"
                  href={`tel:${article.ContactInfo.Phone.replace(/\s/g, "")}`}
                >
                  {article.ContactInfo.Phone}
                </a>
              </p>
            )}
          </div>
        )}
    </article>
  );
}
