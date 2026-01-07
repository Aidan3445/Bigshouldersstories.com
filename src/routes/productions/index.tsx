import { createFileRoute } from '@tanstack/react-router'
import { getEventsData } from '@/server/events';
import WhatsYourStory from '@/components/footer/whatsYourStory'
import Events from '@/components/productions/events';
import { HeaderImage } from '@/components/headerImage';
import copy from '@/lib/copy';

export const Route = createFileRoute('/productions/')({
  component: RouteComponent,
  loader: async () => await getEventsData(),
})

function RouteComponent() {
  return (
    <main>
      <HeaderImage imageSrc="/productions_header.jpg" headerText={copy.productions.header.text} />
      <Events />
      <WhatsYourStory />
    </main>
  );
}
