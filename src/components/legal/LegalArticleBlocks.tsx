import type { LegalArticle, LegalPoint } from "@/lib/api/adham";

function isDefinitionPoint(p: LegalPoint): boolean {
  return typeof p.Term === "string" || typeof p.TermEn === "string";
}

function DefinitionBlock({ point }: { point: LegalPoint }) {
  const term = (point.TermEn as string) || (point.Term as string) || "";
  const def =
    (point.DefinitionEn as string) || (point.Definition as string) || "";
  if (!term && !def) return null;
  return (
    <div className="border-l-2 border-copper/40 pl-4">
      <dt className="font-semibold text-primary">{term}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-primary/80">{def}</dd>
    </div>
  );
}

function BulletPoint({ point }: { point: LegalPoint }) {
  const text = (point.TextEn as string) || (point.Text as string) || "";
  if (!text) return null;
  return <li className="text-primary/90">{text}</li>;
}

function RichPoint({ point }: { point: LegalPoint }) {
  const text = (point.TextEn as string) || (point.Text as string) || "";
  if (!text) return null;
  const extra: string[] = [];
  if (Array.isArray(point.Examples)) {
    extra.push(...(point.Examples as string[]));
  }
  return (
    <li className="text-primary/90">
      <span>{text}</span>
      {extra.length > 0 && (
        <span className="mt-1 block text-xs text-primary/60">
          {extra.join(" · ")}
        </span>
      )}
    </li>
  );
}

function PermissionPoint({ point }: { point: LegalPoint }) {
  const text = (point.TextEn as string) || (point.Text as string) || "";
  if (!text) return null;
  const android = point.AndroidPermission as string | undefined;
  const ios = point.IOSPermission as string | undefined;
  return (
    <li className="text-primary/90">
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

function renderPoint(point: LegalPoint, index: number) {
  if (isDefinitionPoint(point)) {
    return <DefinitionBlock key={index} point={point} />;
  }
  if (
    typeof point.permissionType === "string" ||
    typeof point.PermissionType === "string" ||
    point.AndroidPermission ||
    point.IOSPermission
  ) {
    return <PermissionPoint key={index} point={point} />;
  }
  if (point.DataType || Array.isArray(point.Examples)) {
    return <RichPoint key={index} point={point} />;
  }
  if (point.Purpose || point.RecipientType || point.RightType) {
    return <BulletPoint key={index} point={point} />;
  }
  if (typeof point.Text === "string" || typeof point.TextEn === "string") {
    return <BulletPoint key={index} point={point} />;
  }
  return null;
}

export function LegalArticleView({ article }: { article: LegalArticle }) {
  const title = article.TitleEn || article.Title;
  const content = article.ContentEn || article.Content;
  const points = article.Points ?? [];
  const first = points[0];
  const useDefinitionList = first && isDefinitionPoint(first as LegalPoint);

  return (
    <article className="border-b border-primary/10 pb-10 last:border-0 last:pb-0">
      <h3 className="text-lg font-semibold text-primary sm:text-xl">{title}</h3>
      {article.Title && article.TitleEn && article.Title !== article.TitleEn && (
        <p className="mt-1 font-serif text-sm text-primary/60" dir="rtl">
          {article.Title}
        </p>
      )}

      {content ? (
        <p className="mt-4 text-sm leading-relaxed text-primary/90 sm:text-base">
          {content}
        </p>
      ) : null}

      {points.length > 0 && (
        <>
          {useDefinitionList ? (
            <dl className="mt-4 space-y-4">
              {points.map((p, i) => (
                <DefinitionBlock key={i} point={p as LegalPoint} />
              ))}
            </dl>
          ) : (
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-copper">
              {points.map((p, i) => renderPoint(p as LegalPoint, i))}
            </ul>
          )}
        </>
      )}

      {(article.footerEn || article.footer) && (
        <p className="mt-4 text-sm leading-relaxed text-primary/85">
          {article.footerEn || article.footer}
        </p>
      )}

      {(article.additionalContentEn || article.additionalContent) && (
        <p className="mt-4 text-sm font-medium text-primary">
          {article.additionalContentEn || article.additionalContent}
        </p>
      )}

      {article.additionalPoints && article.additionalPoints.length > 0 && (
        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-copper">
          {article.additionalPoints.map((p, i) => (
            <BulletPoint key={i} point={p as LegalPoint} />
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
