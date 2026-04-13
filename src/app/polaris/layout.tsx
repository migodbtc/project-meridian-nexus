import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polaris Engine",
};

export default function PolarisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
