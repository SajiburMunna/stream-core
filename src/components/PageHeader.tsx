import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
  right?: React.ReactNode;
};

export function PageHeader({ title, subtitle, className, right }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div className="mt-2 md:mt-0">{right}</div> : null}
    </div>
  );
}
