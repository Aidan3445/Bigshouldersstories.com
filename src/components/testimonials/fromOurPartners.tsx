import copy from "@/lib/copy";

export default function FromOurPartners() {
  return (
    <section className="section-white pb-0">
      <p className="body-white max-w-4xl mx-auto">
        {copy.testimonials.sections.partners.body[0]}
      </p>
      <h1 className="title-white mt-8">
        {copy.testimonials.sections.partners.title}
      </h1>
    </section>
  );
}
