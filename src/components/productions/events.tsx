import { Route } from "@/routes/productions";

export default function Events() {
  const eventsData = Route.useLoaderData();
  return (
    <section className="section-blue">
      <h1>Events Page</h1>
      <ul>
        {eventsData.map((event) => (
          <li key={event.id} className="mb-4">
            <h2 className="text-xl font-bold">{event.name}</h2>
            <p>{event.description}</p>
            <a
              href={event.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline">
              Watch Video
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
