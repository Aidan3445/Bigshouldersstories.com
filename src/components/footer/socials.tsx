import Facebook from "./facebook";
import Instagram from "./instagram";
import Linkedin from "./linkedin";
import YouTube from "./youTube";
import copy from "@/lib/copy";

export default function Socials() {
  return (
    <span className="flex gap-4">
      <Instagram size={32} color="#000000" href={copy.common.socials.instagram} />
      <Facebook size={32} color="#000000" href={copy.common.socials.facebook} />
      <YouTube size={32} color="#000000" href={copy.common.socials.youTube} />
      <Linkedin size={32} color="#000000" href={copy.common.socials.linkedin} />
    </span>
  );
}
