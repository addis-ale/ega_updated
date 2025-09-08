"use client";

import { ProductTitleForm } from "../components/title-form";

export const CreateNewProductView = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto mt-8 h-[50vh]">
      <div className="h-full w-full flex flex-col gap-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">Name Your Product</h1>
          <p className="text-sm text-muted-foreground">
            Enter the product name to continue with the setup.
          </p>
        </div>
        <ProductTitleForm />
      </div>
    </div>
  );
};
