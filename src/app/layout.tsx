import type { ReactNode } from "react";

/** Passthrough root: the document shell and locale live in `app/[locale]/layout.tsx`. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
