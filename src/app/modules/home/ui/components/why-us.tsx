"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whyChooseUs } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const WhyUs = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline
      gsap.from(".why-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate cards
      gsap.from(".why-card", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="mt-8 md:mt-12 lg:mt-15" ref={containerRef}>
      <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
        {/* text */}
        <h1 className="why-title text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Why Choose Chewata Awaqi?
        </h1>

        {/* card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyChooseUs.map((why) => (
            <div
              key={why.title}
              className="why-card flex flex-col items-center justify-center gap-6 p-5 md:p-8 bg-muted rounded-xl"
            >
              <why.icon className="text-[#FACC15] w-10 h-10" />
              <h2 className="text-xl md:text-2xl font-semibold text-center">
                {why.title}
              </h2>
              <p className="text-center font-light text-muted-foreground">
                {why.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
