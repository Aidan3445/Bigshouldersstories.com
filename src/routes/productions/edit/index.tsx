import { createFileRoute } from '@tanstack/react-router'
import { getEventsData } from './events.server-funcs';
import Edit from '@/components/productions/edit';

export const Route = createFileRoute('/productions/edit/')({
  component: RouteComponent,
  loader: async () => await getEventsData(),
})

function RouteComponent() {
  return (
    <main className="mt-16">
      <Edit />
    </main>
  );
}
