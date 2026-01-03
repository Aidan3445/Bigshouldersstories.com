import { createFileRoute } from '@tanstack/react-router'
import WhatsYourStory from '@/components/footer/whatsYourStory'
import Header from '@/components/productions/header';

export const Route = createFileRoute('/productions/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <Header />
      <WhatsYourStory />
    </main>
  );
}
