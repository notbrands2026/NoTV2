import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoT — Need of Time",
  description: "NoT ecommerce storefront",
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
