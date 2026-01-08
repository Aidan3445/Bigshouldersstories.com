import FooterNav from "../footer/navLinks";
import ContactForm from "./contactForm";
import copy from "@/lib/copy";

export default function LetsChat() {
  return (
    <section className="section-white relative">
      <h1 className="title-white">
        {copy.contact.sections.letsChat.title}
      </h1>
      <p className="body-white text-left mx-auto max-w-3xl mb-12">
        {copy.contact.sections.letsChat.body[0]}
      </p>
      <ContactForm defaultExpanded={true} />
      <FooterNav />
    </section>
  );
}
