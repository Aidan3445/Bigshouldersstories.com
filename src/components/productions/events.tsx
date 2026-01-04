import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Route } from "@/routes/productions";

export default function Events() {
  const eventsData = Route.useLoaderData();

  return (
    <>
      <section className="section-white">
        <h2 className="title-white text-center mb-0">
          Big Shoulders Stories Presents:
        </h2>
      </section>
      {eventsData.map((event, index) => (
        <section
          key={event.id}
          className={cn(
            "flex flex-col md:flex-row gap-8 md:gap-12 items-center px-16",
            index % 2 === 0 ? "section-white" : "section-blue md:flex-row-reverse")}>
          <div className={cn(
            "w-full md:w-1/2 shrink-0",
            index % 2 === 0 ? "md:ml-8" : "md:mr-8")}>
            {event.imageId ? (
              <a
                href={event.videoUrl}
                target="_blank"
                rel="noopener noreferrer">
                <img
                  src={`${process.env.UPLOADTHING_IMAGE_URL}/${event.imageId}`}
                  alt={event.name}
                  className="w-full h-auto rounded-lg shadow-lg object-cover" />
              </a>
            ) : (
              <div className="aspect-4/3 bg-gray-300 rounded-sm shadow-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">Event Image</span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-full md:w-1/2 space-y-4",
            index % 2 === 0 ? "md:mr-8" : "md:ml-8")}>
            {event.collaborators && event.collaborators.length > 0 && (
              <h2 className={cn(
                "text-xl md:text-2xl text-left",
                index % 2 === 0 ? "title-white" : "title-blue")}>
                In collaboration with:
                <br />
                <i>{event.collaborators.join(", ")}</i>
              </h2>
            )}
            <h3 className="text-3xl md:text-4xl font-bold text-[#f96b3d] text-left">
              {event.name}
            </h3>
            <p className={cn(
              "max-w-none text-left",
              index % 2 === 0 ? "body-white" : "body-blue")}>
              {event.description}
            </p>
            <a
              href={event.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-block font-semibold px-6 py-3 rounded transition-colors",
                index % 2 === 0
                  ? "bg-sky-700 text-white hover:bg-sky-800"
                  : "bg-white text-sky-700 hover:bg-gray-200")}>
              Watch Video
            </a>
          </div>
        </section>
      ))}
    </>
  );
}
