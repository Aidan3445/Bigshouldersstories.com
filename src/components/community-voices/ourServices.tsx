import copy from "@/lib/copy";

export default function OurServices() {
  return (
    <section className="section-blue">
      <div className="max-w-5xl mx-auto">
        <h1 className="title-blue text-left">
          {copy["community-voices"].sections.ourServices.title}
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <ul className="body-blue list-disc space-y-2 text-left ml-5">
            {copy["community-voices"].sections.ourServices.body.slice(0, 4).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <div className="body-blue space-y-4 text-left">
            <p>{copy["community-voices"].sections.ourServices.body[4]}</p>
            <p>{copy["community-voices"].sections.ourServices.body[5]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
