import Quote from "./quote";
import copy from "@/lib/copy";

export default function Section4() {
  return (
    <section className='section-white grid gap-9 grid-cols-1 md:grid-cols-2 justify-items-center'>
      <Quote
        quote={copy.testimonials.sections.quote5.body[0]}
        name={copy.testimonials.sections.quote5.body[1]}
        title={copy.testimonials.sections.quote5.body[2]}
        parity="white" />
      <Quote
        quote={copy.testimonials.sections.quote6.body[0]}
        name={copy.testimonials.sections.quote6.body[1]}
        title={copy.testimonials.sections.quote6.body[2]}
        parity="white" />
    </section>
  );
}
