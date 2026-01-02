import copy from "@/lib/copy";

export default function WhatWeDo() {
  return (
    <section className="section-white">
      <h1 className="title-white">
        {copy.home.sections.whatWeDo.title}
      </h1>
      <p className="body-white mx-auto">
        {copy.home.sections.whatWeDo.body[0]}
      </p>
    </section>
  );
}
