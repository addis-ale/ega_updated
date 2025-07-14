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
const purchaseType = ["Buy", "Rent", "Both"];
const sortBy = [
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Most Popular",
    value: "popular",
  },
  {
    label: "Price: Low to High",
    value: "price-low",
  },
  {
    label: "Price: High to Low",
    value: "price-high",
  },
];
const productLists = [
  {
    productId: 1,
    ProductPurchaseType: PurchaseType.Sale,
    productName: "FIFA 24 PS5 Disc",
    productImg: "/assets/images/dart.jpg",
    productDiscount: 20,
    productSallingPrice: 2499,
  },
  {
    productId: 2,
    ProductPurchaseType: PurchaseType.Rent,
    productName: "God of War Ragnarok",
    productImg: "/assets/images/chess.jpg",
    productDiscount: 10,
    productRentalPrice: 399,
    productRentPer: "week",
  },
  {
    productId: 3,
    ProductPurchaseType: PurchaseType.Sale,
    productName: "Call of Duty Modern Warfare II",
    productImg: "/assets/images/chess.jpg",
    productDiscount: 15,
    productSallingPrice: 2999,
  },
  {
    productId: 4,
    ProductPurchaseType: PurchaseType.Rent,
    productName: "Elden Ring PS5",
    productImg: "/assets/images/dart.jpg",
    productDiscount: 5,
    productRentalPrice: 499,
    productRentPer: "day",
  },
  {
    productId: 5,
    ProductPurchaseType: PurchaseType.Sale,
    productName: "Spider-Man: Miles Morales",
    productImg: "/assets/images/ps5.jpg",
    productDiscount: 25,
    productSallingPrice: 1899,
  },
  {
    productId: 6,
    ProductPurchaseType: PurchaseType.Both,
    productName: "Hogwarts Legacy",
    productImg: "/assets/images/tennis.jpg",
    productDiscount: 15,
    productSallingPrice: 2599,
    productRentalPrice: 499,
    productRentPer: "week",
  },
];
export {
  navlinks,
  heroImages,
  whyChooseUs,
  testimonials,
  gameCategory,
  purchaseType,
  sortBy,
  productLists,
  PurchaseType,
};
