import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoT — Need of Time | Everyday Womenswear",
  description: "Comfortable, minimal womenswear designed for every day.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
