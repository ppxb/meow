import type { LucideIcon } from 'lucide-react'

type AppPageCard = {
  title: string
  description: string
  note: string
  icon: LucideIcon
}

type AppPageProps = {
  eyebrow: string
  title: string
  description: string
  highlights: string[]
  cards: AppPageCard[]
}

export function AppPage({
  eyebrow,
  title,
  description,
  highlights,
  cards
}: AppPageProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-24 py-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 px-6 py-8 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur xl:px-10 xl:py-10">
        <div className="absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_68%)]" />
        <div className="relative flex max-w-3xl flex-col gap-5">
          <span className="w-fit rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
            {eyebrow}
          </span>
          <div className="space-y-3">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600">{description}</p>
          </div>
          <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
            {highlights.map(highlight => (
              <div
                key={highlight}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4"
              >
                {highlight}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {cards.map(card => (
          <article
            key={card.title}
            className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_80px_-56px_rgba(15,23,42,0.5)] backdrop-blur"
          >
            <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.08),transparent_70%)]" />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/15">
                  <card.icon className="size-5" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                  {card.title}
                </h2>
              </div>
              <p className="text-sm leading-7 text-slate-600">{card.description}</p>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4 text-sm text-slate-700">
                {card.note}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
