import copy from "@/lib/copy";

export default function CollegeEssays() {
  return (
    <section className="section-blue">
      <h1 className="title-blue">
        {copy.coaching.sections.collegeEssays.title}
      </h1>
      <p className="body-blue max-w-5xl mx-auto">
        {copy.coaching.sections.collegeEssays.body[0]}
      </p>
    </section>
  );
}
