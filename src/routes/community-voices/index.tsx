import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/community-voices/header';
import WhatWeBelieve from '@/components/community-voices/whatWeBelieve';
import OurGoal from '@/components/community-voices/ourGoal';
import OurProcess from '@/components/community-voices/ourProcess';
import WhatsYourStory from '@/components/footer/whatsYourStory';
import OurServices from '@/components/community-voices/ourServices';

export const Route = createFileRoute('/community-voices/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <Header />
      <WhatWeBelieve />
      <OurGoal />
      <OurProcess />
      <OurServices />
      <WhatsYourStory />
    </main>
  );
}
