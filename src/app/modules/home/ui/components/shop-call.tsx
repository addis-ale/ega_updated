"use client";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger); // ✅ Register scroll plugin

export const ShopCall = () => {
  useGSAP(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".shop_img",
          start: "top bottom",
          end: "bottom 80%",
          toggleActions: "play play play play",
          scrub: true,
          //markers: true, // Uncomment to debug
        },
      })
      .from(".shop_title", {
        opacity: 0,
        yPercent: 100,
        scale: 0.5,
      })
      .from(".shop_sub_title", {
        opacity: 0,
        yPercent: 100,
      });

    // Stagger image animation
    gsap.from(".img", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".shop_img",
        start: "top 80%", // when image container enters viewport
        end: "bottom 40%",
        toggleActions: "play none none none", // only once
        scrub: true,
        // markers: true,
      },
    });
    gsap.from(".shop_btn", {
      opacity: 0,
      yPercent: 100,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".shop_btn",
        start: "top 80%", // when image container enters viewport
        end: "bottom 30%",
        toggleActions: "play none none none", // only once
        scrub: true,
        // markers: true,
      },
    });
  }, []);
  return (
    <div className="mt-10 md:mt-12 lg:mt-15 flex flex-col items-center gap-8 lg:gap-12">
      {/* header */}
      <div className="flex items-center flex-col gap-4 md:gap-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold shop_title">
          Some of Our Game
        </h1>
        <p className="shop_sub_title">
          Rent or buy top-quality game materials easily. Browse our full
          collection in the shop
        </p>
      </div>

      {/* image */}
      <div className="flex w-full min-h-[300px] md:min-h-[400px] rounded-sm shadow-xl shop_img">
        {/* left image */}
        <div className="flex-1 w-full relative">
          <Image
            src={"/assets/images/blackjoystice.jpg"}
            alt="game"
            fill
            className="object-cover img rounded-sm"
          />
        </div>
        {/* right image */}
        <div className="flex-1 w-full grid grid-cols-2 ">
          <div className="relative">
            <Image
              src={"/assets/images/blackdart.jpg"}
              alt="game"
              fill
              className="object-cover img rounded-sm"
            />
          </div>
          <div className="relative">
            <Image
              src={"/assets/images/uno.jpg"}
              alt="game"
              fill
              className="object-cover img rounded-sm"
            />
          </div>
          <div className="relative col-span-2">
            <Image
              src={"/assets/images/tennis.jpg"}
              alt="game"
              fill
              className="object-cover img rounded-sm"
            />
          </div>
        </div>
      </div>

      {/* button */}
      <div className="shop_btn">
        <Link href={"/shop"}>
          <Button className="text-xl px-5 py-7 md:p-8 font-semibold bg-green-500 cursor-pointer">
            Explore Our Shop
          </Button>
        </Link>
      </div>
    </div>
  );
};
