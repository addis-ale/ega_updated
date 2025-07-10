import { testimonials } from "@/constants";
import StarRating from "./StarRating";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Testimony = () => {
  return (
    <div className="mt-8 md:mt-12 lg:mt-15">
      <div className="flex justify-center items-center flex-col gap-8 md:gap-12">
        {/* title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl">What Our Users Say</h1>
        {/* testimony */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {testimonials.map((testimony) => (
            <div key={testimony.username} className="flex flex-col gap-6">
              <StarRating
                totalStars={5}
                initialRating={testimony.star}
                readOnly={true}
              />
              <p className="italic">{`"${testimony.comment}"`}</p>
              <div className="flex items-center gap-2">
                <Avatar className="">
                  <AvatarImage
                    src="/images/your-avatar.jpg"
                    alt="User Avatar"
                  />
                  <AvatarFallback>A</AvatarFallback>{" "}
                  {/* fallback if image fails to load */}
                </Avatar>
                <span>{testimony.username}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimony;
