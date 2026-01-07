import { cn } from "@/lib/utils";

interface HeaderImageProps {
  imageSrc: string;
  headerText: string;
  children?: React.ReactNode;
  className?: string;
}

export function HeaderImage({ imageSrc, headerText, children, className }: HeaderImageProps) {
  return (
    <section
      className={cn(
        "relative mt-16 h-[calc(100svh-4rem)] bg-cover bg-center flex flex-col items-center justify-center gap-6",
        className
      )}
      style={{ backgroundImage: `url('${imageSrc}')` }}>
      <h1 className="text-white text-5xl font-extrabold bg-black/50 px-4 py-2 w-full sm:w-max sm:rounded text-center">
        {headerText}
      </h1>
      {children}
    </section>
  );
}
