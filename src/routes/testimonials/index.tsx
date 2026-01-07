import { createFileRoute } from '@tanstack/react-router'
import WhatsYourStory from '@/components/footer/whatsYourStory'
import FromOurPartners from '@/components/testimonials/fromOurPartners';
import Section1 from '@/components/testimonials/section1';
import Section2 from '@/components/testimonials/section2';
import Section3 from '@/components/testimonials/section3';
import Section4 from '@/components/testimonials/section4';
import { HeaderImage } from '@/components/headerImage';
import copy from '@/lib/copy';

export const Route = createFileRoute('/testimonials/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <HeaderImage imageSrc="/testimonials_header.jpg" headerText={copy.testimonials.header.text} />
      <FromOurPartners />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <WhatsYourStory />
    </main>
  );
}
