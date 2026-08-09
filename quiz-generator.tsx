'use client'

import type { ViewId } from '@/lib/data'
import { insights, knowledgeAreas } from '@/lib/data'
import { Panel, MonoLabel, PageHeader, SectionTitle, ProgressBar, accent } from '@/components/kit'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  AlertTriangle,
  GitMerge,
  Compass,
  ArrowUpRight,
  LineChart,
} from 'lucide-react'

const sections = [
  {
    key: 'learned' as const,
    title: 'What You Learned',
    icon: GraduationCap,
    accent: 'cyan' as const,
  },
  {
    key: 'gap' as const,
    title: 'Knowledge Gaps',
    icon: AlertTriangle,
    accent: 'rose' as const,
  },
  {
    key: 'connection' as const,
    title: 'New Connections',
    icon: GitMerge,
    accent: 'emerald' as const,
  },
  {
    key: 'next' as const,
    title: 'Recommended Next',
    icon: Compass,
    accent: 'violet' as const,
  },
]

export function Insights({ onNavigate }: { onNavigate: (id: ViewId) => void }) {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Insights"
        title="Knowledge intelligence"
        subtitle="Your second brain, analyzed. Where you're strong, where the gaps are, and what to learn next."
      />

      {/* Top metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Notes this month', value: '48', accent: 'cyan' as const },
          { label: 'Avg recall', value: '73%', accent: 'emerald' as const },
          { label: 'New connections', value: '28', accent: 'violet' as const },
          { label: 'Weak areas', value: '2', accent: 'rose' as const },
        ].map((m, i) => {
          const c = accent(m.accent)
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Panel className="p-5">
                <span className={cn('text-3xl font-semibold', c.text)}>
                  {m.value}
                </span>
                <MonoLabel className="mt-1 block">{m.label}</MonoLabel>
              </Panel>
            </motion.div>
          )
        })}
      </div>

      {/* Mastery by area */}
      <Panel className="p-6">
        <SectionTitle icon={LineChart} title="Mastery by area" />
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {knowledgeAreas.slice(0, 6).map((area) => (
            <div key={area.id} className="flex items-center gap-3">
              <span className="w-36 shrink-0 truncate text-sm text-muted-foreground">
                {area.name}
              </span>
              <div className="flex-1">
                <ProgressBar value={area.progress} accent={area.accent} />
              </div>
              <span
                className={cn(
                  'w-10 shrink-0 text-right font-mono text-xs',
                  accent(area.accent).text,
                )}
              >
                {area.progress}%
              </span>
            </div>
          ))}
        </div>
      </Panel>

      {/* Insight sections */}
      <div className="grid gap-4 lg:grid-cols-2">
        {sections.map((sec) => {
          const c = accent(sec.accent)
          const Icon = sec.icon
          const items = insights.filter((x) => x.type === sec.key)
          return (
            <Panel key={sec.key} className="p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <span className={cn('grid size-8 place-items-center rounded-lg', c.bg)}>
                  <Icon className={cn('size-4', c.text)} />
                </span>
                <MonoLabel className="text-foreground/80">{sec.title}</MonoLabel>
              </div>
              <div className="space-y-3">
                {items.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={cn(
                      'rounded-xl border border-border bg-secondary/25 p-4 transition-colors hover:bg-secondary/40',
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className={cn('size-1.5 rounded-full', c.dot)} />
                      <h4 className="text-sm font-medium">{item.title}</h4>
                    </div>
                    <p className="mt-1.5 pl-3.5 text-sm leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                    {sec.key === 'next' && (
                      <button
                        onClick={() => onNavigate('assistant')}
                        className="mt-2 ml-3.5 inline-flex items-center gap-1 text-xs text-violet hover:underline"
                      >
                        Start learning
                        <ArrowUpRight className="size-3" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </Panel>
          )
        })}
      </div>

      <Panel className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-medium">Ready for a deeper analysis?</h3>
          <p className="text-sm text-muted-foreground">
            Ask the assistant to build a personalized learning path from these insights.
          </p>
        </div>
        <Button onClick={() => onNavigate('assistant')}>
          Open AI Assistant
          <ArrowUpRight />
        </Button>
      </Panel>
    </div>
  )
}
