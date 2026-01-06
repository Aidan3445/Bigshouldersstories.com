import copy from '@/lib/copy';

export default function WhyStoriesMatter() {
  return (
    <section className="section-blue">
      <span className="flex justify-evenly items-center flex-wrap gap-8">
        <img
          src="/fonda.jpg"
          alt="Seeking human kindness"
          className="w-150 h-100 object-cover rounded-lg shadow-lg mb-4" />
        <div className="max-w-md">
          <h1 className="title-blue">
            {copy.home.sections.whyStoriesMatter.title}
          </h1>
          <p className="body-blue mb-4 text-left">
            {copy.home.sections.whyStoriesMatter.body[0]}
          </p>
          <p className="body-blue italic text-right">
            {copy.home.sections.whyStoriesMatter.body[1]}
          </p>
        </div>
      </span>
    </section>
  );
}
