import copy from "@/lib/copy";

export default function OurGoal() {
  return (
    <section className="section-blue">
      <h1 className="title-blue">
        {copy["community-voices"].sections.ourGoal.title}
      </h1>
      <p className="body-blue mx-auto text-left md:text-center">
        {copy["community-voices"].sections.ourGoal.body[0]}
      </p>
    </section>
  );
}
