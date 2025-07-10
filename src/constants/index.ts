import {
  Briefcase,
  Calendar,
  Crown,
  FileText,
  HeartHandshake,
  ShoppingCart,
} from "lucide-react";

const navlinks = [
  {
    label: "Shop",
    href: "/shop",
    icon: ShoppingCart,
  },
  {
    label: "Blog",
    href: "/shop",
    icon: FileText,
  },
  {
    label: "Events",
    href: "/shop",
    icon: Calendar,
  },
];
const heroImages = [
  "/assets/images/dart.jpg",
  "/assets/images/ps5.jpg",
  "/assets/images/chess.jpg",
];
const whyChooseUs = [
  {
    icon: Crown,
    title: "Wide Selection",
    subtitle:
      "Extensive collection of board games, card games, and accessories available for both purchase and rental",
  },
  {
    icon: HeartHandshake,
    title: "Community Events",
    subtitle:
      "Regular tournaments, game nights, and special events hosted by our team to bring gamers together",
  },
  {
    icon: Briefcase,
    title: "Affordable & Accessible",
    subtitle:
      "Competitive prices and flexible rental options make premium gaming accessible to everyone",
  },
];
const testimonials = [
  {
    star: 5,
    comment: "Best game night ever — I made new friends!",
    username: "Amanuel D.",
    userImg: "",
  },
  {
    star: 5,
    comment: "I wasn’t even into games before, now I go to every event!",
    username: "Abel T.",
    userImg: "",
  },
  {
    star: 5,
    comment:
      "Affordable, smooth, and super fun — can’t wait for the next night!",
    username: "Betty J.",
    userImg: "",
  },
  {
    star: 5,
    comment: "Renting was so easy, and everything came in great condition.",
    username: "Dagi W.",
    userImg: "",
  },
];
export { navlinks, heroImages, whyChooseUs, testimonials };
