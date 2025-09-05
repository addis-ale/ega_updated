"use client";
import { useEffect, useRef } from "react";
import { testimonials } from "@/constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarRating from "@/components/StarRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

gsap.registerPlugin(ScrollTrigger);

const Testimony = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(".testimony-title", {
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

      // Animate testimonial cards
      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 40,
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
      <div className="flex justify-center items-center flex-col gap-8 md:gap-12">
        {/* title */}
        <h1 className="testimony-title text-2xl md:text-3xl lg:text-4xl">
          What Our Users Say
        </h1>

        {/* testimonies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {testimonials.map((testimony, index) => (
            <div
              key={testimony.username + index}
              className="testimonial-card flex flex-col gap-6 bg-muted p-6 rounded-lg shadow"
            >
              <StarRating
                totalStars={5}
                initialRating={testimony.star}
                readOnly={true}
              />
              <p className="italic text-muted-foreground">{`"${testimony.comment}"`}</p>
              <div className="flex items-center gap-3 mt-auto">
                <Avatar>
                  <AvatarImage
                    src={testimony.userImg || "/images/your-avatar.jpg"}
                    alt={testimony.username}
                  />
                  <AvatarFallback>
                    {testimony.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{testimony.username}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimony;
