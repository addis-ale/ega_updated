"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  href: string;
  label: string;
}
export const BackLink = ({ href, label }: Props) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <Link
          href={href}
          className="flex items-center text-sm hover:opacity-75 transition font-medium text-gray-500"
        >
          <ArrowLeft className="size-5 mr-2" />
          {label}
        </Link>
      </div>
    </div>
  );
};
