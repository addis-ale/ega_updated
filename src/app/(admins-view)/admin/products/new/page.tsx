import { CreateNewProductView } from "@/app/modules/admin/products/ui/views/create-new-product-view";
import { BackLink } from "@/components/back-link";

const Page = () => {
  return (
    <>
      <BackLink href="/admin/products" label="Back to products" />
      <CreateNewProductView />
    </>
  );
};

export default Page;
