import Image from "next/image";
import { getTranslations } from "next-intl/server";

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-base ">
      <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="21"
          viewBox="0 0 24 21"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.5444 0.762898C20.1651 1.68708 19.4818 2.23143 17.7804 3.76342C16.3237 5.06745 16.3496 5.05482 15.9371 4.63698C15.0864 3.73805 11.9668 2.92774 11.0774 3.39621C10.652 3.61144 10.7036 4.04191 11.1548 4.04191C12.3793 4.05453 13.5137 4.61162 14.4805 5.40918C15.3441 6.13087 15.3441 6.09288 14.1196 7.28292C12.8047 8.54895 10.9356 10.6379 9.89146 11.9926L9.09226 13.0307L8.42198 12.0559C6.83655 9.72636 5.1221 8.57432 4.06507 9.11866C3.67833 9.32127 3.74284 9.44788 4.90295 10.6507C5.92129 11.7015 6.97832 13.1953 7.72586 14.6512C8.33175 15.8288 9.82706 15.8288 10.8454 14.1323C11.5802 12.9041 13.475 10.562 15.0347 8.96679L16.4269 7.53615L16.762 8.27046C19.7526 14.8412 12.4567 22.45 6.3209 19.1584C0.0562218 15.7908 1.47405 4.99146 8.30603 4.02928C9.6466 3.8393 9.67232 3.39621 8.3446 3.2316C4.91581 2.77588 0.533191 6.76384 0.0690787 10.7393C-0.807491 18.3228 6.81072 23.2603 14.2613 19.956C18.7858 17.9556 20.8998 10.7645 18.1026 6.96644C17.8964 6.68796 17.7288 6.4221 17.7288 6.35874C17.7288 6.09299 20.0362 4.06716 22.4853 2.2188C25.2438 0.129825 23.813 -0.756363 21.5444 0.762898Z"
            fill="#2D3748"
          />
        </svg>
      </span>
      <span>{children}</span>
    </li>
  );
}

export default async function ProblemSection() {
  const t = await getTranslations("Problem");

  return (
    <section className="py-20">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          {/* Top-left text card */}
          <div className="rounded-3xl bg-surface px-8 py-10 lg:max-w-[520px] lg:self-center">
            <p className="text-lg leading-relaxed text-primary sm:text-xl">
              {t("lead")}
            </p>
          </div>

          {/* Top-right image card */}
          <div className="relative w-full max-w-[min(100%,25rem)] justify-self-center rounded-3xl bg-white max-md:mx-auto md:max-w-none">
            <div className="relative mx-auto aspect-square w-full md:aspect-auto md:h-100 md:w-100">
              <Image
                src="/images/problem-top-right.webp"
                alt={t("topImageAlt")}
                fill
                priority
                className="relative z-10 rounded-3xl object-cover"
              />
            </div>
            <div className="absolute -bottom-10 left-10 z-0 hidden h-full w-full rounded-3xl bg-surface md:block" />
          </div>

          {/* Bottom-left image card */}
          <div className="relative rounded-3xl max-md:mt-12 md:max-lg:mt-20 lg:justify-self-start max-lg:justify-self-center">
            <div className="relative mx-auto aspect-square w-full md:aspect-auto md:h-100 md:w-100">
              <Image
                src="/images/problem-bottom-left.webp"
                alt={t("bottomImageAlt")}
                fill
                className="relative z-10 rounded-3xl object-cover"
              />
            </div>
            <div className="absolute -top-10 right-10 z-0 hidden h-full w-full rounded-3xl bg-surface md:block" />
          </div>

          {/* Bottom-right checklist card */}
          <div className="rounded-3xl bg-surface px-8 py-10 lg:justify-self-end lg:max-w-[520px]">
            <h3 className="text-lg font-semibold text-primary sm:text-xl">
              {t("checklistTitle")}
            </h3>

            <ul className="mt-6 space-y-3">
              <CheckItem>{t("item1")}</CheckItem>
              <CheckItem>{t("item2")}</CheckItem>
              <CheckItem>{t("item3")}</CheckItem>
            </ul>

            <p className="mt-6 text-xl text-primary">{t("tagline")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
