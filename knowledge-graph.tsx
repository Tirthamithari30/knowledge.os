'use client'

import type { ViewId } from '@/lib/data'
import { notes, knowledgeAreas, activity } from '@/lib/data'
import { Panel, MonoLabel, SectionTitle, PageHeader, ProgressBar, accent } from '@/components/kit'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  FileText,
  FolderTree,
  GitBranch,
  Flame,
  ArrowUpRight,
  Sparkles,
  Clock,
  Plus,
  Link2,
} from 'lucide-react'

const stats = [
  { label: 'Total Notes', value: '247', icon: FileText, accent: 'cyan' as const, delta: '+12 this week' },
  { label: 'Topics', value: '38', icon: FolderTree, accent: 'violet' as const, delta: '+3 new' },
  { label: 'Connections', value: '412', icon: GitBranch, accent: 'emerald' as const, delta: '+28 formed' },
  { label: 'Learning Streak', value: '17', icon: Flame, accent: 'amber' as const, delta: 'days' },
]

function heatColor(count: number) {
  if (count === 0) return 'bg-secondary/40'
  if (count <= 1) return 'bg-cyan/20'
  if (count <= 2) return 'bg-cyan/35'
  if (count <= 4) return 'bg-cyan/60'
  return 'bg-cyan'
}

export function CommandCenter({
  onNavigate,
  onOpenSearch,
}: {
  onNavigate: (id: ViewId) => void
  onOpenSearch: () => void
}) {
  const recent = notes.slice(0, 3)
  const added = [...notes].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Command Center"
        title="Knowledge OS"
        subtitle="Your knowledge. Connected. Searchable. Intelligent."
      >
        <Button variant="outline" size="lg" onClick={onOpenSearch}>
          <Sparkles className="text-cyan" />
          Quick search
        </Button>
        <Button size="lg" onClick={() => onNavigate('vault')}>
          <Plus />
          New note
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => {
          const c = accent(s.accent)
          const Icon = s.icon
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Panel interactive className="p-5">
                <div className="flex items-start justify-between">
                  <div className={cn('grid size-10 place-items-center rounded-xl', c.bg)}>
                    <Icon className={cn('size-5', c.text)} />
                  </div>
                  <MonoLabel className="text-[0.6rem]">{s.delta}</MonoLabel>
                </div>
                <div className="mt-4 flex items-end gap-2">
                  <span className={cn('text-4xl font-semibold tracking-tight', c.text)}>
                    {s.value}
                  </span>
                </div>
                <MonoLabel className="mt-1 block">{s.label}</MonoLabel>
              </Panel>
            </motion.div>
          )
        })}
      </div>

      {/* Knowledge Pulse + AI insight */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="p-6 lg:col-span-2">
          <SectionTitle
            icon={Flame}
            title="Knowledge Pulse"
            action={<MonoLabel>last 12 weeks</MonoLabel>}
          />
          <div className="flex flex-wrap gap-1.5">
            {activity.map((d, i) => (
              <motion.span
                key={d.date}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.004 }}
                title={`${d.count} contributions`}
                className={cn('size-3.5 rounded-[4px]', heatColor(d.count))}
              />
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-2xl font-semibold text-cyan">312</span>
                <MonoLabel className="ml-2">notes touched</MonoLabel>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MonoLabel>less</MonoLabel>
              {[0, 1, 2, 4, 6].map((n) => (
                <span key={n} className={cn('size-3 rounded-[3px]', heatColor(n))} />
              ))}
              <MonoLabel>more</MonoLabel>
            </div>
          </div>
        </Panel>

        <Panel className="relative overflow-hidden p-6">
          <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-violet/20 blur-2xl" />
          <SectionTitle icon={Sparkles} title="AI Insight" />
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet/40 bg-violet/10 px-3 py-1">
            <span className="size-1.5 animate-pulse rounded-full bg-violet" />
            <MonoLabel className="text-violet">recommendation</MonoLabel>
          </div>
          <p className="text-pretty text-sm leading-relaxed text-foreground/90">
            You have studied{' '}
            <span className="font-medium text-cyan">React Hooks</span> and{' '}
            <span className="font-medium text-cyan">Next.js</span> recently. A
            useful next topic is{' '}
            <span className="font-medium text-violet">state management</span> — it
            bridges 22 of your existing notes.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-5"
            onClick={() => onNavigate('assistant')}
          >
            Ask the assistant
            <ArrowUpRight />
          </Button>
        </Panel>
      </div>

      {/* Continue learning + recently added */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionTitle
            icon={Clock}
            title="Continue Learning"
            action={
              <button
                onClick={() => onNavigate('vault')}
                className="text-xs text-cyan hover:underline"
              >
                View all
              </button>
            }
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {recent.map((n, i) => (
              <motion.button
                key={n.id}
                onClick={() => onNavigate('vault')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group text-left"
              >
                <Panel interactive className="flex h-full flex-col p-4">
                  <div className="mb-3 h-1 w-8 rounded-full bg-gradient-to-r from-cyan to-violet" />
                  <h3 className="text-pretty font-medium leading-snug group-hover:text-cyan">
                    {n.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {n.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <MonoLabel>{n.category}</MonoLabel>
                    <span className="flex items-center gap-1 font-mono text-[0.65rem] text-muted-foreground">
                      <Link2 className="size-3" />
                      {n.connections}
                    </span>
                  </div>
                </Panel>
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <SectionTitle icon={FileText} title="Recently Added" />
          <Panel className="divide-y divide-border p-2">
            {added.map((n) => (
              <button
                key={n.id}
                onClick={() => onNavigate('vault')}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-secondary/40"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-cyan/10 text-cyan">
                  <FileText className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {n.title}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {n.category}
                  </span>
                </span>
                <span className="font-mono text-[0.6rem] text-muted-foreground/60">
                  {n.date.slice(5)}
                </span>
              </button>
            ))}
          </Panel>
        </div>
      </div>

      {/* Knowledge areas */}
      <div>
        <SectionTitle icon={FolderTree} title="Knowledge Areas" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {knowledgeAreas.map((area, i) => {
            const c = accent(area.accent)
            const Icon = area.icon
            return (
              <motion.button
                key={area.id}
                onClick={() => onNavigate('vault')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-left"
              >
                <Panel interactive className="p-5">
                  <div className="flex items-center gap-3">
                    <div className={cn('grid size-10 place-items-center rounded-xl', c.bg)}>
                      <Icon className={cn('size-5', c.text)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium">{area.name}</h3>
                      <MonoLabel className="text-[0.6rem]">{area.notes} notes</MonoLabel>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <MonoLabel className="text-[0.6rem]">mastery</MonoLabel>
                      <span className={cn('font-mono text-[0.65rem]', c.text)}>
                        {area.progress}%
                      </span>
                    </div>
                    <ProgressBar value={area.progress} accent={area.accent} />
                  </div>
                </Panel>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
