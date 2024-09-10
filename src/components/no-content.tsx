interface props {
  title: string
  description?: string
  children?: React.ReactNode;
}

export default function NoContent({ title, description, children }: props) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm  p-4 md:p-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          {title}
        </h3>
        {description &&
          <p className="text-sm text-muted-foreground">
            {description}
          </p>}
        {children}
      </div>
    </div>
  );
}

