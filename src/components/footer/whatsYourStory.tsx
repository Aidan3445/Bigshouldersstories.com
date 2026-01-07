import { Link } from "@tanstack/react-router";
import Socials from "../footer/socials";
import copy from "@/lib/copy";

export default function WhatsYourStory() {
  return (
    <section className="section-white border-t-4 border-t-sky-700">
      <h1 className="title-white">
        {copy.common.sections.contact.title}
      </h1>
      <p className="body-white mx-auto max-w-none">
        {copy.common.sections.contact.body[0]}{' '}
        <a
          href={copy.common.sections.contact.links[0].href}
          className="text-blue-600 underline">
          {copy.common.sections.contact.links[0].text}
        </a>
        .
        <br />
        {copy.common.sections.contact.body[1]}
      </p>
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
    </section>
  );
}
