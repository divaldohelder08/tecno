import type { Metadata } from "next";
import Image from "next/image";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full lg:grid overflow-hidden lg:grid-cols-2 h-screen grid">
      <div className="flex items-center justify-center py-12">
        {children}
      </div>
      <div className="hidden bg-muted lg:block h-full">
        <Image
          src="/auth_bg.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
