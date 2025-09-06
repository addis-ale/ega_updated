import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../modules/admin/ui/components/admin-dashboard-sidebar";
import { DashboardNavbar } from "../modules/admin/ui/components/admin-dashboard-navbar";

interface Props {
  children: React.ReactNode;
}
const Layout = async ({ children }: Props) => {
  //protect the admin route
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
