import Quote from "./quote";
import copy from "@/lib/copy";

export default function Section2() {
  return (
    <section className='section-white flex justify-center'>
      <Quote
        quote={copy.testimonials.sections.quote3.body[0]}
        name={copy.testimonials.sections.quote3.body[1]}
        title={copy.testimonials.sections.quote3.body[2]}
        quoteClassName="max-w-6xl"
        parity="white" />
    </section>
  );
}
