import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../modules/admin/ui/components/admin-dashboard-sidebar";
import { DashboardNavbar } from "../modules/admin/ui/components/admin-dashboard-navbar";
import { isAdmin } from "@/lib/admin";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}
const Layout = async ({ children }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !isAdmin(session?.user.id)) {
    redirect("/");
  }
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};
export default Layout;
