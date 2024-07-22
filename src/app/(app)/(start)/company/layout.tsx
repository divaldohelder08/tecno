import { PropsWithChildren } from "react"
export default function Company({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 md:gap-8 md:p-6">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
          <div className="grid gap-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
