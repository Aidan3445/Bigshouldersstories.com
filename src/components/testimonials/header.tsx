import copy from '@/lib/copy';

export default function Header() {
  return (
    <section
      className="relative h-180 mt-16 bg-cover bg-center flex flex-col items-center justify-center gap-6"
      style={{ backgroundImage: "url('/testimonials_header.jpg')" }}>
      <h1 className="text-white text-5xl font-extrabold bg-black/50 px-4 py-2 rounded text-center">
        {copy.testimonials.header.text}
      </h1>
    </section>
  );
}
