import FooterNav from "./navLinks";
import ContactForm from "../contact/contactForm";
import copy from "@/lib/copy";

export default function WhatsYourStory() {
  return (
    <section className="section-white border-t-4 border-t-sky-700">
      <h1 className="title-white">
        {copy.common.sections.contact.title}
      </h1>
      <p className="body-white mx-auto max-w-none mb-12">
        {copy.common.sections.contact.body[1]}
      </p>
      <ContactForm />
      <FooterNav />
    </section>
  );
}
