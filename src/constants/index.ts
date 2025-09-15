import {
  Briefcase,
  Calendar,
  Crown,
  FileText,
  HeartHandshake,
  ShoppingCart,
} from "lucide-react";
enum PurchaseType {
  Rent = "rent",
  Sale = "sale",
  Both = "both",
}
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
const gameCategory = [
  {
    label: "Physical Game",
    id: "physical",
    value: "physical",
  },
  {
    label: "Board Game",
    id: "board",
    value: "board",
  },
  {
    label: "Virtual Game",
    id: "virtual",
    value: "virtual",
  },
  {
    label: "Table Game",
    id: "table",
    value: "table",
  },
];
const purchaseType = ["BUY", "RENT", "BOTH"];
export type sortValueType =
  | "NEWEST"
  | "POPULAR"
  | "PRICE_LOW_HIGH"
  | "PRICE_HIGH_LOW";
type sortByType = {
  label: string;
  value: sortValueType;
};
const sortBy: sortByType[] = [
  {
    label: "Newest",
    value: "NEWEST",
  },
  {
    label: "Most Popular",
    value: "POPULAR",
  },
  {
    label: "Price: Low to High",
    value: "PRICE_LOW_HIGH",
  },
  {
    label: "Price: High to Low",
    value: "PRICE_HIGH_LOW",
  },
];
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;
const MIN_PAGE_SIZE = 1;
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000000;
export {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
  DEFAULT_MIN_PRICE,
  DEFAULT_MAX_PRICE,
  navlinks,
  heroImages,
  whyChooseUs,
  testimonials,
  gameCategory,
  purchaseType,
  sortBy,
  PurchaseType,
};
