import Socials from "../footer/socials";
import copy from "@/lib/copy";

export default function LetsChat() {
  return (
    <section className="section-white relative">
      <h1 className="title-white">
        {copy.contact.sections.letsChat.title}
      </h1>
      <p className="body-white text-left mx-auto max-w-3xl">
        {copy.contact.sections.letsChat.body[0]}
        <br />
        {copy.contact.sections.letsChat.body[1]}{' '}
        <a
          href={copy.common.sections.contact.links[0].href}
          className="text-blue-600 underline"
        >
          {copy.common.sections.contact.links[0].text}
        </a>
        .
      </p>
      <div className="flex justify-between items-end">
        <Socials />
        <img
          src="/flag_logo.png"
          alt="Big Shoulders Stories Flag Logo"
          className="w-50 h-50 object-cover xl:absolute xl:right-4 -mb-6" />
      </div>
    </section>
  );
}
