import copy from '@/lib/copy';

export default function WhyWeDoIt() {
  return (
    <section
      className="relative h-150 bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/notebook.jpg')" }}>
      <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-4 px-2 max-w-[620px] min-[865px]:max-w-none min-[865px]:pl-[12.5%] min-[865px]:pr-[13%]">
        <h1 className="col-start-1 row-start-1 w-full title-white text-center">
          {copy.home.sections.whyWeDoIt.title}
        </h1>
        <p className="col-start-1 row-start-2 w-full text-left body-white text-sm md:text-base lg:text-lg xl:text-xl leading-tight">
          {copy.home.sections.whyWeDoIt.body[0]}
        </p>
        <p className="col-start-2 row-start-2 w-full text-left body-white text-sm md:text-base lg:text-lg xl:text-xl leading-tight">
          {copy.home.sections.whyWeDoIt.body[1]}
        </p>
      </div>
    </section>
  );
}
