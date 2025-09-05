"use client";

import { BlogCall } from "../components/blog-call";
import { EventCall } from "../components/event-call";
import { Hero } from "../components/hero";
import { ShopCall } from "../components/shop-call";
import { Testimony } from "../components/testimony";
import { WhyUs } from "../components/why-us";

export const HomeView = () => {
  return (
    <div className="flex flex-col gap-12">
      <Hero />
      <ShopCall />
      <BlogCall />
      <EventCall />
      <WhyUs />
      <Testimony />
    </div>
  );
};
