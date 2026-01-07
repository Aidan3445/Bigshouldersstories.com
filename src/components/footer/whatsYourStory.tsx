import FooterNav from "./navLinks";
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
      <FooterNav />
    </section>
  );
}
