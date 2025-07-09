"use client";
import { heroImages } from "@/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const [heroimgIdx, setHeroImgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImgIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useGSAP(() => {
    const heroTitle = new SplitText(".title", { type: "words" });
    gsap.from(heroTitle.words, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });
    gsap.from(".para", {
      opacity: 0,
      yPercent: 100,
      delay: 1,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });
    gsap.from(".logo", {
      opacity: 0,
      y: 20,
      scale: 0.5,
      delay: 2,
    });
  }, []);

  return (
    <div className="mt-8 md:mt-12 flex flex-col md:flex-row gap-4 md:gap-2 min-h-[60vh] md:items-center  rounded-2xl shadow-xl bg-muted/20 ">
      {/* left */}
      <div className="flex-1 flex items-center justify-center ">
        <div className="flex flex-col items-center md:items-start gap-4 md:gap-6">
          <div className="font-bold text-4xl md:text-5xl flex flex-col items-center gap-4 md:gap-6">
            <span className="title">Play. Share. Connect.</span>
            <span className="text-center">With</span>
            <span className="text-5xl md:text-6xl text-transparent stroke-text logo">
              EGA
            </span>
          </div>
          <div className="text-muted-foreground font-medium text-lg flex flex-col gap-2 md:w-full">
            <p className="para">Buy or rent physical games--</p>
            <p className="md:self-end md:text-right para">
              from party classics to brain-busting strategy titles.
            </p>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="flex-1 relative min-h-[300px] md:min-h-[500px] flex items-center justify-center">
        <Image
          src={heroImages[heroimgIdx]}
          alt="hero image"
          fill
          className="object-cover rounded-xl"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
