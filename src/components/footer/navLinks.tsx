import { Link } from "@tanstack/react-router";
import Socials from "./socials";
import copy from "@/lib/copy";

export default function FooterNav() {
  return (
    <>
      <nav className="flex flex-col sm:flex-row sm:items-center pt-6 mt-6 gap-2 sm:gap-x-6 border-t border-gray-200 sm:flex-wrap">
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="text-gray-800 hover:text-sky-700 transition-colors">
          Home
        </Link>
        <Link
          to="/community-voices"
          onClick={() => window.scrollTo(0, 0)}
          className="text-gray-800 hover:text-sky-700 transition-colors">
          {copy["community-voices"].header.text}
        </Link>
        <Link
          to="/productions"
          onClick={() => window.scrollTo(0, 0)}
          className="text-gray-800 hover:text-sky-700 transition-colors">
          {copy.productions.header.text}
        </Link>
        <Link
          to="/coaching"
          onClick={() => window.scrollTo(0, 0)}
          className="text-gray-800 hover:text-sky-700 transition-colors">
          {copy.coaching.header.text}
        </Link>
        <Link
          to="/testimonials"
          onClick={() => window.scrollTo(0, 0)}
          className="text-gray-800 hover:text-sky-700 transition-colors">
          {copy.testimonials.header.text}
        </Link>
        <Link
          to="/contact"
          onClick={() => window.scrollTo(0, 0)}
          className="text-gray-800 hover:text-sky-700 transition-colors">
          {copy.common.sections.contact.title}
        </Link>
      </nav>
      <div className="flex justify-between items-end flex-wrap mt-6">
        <Socials />
        <img
          src="/flag_logo.png"
          alt="Big Shoulders Stories Logo"
          className="h-40" />
      </div>
      <p className="text-sm text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} Big Shoulders Stories. All rights reserved.
      </p>
    </>
  );
}
