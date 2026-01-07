import { Link } from '@tanstack/react-router';
import { HeaderImage } from '../headerImage';
import { Button } from '@/components/ui/button';
import copy from '@/lib/copy';

export default function Header() {
  return (
    <HeaderImage imageSrc="/home_header.jpg" headerText={copy.home.header.text} >
      <span className="flex gap-4 flex-wrap justify-center">
        <Link to="/community-voices">
          <Button className="bg-blue-900 hover:bg-blue-700 text-white font-bold text-lg w-60">
            {copy.home.header.navigation.production}
          </Button>
        </Link>
        <Link to="/coaching">
          <Button className="bg-blue-900 hover:bg-blue-700 text-white font-bold text-lg w-60">
            {copy.home.header.navigation.individual}
          </Button>
        </Link>
      </span>
    </HeaderImage>
  );
}
