'use client'

import { useState } from 'react'
import { Panel, MonoLabel, PageHeader, ProgressBar } from '@/components/kit'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import {
  CalendarCheck,
  CheckCircle2,
  Circle,
  Clock,
  Play,
  Sparkles,
  Brain,
  TrendingDown,
  Repeat,
} from 'lucide-react'

type ReviewItem = {
  id: string
  title: string
  category: string
  reason: string
  reasonIcon: typeof Brain
  lastReviewed: string
  strength: number
}

const items: ReviewItem[] = [
  {
    id: 'js-closures',
    title: 'JavaScript Closures',
    category: 'Programming',
    reason: 'Recall strength dropped below 60% — spaced repetition is due today.',
    reasonIcon: TrendingDown,
    lastReviewed: '6 days ago',
    strength: 54,
  },
  {
    id: 'rest-api',
    title: 'REST API Design',
    category: 'Web Development',
    reason: 'Frequently linked from new notes this week, worth reinforcing.',
    reasonIcon: Repeat,
    lastReviewed: '3 days ago',
    strength: 68,
  },
  {
    id: 'db-indexing',
    title: 'Database Indexing',
    category: 'Databases',
    reason: 'Foundational for your upcoming Vector Databases learning path.',
    reasonIcon: Brain,
    lastReviewed: '9 days ago',
    strength: 41,
  },
]

export function DailyReview() {
  const [learned, setLearned] = useState<Set<string>>(new Set())
  const [reviewing, setReviewing] = useState(false)

  const toggle = (id: string) =>
    setLearned((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const done = learned.size
  const progress = Math.round((done / items.length) * 100)

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Daily Review"
        title="Today's knowledge review"
        subtitle="Reinforce what's fading before you forget it. Spaced repetition, powered by your activity."
      >
        <Button
          size="lg"
          onClick={() => setReviewing((r) => !r)}
          className={cn(reviewing && 'bg-emerald-400')}
        >
          <Play />
          {reviewing ? 'Reviewing…' : 'Start review'}
        </Button>
      </PageHeader>

      {/* Progress */}
      <Panel className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative grid size-14 place-items-center rounded-2xl bg-cyan/10">
              <CalendarCheck className="size-6 text-cyan" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">{done}</span>
                <span className="text-muted-foreground">/ {items.length}</span>
                <MonoLabel>reviewed today</MonoLabel>
              </div>
              <p className="text-sm text-muted-foreground">
                {progress === 100
                  ? 'All caught up — your streak is safe.'
                  : `${items.length - done} more to keep your 17-day streak alive.`}
              </p>
            </div>
          </div>
          <div className="w-full sm:w-56">
            <div className="mb-1.5 flex items-center justify-between">
              <MonoLabel className="text-[0.6rem]">progress</MonoLabel>
              <span className="font-mono text-xs text-cyan">{progress}%</span>
            </div>
            <ProgressBar value={progress} accent="cyan" />
          </div>
        </div>
      </Panel>

      {/* Review items */}
      <div className="space-y-4">
        {items.map((item, i) => {
          const isLearned = learned.has(item.id)
          const ReasonIcon = item.reasonIcon
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Panel
                className={cn(
                  'p-5 transition-all',
                  isLearned && 'opacity-60',
                  reviewing && !isLearned && 'border-cyan/40 glow-cyan',
                )}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <MonoLabel className="text-cyan">{item.category}</MonoLabel>
                      <span className="flex items-center gap-1 font-mono text-[0.6rem] text-muted-foreground">
                        <Clock className="size-3" />
                        {item.lastReviewed}
                      </span>
                    </div>
                    <h3
                      className={cn(
                        'mt-1 text-lg font-medium',
                        isLearned && 'line-through',
                      )}
                    >
                      {item.title}
                    </h3>
                    <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                      <ReasonIcon className="mt-0.5 size-4 shrink-0 text-violet" />
                      <span>{item.reason}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <MonoLabel className="text-[0.6rem]">recall</MonoLabel>
                      <div className="w-32">
                        <ProgressBar
                          value={item.strength}
                          accent={item.strength < 50 ? 'rose' : 'amber'}
                        />
                      </div>
                      <span className="font-mono text-[0.65rem] text-muted-foreground">
                        {item.strength}%
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Sparkles className="text-cyan" />
                      Review
                    </Button>
                    <Button
                      variant={isLearned ? 'secondary' : 'default'}
                      size="sm"
                      onClick={() => toggle(item.id)}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {isLearned ? (
                          <motion.span
                            key="on"
                            initial={{ scale: 0.6 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="size-4 text-emerald-400" />
                            Learned
                          </motion.span>
                        ) : (
                          <motion.span
                            key="off"
                            initial={{ scale: 0.6 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1.5"
                          >
                            <Circle className="size-4" />
                            Mark learned
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </div>
                </div>
              </Panel>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
