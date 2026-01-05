import { createFileRoute, redirect } from '@tanstack/react-router'
import { getEventsData } from '@/server/events';
import Edit from '@/components/productions/edit';
import { getAuthStatus } from '@/server/auth';

export const Route = createFileRoute('/productions/edit/')({
  component: RouteComponent,
  beforeLoad: async () => {
    const auth = await getAuthStatus();
    if (auth.locked) {
      throw redirect({
        to: '/productions',
      });
    } else if (!auth.authenticated) {
      throw redirect({
        to: '/productions/login',
      });
    }
  },
  loader: async () => await getEventsData(),
})

function RouteComponent() {
  return (
    <main className="mt-16">
      <Edit />
    </main>
  );
}
