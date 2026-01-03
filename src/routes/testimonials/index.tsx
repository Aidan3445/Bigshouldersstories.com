import { createFileRoute } from '@tanstack/react-router'
import WhatsYourStory from '@/components/footer/whatsYourStory'
import Header from '@/components/testimonials/header';
import FromOurPartners from '@/components/testimonials/fromOurPartners';
import Section1 from '@/components/testimonials/section1';
import Section2 from '@/components/testimonials/section2';
import Section3 from '@/components/testimonials/section3';
import Section4 from '@/components/testimonials/section4';

export const Route = createFileRoute('/testimonials/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <Header />
      <FromOurPartners />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <WhatsYourStory />
    </main>
  );
}
