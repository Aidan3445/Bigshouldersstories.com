import Socials from "../footer/socials";
import copy from "@/lib/copy";

export default function LetsChat() {
  return (
    <section className="section-white">
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
      <Socials />
    </section>
  );
}
