import type { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import { SidebarProvider } from "@/components/SidebarContext";
import AppLayout from "@/layouts/AppLayout";

export default async function DashLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <SidebarProvider>
      <AppLayout userEmail={user?.email}>{children}</AppLayout>
    </SidebarProvider>
  );
}
