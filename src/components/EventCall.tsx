import Image from "next/image";
import { Button } from "./ui/button";

const EventCall = () => {
  return (
    <div className="mt-8 md:mt-12 lg:mt-15">
      <div className="flex flex-col md:flex-row min-h-[300px] md:min-h-[400px] gap-8 ">
        {/* left */}
        <div className="flex flex-col gap-6 justify-center items-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold md:font-bold ">
            See What`s Coming Up Next
          </h1>
          <p>
            Game Nights & Epic Showdowns <br /> and fun with friends-- <br />
            With
            <span className="ml-2 text-2xl md:text-3xl lg:text-4xl font-bold stroke-text text-transparent">
              Chewata Awaqi
            </span>
          </p>
          <div className="">
            <Button className="text-xl px-5 py-7 md:p-8 font-semibold bg-[#FACC15] cursor-pointer">
              Join The Action
            </Button>
          </div>
        </div>
        {/* right */}
        <div className="flex-1 grid grid-cols-2 min-h-[300px] md:min-h-[400px] rounded-sm">
          <div className="col-span-2 relative">
            <Image
              src="/assets/images/gameon.jpg"
              alt="game on"
              fill
              className="object-cover "
            />
          </div>
          <div className="relative">
            <Image
              src="/assets/images/gamenight.jpg"
              alt="game on"
              fill
              className="object-cover "
            />
          </div>
          <div className="relative">
            <Image
              src="/assets/images/gamezone.jpg"
              alt="game on"
              fill
              className="object-cover "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCall;
