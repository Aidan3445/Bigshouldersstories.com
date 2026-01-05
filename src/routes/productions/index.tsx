import { createFileRoute } from '@tanstack/react-router'
import { getEventsData } from '@/server/events';
import WhatsYourStory from '@/components/footer/whatsYourStory'
import Header from '@/components/productions/header';
import Events from '@/components/productions/events';

export const Route = createFileRoute('/productions/')({
  component: RouteComponent,
  loader: async () => await getEventsData(),
})

function RouteComponent() {
  return (
    <main>
      <Header />
      <Events />
      <WhatsYourStory />
    </main>
  );
}
