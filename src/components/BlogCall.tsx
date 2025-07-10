"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const BlogCall = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-fade", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none", // animate once
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="mt-8 md:mt-12 lg:mt-15" ref={containerRef}>
      <div className="flex flex-col-reverse md:flex-row gap-8 min-h-[300px] md:min-h-[400px]">
        {/* left */}
        <div className="flex-1 relative min-h-[300px] md:min-h-0 blog-fade">
          <Image
            src={"/assets/images/blog.jpg"}
            alt="blogimage"
            className="object-cover rounded-sm"
            fill
          />
        </div>
        {/* right */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 lg:gap-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold md:font-bold blog-fade">
            Learn, Explore & Stay Updated
          </h1>
          <p className="blog-fade">
            Check out our blog for guides, game tips, product reviews, and event
            highlights.
          </p>
          <div className="blog-fade">
            <Button className="text-xl px-5 py-7 md:p-8 font-semibold bg-blue-500 cursor-pointer">
              Visit Our Blog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCall;
