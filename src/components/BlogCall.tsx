import Image from "next/image";
import { Button } from "./ui/button";

const BlogCall = () => {
  return (
    <div className="mt-8 md:mt-12 lg:mt-15">
      <div className="flex flex-col-reverse md:flex-row gap-4 sm:gap-8 min-h-[300px] md:min-h-[400px]">
        {/* left */}
        <div className="flex-1 relative min-h-[300px] md:min-h-0 ">
          <Image
            src={"/assets/images/blog.jpg"}
            alt="blogimage"
            className="object-cover"
            fill
          />
        </div>
        {/* right */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 md:gap-6 lg:gap-8">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold md:font-bold">
            Learn, Explore & Stay Updated
          </h1>
          <p>
            Check out our blog for guides, game tips, product reviews, and event
            highlights.
          </p>
          <div className="">
            <Button className="text-xl px-5 py-7 md:p-8 font-semibold bg-blue-500 cursor-pointer">
              Explore Our Shop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCall;
