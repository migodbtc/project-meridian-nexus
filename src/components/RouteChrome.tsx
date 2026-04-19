"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RouteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const isPolarisRoute = pathname.startsWith("/polaris");
  const toaster = (
    <Toaster position="bottom-right" offset={24} closeButton={false} />
  );

  if (isPolarisRoute) {
    return (
      <>
        {toaster}
        {children}
      </>
    );
  }

  return (
    <>
      {toaster}
      <Header />
      {children}
      <Footer />
    </>
  );
}
