import copy from '@/lib/copy';

export default function Header() {
  return (
    <section
      className="relative mt-16 h-150 bg-cover bg-top flex flex-col items-center justify-center gap-6"
      style={{ backgroundImage: "url('/productions_header.jpg')" }}>
      <h1 className="text-white text-5xl font-extrabold bg-black/50 px-4 py-2 rounded text-center">
        {copy.productions.header.text}
      </h1>
    </section>
  );
}
