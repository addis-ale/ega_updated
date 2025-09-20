import { Facebook, Instagram, Linkedin, Send } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted mt-8 md:mt-12 lg:mt-15 py-8">
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 items-center">
        {/* Brand */}
        <div className="text-muted-foreground">
          <h2 className="text-xl font-bold text-white">EGA</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your ultimate game gear marketplace — rent or buy with ease.
          </p>
          <div className="flex gap-3 mt-4">
            {/* Replace with your SVGs or icons */}
            <a href="#">
              <Instagram className="w-5 h-5 text-pink-500" />
            </a>
            <a href="#" className="">
              <Facebook className="w-5 h-5 text-blue-600" />
            </a>
            <a href="#">
              <Send className="w-5 h-5 text-cyan-500" />
            </a>
            <a href="#">
              <Linkedin className="w-5 h-5 text-blue-700" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="text-muted-foreground space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Rent
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Legal & Support */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <ul className="text-muted-foreground space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Return Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of Use
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Get Updates</h3>
          <p className="text-muted-foreground text-sm mb-3">
            Get deals and new arrivals in your inbox.
          </p>
          <div className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-2 py-1 rounded text-black text-sm w-full bg-muted-foreground focus:outline-none"
            />
            <button className="bg-blue-600 px-3 py-1 rounded text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} EGA. All rights reserved.
      </div>
    </footer>
  );
};
