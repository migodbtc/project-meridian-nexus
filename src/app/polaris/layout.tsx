import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polaris Engine",
  icons: {
    icon: "/icon.png",
  },
};

export default function PolarisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="theme-light min-h-screen">{children}</section>;
}
