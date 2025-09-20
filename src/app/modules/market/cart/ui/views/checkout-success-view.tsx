"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export const CheckoutSuccessView = () => {
  return (
    <div className="mt-44 flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Order Sent Successfully</h1>
      <p className="text-gray-400 max-w-md mb-6">
        Your order has been sent to the admin through Telegram. The admin will
        reach out to you soon. Thank you for shopping with us!
      </p>

      <Link href="/">
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          Explore More Products
        </Button>
      </Link>
    </div>
  );
};
