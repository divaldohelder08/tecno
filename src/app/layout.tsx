import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./providers";



export const metadata: Metadata = {
  title: { default: "Tecno-bantu", template: "%s | Tecno-bantu" },
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "Divaldo Hélder Kossi Namboge",
      url: "https://twitter.com/DivaldoHe33951",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-AO" suppressHydrationWarning>
      <body className="font-sans min-h-full w-full"><Provider>{children}</Provider></body>
    </html>
  );
}
