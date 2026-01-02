import { Button } from '@/components/ui/button';
import copy from '@/lib/copy';

export default function Header() {
  return (
    <section
      className="relative h-220 bg-cover bg-center flex flex-col items-center justify-center gap-6"
      style={{ backgroundImage: "url('/home_header.jpeg')" }}>
      <h1 className="text-white text-5xl font-extrabold bg-black/50 px-4 py-2 rounded text-center">
        {copy.home.header.headerText}
      </h1>
      <span className="flex gap-4 flex-wrap justify-center">
        <Button className="bg-blue-900 hover:bg-blue-700 text-white font-bold text-lg w-60">
          {copy.home.header.navigation.production}
        </Button>
        <Button className="bg-blue-900 hover:bg-blue-700 text-white font-bold text-lg w-60">
          {copy.home.header.navigation.individual}
        </Button>
      </span>
    </section>
  );
}
