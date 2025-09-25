"use client";
import Image from "next/image";
import { Button } from "../../../../../components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export const EventCall = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text section
      gsap.from(".event-fade", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          scrub: true,
        },
      });

      // Animate images
      gsap.from(".event-image", {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="mt-8 md:mt-12 lg:mt-15" ref={containerRef}>
      <div className="flex flex-col md:flex-row min-h-[300px] md:min-h-[400px] gap-8">
        {/* left */}
        <div className="flex flex-col gap-6 justify-center items-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold md:font-bold event-fade">
            See What&apos;s Coming Up Next
          </h1>
          <p className="event-fade text-center">
            Game Nights & Epic Showdowns <br /> and fun with friends-- <br />
            With
            <span className="ml-2 text-2xl md:text-3xl lg:text-4xl font-bold stroke-text text-transparent">
              Chewata Awaqi
            </span>
          </p>
          <div className="event-fade">
            <Link href={"/events"}>
              <Button className="text-xl px-5 py-7 md:p-8 font-semibold bg-[#FACC15] cursor-pointer">
                Join The Action
              </Button>
            </Link>
          </div>
        </div>

        {/* right */}
        <div className="flex-1 grid grid-cols-2 min-h-[300px] md:min-h-[400px] rounded-sm gap-2">
          <div className="col-span-2 relative event-image">
            <Image
              src="/assets/images/gameon.jpg"
              alt="game on"
              fill
              className="object-cover rounded-sm"
            />
          </div>
          <div className="relative event-image">
            <Image
              src="/assets/images/gamenight.jpg"
              alt="game night"
              fill
              className="object-cover rounded-sm"
            />
          </div>
          <div className="relative event-image">
            <Image
              src="/assets/images/gamezone.jpg"
              alt="game zone"
              fill
              className="object-cover rounded-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
