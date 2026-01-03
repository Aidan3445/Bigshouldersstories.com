import copy from "@/lib/copy";

export default function OurServices() {
  return (
    <section className="section-blue">
      <h1 className="title-blue">
        {copy["community-voices"].sections.ourServices.title}
      </h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <ul className="body-blue list-disc space-y-2 text-left">
          {copy["community-voices"].sections.ourServices.body.slice(0, 4).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div className="body-blue space-y-4 text-left">
          <p>{copy["community-voices"].sections.ourServices.body[4]}</p>
          <p>{copy["community-voices"].sections.ourServices.body[5]}</p>
        </div>
      </div>
    </section>
  );
}
