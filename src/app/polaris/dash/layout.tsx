import type { ReactNode } from "react";
import { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { SidebarProvider } from "@/components/SidebarContext";
import AppLayout from "@/layouts/AppLayout";

async function DashLayoutUserContainer({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AppLayout userEmail={user?.email}>{children}</AppLayout>;
}

export default function DashLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <Suspense fallback={<div className="flex h-screen w-full items-center justify-center p-4 text-slate-500">Loading Dashboard...</div>}>
        <DashLayoutUserContainer>{children}</DashLayoutUserContainer>
      </Suspense>
    </SidebarProvider>
  );
}
