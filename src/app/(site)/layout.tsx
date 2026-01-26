import { Providers } from "@/components/Providers";
import SmoothScrolling from "@/components/SmoothScrolling";

import { Preloader } from "@/components/Preloader";
import { cookies } from "next/headers";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("kulan_lang")?.value || "ru") as "ru" | "en" | "kk";

  return (
    <Providers lang={lang}>
      <Preloader />
      <SmoothScrolling>{children}</SmoothScrolling>
    </Providers>
  );
}
