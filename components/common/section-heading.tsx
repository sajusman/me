export function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="scroll-mt-20 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
    >
      {children}
    </h2>
  );
}
