import { Container } from "@/app/(users-view)/(market)/_components/container";
import { Footer } from "@/app/(users-view)/(market)/_components/footer";
import { Navbar } from "@/app/(users-view)/(market)/_components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Container>{children}</Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
