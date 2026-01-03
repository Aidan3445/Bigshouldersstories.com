import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from "@tanstack/react-start";
import { asc } from "drizzle-orm";
import WhatsYourStory from '@/components/footer/whatsYourStory'
import Header from '@/components/productions/header';
import Events from '@/components/productions/events';
import { db } from "@/db";
import { productions } from "@/db/schema";

const getEventsData = createServerFn({
  method: "GET",
}).handler(async () => {
  return await db
    .query.productions.findMany({
      orderBy: [asc(productions.order)],
    });
});
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
