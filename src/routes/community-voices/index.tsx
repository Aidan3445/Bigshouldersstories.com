import { createFileRoute } from '@tanstack/react-router'
import WhatWeBelieve from '@/components/community-voices/whatWeBelieve';
import OurGoal from '@/components/community-voices/ourGoal';
import OurProcess from '@/components/community-voices/ourProcess';
import WhatsYourStory from '@/components/footer/whatsYourStory';
import OurServices from '@/components/community-voices/ourServices';
import { HeaderImage } from '@/components/headerImage';
import copy from '@/lib/copy';

export const Route = createFileRoute('/community-voices/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <HeaderImage imageSrc="/voices_header.jpg" headerText={copy['community-voices'].header.text} />
      <WhatWeBelieve />
      <OurGoal />
      <OurProcess />
      <OurServices />
      <WhatsYourStory />
    </main>
  );
}
