import copy from '@/lib/copy';

export default function WhyWeDoIt() {
  return (
    <section
      className="relative h-150 bg-cover bg-center flex flex-col gap-6 pt-32"
      style={{ backgroundImage: "url('/notebook.jpeg')" }}>
      <span className="grid grid-cols-2 gap-8 px-4">
        <h1 className="w-full title-white text-center justify-self-end max-w-72 min-[870px]:max-w-none min-[870px]:pl-28">
          {copy.home.sections.whyWeDoIt.title}
        </h1>
        <p className="w-full body-white mb-4 text-sm md:text-base lg:text-lg xl:text-xl leading-tight justify-self-start max-w-72 min-[870px]:max-w-none min-[870px]:pr-38">
          {copy.home.sections.whyWeDoIt.body[0]}
          <br />
          <br />
          {copy.home.sections.whyWeDoIt.body[1]}
        </p>
      </span>
    </section>
  );
}
