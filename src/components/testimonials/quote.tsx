import { cn } from "@/lib/utils";

interface QuoteProps {
  quote: string;
  name: string;
  title: string;
  parity: "white" | "blue";
  quoteClassName?: string;
}

export default function Quote({ quote, name, title, parity, quoteClassName }: QuoteProps) {
  return (
    <div>
      <p className={cn(`body-${parity} mb-4 text-left`, quoteClassName)}>
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
