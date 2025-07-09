import { navlinks } from "@/constants";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-16 md:h-20">
      {/* logo */}
      <div>
        {/* logo img */}
        <span className=" text-2xl md:text-3xl font-bold">EGA</span>
      </div>
      {/* Mobile */}
      <div className="md:hidden flex flex-1 justify-end mr-5">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="w-8 h-8" />
          </SheetTrigger>

          <SheetContent side="right" className="w-[200px] sm:w-[540px]">
            <SheetHeader className="p-5">
              <SheetTitle className="">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col  mt-6 gap-8 px-5 flex-1">
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
              <SheetClose
                asChild
                className="hover:bg-muted-foreground p-3 rounded-xl"
              ></SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      {/* Desktop */}
      <div className="hidden md:flex flex-1 justify-end mr-10 lg:mr-20 gap-8 lg:gap-12 items-center ">
        {navlinks.map((link) => (
          <Link
            href={link.href}
            key={link.label}
            className="text-sm hover:bg-muted p-3 rounded-xl"
          >
            {link.label}
          </Link>
        ))}
      </div>
      {/* Login */}
      <Link
        href={"/register"}
        className="text-xs md:text-sm px-4 py-2 bg-blue-500 rounded-xl"
      >
        Register
      </Link>
    </nav>
  );
};

export default Navbar;
