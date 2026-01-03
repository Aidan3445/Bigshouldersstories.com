import { cn } from "@/lib/utils";

interface QuoteProps {
  quote: string;
  name: string;
  title: string;
  parity: "white" | "blue";
  titleClassName?: string;
}

export default function Quote({ quote, name, title, parity, titleClassName }: QuoteProps) {
  return (
    <div>
      <p className={cn(`body-${parity} mb-4 text-left`, titleClassName)}>
        {quote}
      </p>
      <p className={`body-${parity} text-sm italic text-left`}>
        {name}
        <br />
        {title}
      </p>
    </div>
  );
}
