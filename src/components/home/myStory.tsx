import copy from '@/lib/copy';

export default function MyStory() {
  return (
    <section className="section-blue">
      <span className="flex justify-evenly items-center flex-wrap gap-8">
        <div className="max-w-md">
          <h1 className="title-blue">
            {copy.home.sections.myStory.title}
          </h1>
          <p className="body-blue text-left">
            {copy.home.sections.myStory.body[0]}
            <br /><br />
            {copy.home.sections.myStory.body[1]}
          </p>
        </div>
        <img
          src="/suzy.jpg"
          alt="Seeking human kindness"
          className="w-auto h-150 object-cover rounded-lg shadow-lg mb-4" />
      </span>
    </section>
  );
}
