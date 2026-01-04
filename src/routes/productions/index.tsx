import { createFileRoute } from '@tanstack/react-router'
import { getEventsData } from './events.server-funcs';
import WhatsYourStory from '@/components/footer/whatsYourStory'
import Header from '@/components/productions/header';
import Events from '@/components/productions/events';
import Edit from '@/components/productions/edit';


export const Route = createFileRoute('/productions/')({
  component: RouteComponent,
  loader: async () => await getEventsData(),
})

function RouteComponent() {
  return (
    <main>
      <Header />
      <Edit />
      <Events />
      <WhatsYourStory />
    </main>
  );
}
