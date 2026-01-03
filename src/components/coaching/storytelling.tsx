import copy from "@/lib/copy";

export default function Storytelling() {
  return (
    <section className="section-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="title-white">
          {copy.coaching.sections.storytelling.title}
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <p className="body-white text-left">
            {copy.coaching.sections.storytelling.body[0]}
          </p>
          <p className="body-white text-left">
            {copy.coaching.sections.storytelling.body[1]}
          </p>
        </div>
        <p className="body-white text-left w-full max-w-none mt-4">
          {copy.coaching.sections.storytelling.body[2]}
        </p>
      </div>
    </section>
  );
}
