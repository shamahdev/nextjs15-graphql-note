import clsx from "clsx";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
