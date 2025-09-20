"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navlinks } from "@/constants";
import Container from "./container";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
const Navbar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const handleAuth = async () => {
    if (session) {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
          },
        },
      });
    } else {
      router.push("/sign-in");
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-background z-50">
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={"/"}>
            <span className="text-2xl md:text-3xl font-bold">EGA</span>
          </Link>

          {/* Mobile */}
          <div className="md:hidden flex flex-1 justify-end mr-5">
            <Sheet>
              <SheetTrigger asChild>
                <Menu className="w-8 h-8" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[200px] sm:w-[540px]">
                <SheetHeader className="p-5">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col mt-6 gap-8 px-5 flex-1">
                  {navlinks.map((link) => (
                    <SheetClose
                      asChild
                      key={link.label}
                      className="hover:bg-muted-foreground p-3 rounded-xl"
                    >
                      <div className="flex items-center gap-2">
                        <link.icon className="w-6 h-6" />
                        <Link href={link.href} className="text-xs sm:text-sm">
                          {link.label}
                        </Link>
                      </div>
                    </SheetClose>
                  ))}
                  <Button onClick={handleAuth}>
                    {session ? "Sign Out" : "Sign In"}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex flex-1 justify-end mr-10 lg:mr-20 gap-8 lg:gap-12 items-center">
            {navlinks.map((link) => (
              <Link
                href={link.href}
                key={link.label}
                className="text-sm hover:bg-muted p-3 rounded-xl"
              >
                {link.label}
              </Link>
            ))}
            <Button onClick={handleAuth}>
              {session ? "Sign Out" : "Sign In"}
            </Button>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
