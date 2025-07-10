import BlogCall from "@/components/BlogCall";
import EventCall from "@/components/EventCall";
import Hero from "@/components/Hero";
import ShopCall from "@/components/ShopCall";
import Testimony from "@/components/Testimony";
import WhyUs from "@/components/WhyUs";

export default function Home() {
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
}
