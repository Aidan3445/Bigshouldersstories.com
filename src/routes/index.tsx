import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/home/header';
import WhatWeDo from '@/components/home/whatWeDo';
import WhyStoriesMatter from '@/components/home/whyStoriesMatter';
import WhyWeDoIt from '@/components/home/whyWeDoIt';
import WhatsYourStory from '@/components/footer/whatsYourStory';
import MyStory from '@/components/home/myStory';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <Header />
      <WhatWeDo />
      <WhyStoriesMatter />
      <WhyWeDoIt />
      <MyStory />
      <WhatsYourStory />
    </main>
  );
}
