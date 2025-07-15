import ProductCarousal from "./ProductCaurasl";
const ProductDetailBrowser = () => {
  return (
    <div className="mt-44">
      <div className="flex md:items-center flex-col md:flex-row gap-12 md:gap-6 ">
        {/* image */}
        <div className="flex-1">
          <ProductCarousal />
        </div>
        {/* description */}
        <div className="flex-1">description</div>
      </div>
    </div>
  );
};

export default ProductDetailBrowser;
