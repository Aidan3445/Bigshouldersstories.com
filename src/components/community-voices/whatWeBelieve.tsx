import copy from "@/lib/copy";

export default function WhatWeBelieve() {
  return (
    <section className="section-white">
      <span className="flex justify-evenly items-center flex-wrap gap-8">
        <div className="max-w-md">
          <h1 className="title-white">
            {copy["community-voices"].sections.whatWeBelieve.title}
          </h1>
          <p className="body-white mx-auto text-left">
            {copy["community-voices"].sections.whatWeBelieve.body[0]}
          </p>
        </div>
        <div className="max-w-md">
          <p className="body-white mb-4 text-left">
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
      </span>
    </section>
  );
}
