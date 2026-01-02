import { createFileRoute } from '@tanstack/react-router'
import Header from '@/components/community-voices/header';
import WhatWeBelieve from '@/components/community-voices/whatWeBelieve';

export const Route = createFileRoute('/community-voices/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <Header />
      <WhatWeBelieve />
    </main>
  );
}
