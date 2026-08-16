import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoT — Need of Time | NoT Brands",
  description: "Shop NoT Brands — Need of Time. Everyday products designed with purpose.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
