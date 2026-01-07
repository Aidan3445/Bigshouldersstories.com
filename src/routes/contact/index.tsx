import { createFileRoute } from '@tanstack/react-router'
import LetsChat from '@/components/contact/letsChat';
import { HeaderImage } from '@/components/headerImage';
import copy from '@/lib/copy';

export const Route = createFileRoute('/contact/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <HeaderImage imageSrc="/contact_header.jpg" headerText={copy.contact.header.text} />
      <LetsChat />
    </main>
  );
}
