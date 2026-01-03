import Quote from "./quote";
import copy from "@/lib/copy";

export default function Section1() {
  return (
    <section className='section-blue flex gap-8 justify-around flex-wrap'>
      <Quote
        quote={copy.testimonials.sections.quote1.body[0]}
        name={copy.testimonials.sections.quote1.body[1]}
        title={copy.testimonials.sections.quote1.body[2]}
        parity="blue" />
      <Quote
        quote={copy.testimonials.sections.quote2.body[0]}
        name={copy.testimonials.sections.quote2.body[1]}
        title={copy.testimonials.sections.quote2.body[2]}
        parity="blue" />
    </section>
  );
}
