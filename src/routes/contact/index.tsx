import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/contact/header';
import LetsChat from '@/components/contact/letsChat';

export const Route = createFileRoute('/contact/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <Header />
      <LetsChat />
    </main>
  );
}
