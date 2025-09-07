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
    <div>
      single product with an id to see and edit after the admin clicked on the
      edit on the table
    </div>
  );
};

export default Page;
