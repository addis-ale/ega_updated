import { whyChooseUs } from "@/constants";

const WhyUs = () => {
  return (
    <div className="mt-8 md:mt-12 lg:mt-15">
      <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
        {/* text */}
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">
          Why Choose Chewata Awaqi?
        </h1>
        {/* card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyChooseUs.map((why) => (
            <div
              key={why.title}
              className="flex flex-col items-center justify-center gap-6 p-5 md:p-8 bg-muted rounded-xl"
            >
              {<why.icon className="text-[#FACC15]" />}
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
