import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

interface Props {
  href: string;
  label: string;
}
export const ListHeader = ({ href, label }: Props) => {
  return (
    <div className="container mt-6 max-w-6xl">
      <div className=" flex justify-end items-center">
        <Link href={href}>
          <Button>
            <PlusCircle />
            {label}
          </Button>
        </Link>
      </div>
    </div>
  );
};
