import Quote from "./quote";
import copy from "@/lib/copy";

export default function Section3() {
  return (
    <section className='section-blue flex justify-center'>
      <Quote
        quote={copy.testimonials.sections.quote4.body[0]}
        name={copy.testimonials.sections.quote4.body[1]}
        title={copy.testimonials.sections.quote4.body[2]}
        quoteClassName="max-w-6xl"
        parity="blue" />
    </section>
  );
}
