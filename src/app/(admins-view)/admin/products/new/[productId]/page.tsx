import { CreateNewProductSetupView } from "@/app/modules/admin/products/ui/views/create-new-product-setup-view";
import { BackLink } from "@/components/back-link";
import { getQueryClient, trpc } from "@/trpc/server";

interface Props {
  params: Promise<{ productId: string }>;
}

const Page = async ({ params }: Props) => {
  const { productId } = await params;
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getOne.queryOptions({
      productId,
    })
  );
  return (
    <>
      <BackLink href="/admin/products" label="Back to Products" />
      <CreateNewProductSetupView productId={productId} />
    </>
  );
};

export default Page;
