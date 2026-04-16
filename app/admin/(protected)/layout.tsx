import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      {/* subtle grid overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(201,168,76,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.5)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-3 py-3 sm:px-4 sm:py-4 lg:flex-row lg:items-start lg:gap-5 lg:px-5 lg:py-5">
        <AdminSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  );
}
