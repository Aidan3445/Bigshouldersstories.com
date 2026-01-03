import copy from "@/lib/copy";

export default function WhatWeBelieve() {
  return (
    <section className="section-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="title-white text-left">
          {copy["community-voices"].sections.whatWeBelieve.title}
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <p className="body-white text-left">
            {copy["community-voices"].sections.whatWeBelieve.body[0]}
          </p>
          <div>
            <p className="body-white text-left">
              {copy["community-voices"].sections.whatWeBelieve.body[1]}
              <br />
              {copy["community-voices"].sections.whatWeBelieve.body[2]}
              <br />
              {copy["community-voices"].sections.whatWeBelieve.body[3]}
            </p>
            <p className="body-white italic text-right">
              {copy["community-voices"].sections.whatWeBelieve.body[4]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
