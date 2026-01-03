import copy from "@/lib/copy";

export default function OurProcess() {
  return (
    <section className="section-white">
      <h1 className="title-white">
        {copy["community-voices"].sections.ourProcess.title}
      </h1>
      <div className="flex flex-col justify-center items-center">
        <p className="body-white mx-auto text-left">
          {copy["community-voices"].sections.ourProcess.body[0]}
        </p>
        <ul className="body-white list-disc text-left">
          <li>{copy["community-voices"].sections.ourProcess.body[1]}</li>
          <li>{copy["community-voices"].sections.ourProcess.body[2]}</li>
          <li>{copy["community-voices"].sections.ourProcess.body[3]}</li>
          <li>{copy["community-voices"].sections.ourProcess.body[4]}</li>
          <li>{copy["community-voices"].sections.ourProcess.body[5]}</li>
        </ul>
      </div>
    </section>
  );
}
