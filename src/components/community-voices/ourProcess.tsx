import copy from "@/lib/copy";

export default function OurProcess() {
  return (
    <section className="section-white flex justify-center items-center flex-wrap">
      <div className="flex flex-col">
        <h1 className="title-white text-left">
          {copy["community-voices"].sections.ourProcess.title}
        </h1>
        <div className="flex flex-col">
          <p className="body-white text-left">
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
      </div>
      <img
        src="/flag_logo.png"
        alt="Seeking human kindness"
        className="w-100 h-100 object-cover" />
    </section>
  );
}
