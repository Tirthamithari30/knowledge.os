'use client'

import { cn } from '@/lib/utils'
import type { ViewId } from '@/lib/data'
import { notes, codeSnippets, knowledgeAreas } from '@/lib/data'
import { MonoLabel } from '@/components/kit'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search,
  FileText,
  Code2,
  Hash,
  Sparkles,
  Network,
  ListChecks,
  CalendarCheck,
  Library,
  LineChart,
  PlusCircle,
  CornerDownLeft,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

type Command = {
  id: string
  label: string
  hint: string
  icon: LucideIcon
  target: ViewId
}

const commands: Command[] = [
  { id: 'c-search', label: 'Search knowledge', hint: 'Find notes and topics', icon: Search, target: 'vault' },
  { id: 'c-create', label: 'Create note', hint: 'Add to your vault', icon: PlusCircle, target: 'vault' },
  { id: 'c-ai', label: 'Ask AI', hint: 'Query your second brain', icon: Sparkles, target: 'assistant' },
  { id: 'c-graph', label: 'Open graph', hint: 'Explore connections', icon: Network, target: 'graph' },
  { id: 'c-quiz', label: 'Generate quiz', hint: 'Test your recall', icon: ListChecks, target: 'quiz' },
  { id: 'c-review', label: "Review today's notes", hint: 'Spaced repetition', icon: CalendarCheck, target: 'review' },
  { id: 'c-code', label: 'Open code vault', hint: 'Saved snippets', icon: Code2, target: 'code' },
  { id: 'c-insights', label: 'View insights', hint: 'AI intelligence', icon: LineChart, target: 'insights' },
]

type Result =
  | { kind: 'command'; cmd: Command }
  | { kind: 'note'; id: string; title: string; sub: string }
  | { kind: 'code'; id: string; title: string; sub: string }
  | { kind: 'topic'; id: string; title: string; sub: string }

export function Spotlight({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean
  onClose: () => void
  onNavigate: (id: ViewId) => void
}) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      // focus after mount animation
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [open])

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return commands.map((cmd) => ({ kind: 'command', cmd }))
    }
    const out: Result[] = []
    commands
      .filter((c) => c.label.toLowerCase().includes(q))
      .forEach((cmd) => out.push({ kind: 'command', cmd }))

    notes
      .filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.tags.some((t) => t.includes(q)) ||
          n.category.toLowerCase().includes(q),
      )
      .slice(0, 6)
      .forEach((n) =>
        out.push({ kind: 'note', id: n.id, title: n.title, sub: n.category }),
      )

    codeSnippets
      .filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.language.toLowerCase().includes(q) ||
          c.tags.some((t) => t.includes(q)),
      )
      .slice(0, 4)
      .forEach((c) =>
        out.push({ kind: 'code', id: c.id, title: c.title, sub: c.language }),
      )

    knowledgeAreas
      .filter((a) => a.name.toLowerCase().includes(q))
      .slice(0, 3)
      .forEach((a) =>
        out.push({
          kind: 'topic',
          id: a.id,
          title: a.name,
          sub: `${a.notes} notes`,
        }),
      )
    return out
  }, [query])

  useEffect(() => {
    setIndex(0)
  }, [query])

  const runResult = (r: Result) => {
    if (r.kind === 'command') onNavigate(r.cmd.target)
    else if (r.kind === 'code') onNavigate('code')
    else if (r.kind === 'topic') onNavigate('vault')
    else onNavigate('vault')
    onClose()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const r = results[index]
      if (r) runResult(r)
    }
  }

  const iconFor = (r: Result): LucideIcon => {
    if (r.kind === 'command') return r.cmd.icon
    if (r.kind === 'note') return FileText
    if (r.kind === 'code') return Code2
    return Hash
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="glass-strong glow-cyan relative w-full max-w-2xl overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-5 text-cyan" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search notes, topics, code, tags — or run a command…"
                className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <kbd className="rounded-md border border-border bg-background/60 px-1.5 py-0.5 font-mono text-[0.6rem] text-muted-foreground">
                ESC
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {!query && (
                <MonoLabel className="px-3 py-2 text-[0.6rem]">
                  Command palette
                </MonoLabel>
              )}
              {query && (
                <MonoLabel className="px-3 py-2 text-[0.6rem]">
                  {results.length} result{results.length === 1 ? '' : 's'}
                </MonoLabel>
              )}

              {results.length === 0 && (
                <div className="px-3 py-10 text-center text-sm text-muted-foreground">
                  No matches for &ldquo;{query}&rdquo;
                </div>
              )}

              {results.map((r, i) => {
                const Icon = iconFor(r)
                const title = r.kind === 'command' ? r.cmd.label : r.title
                const sub = r.kind === 'command' ? r.cmd.hint : r.sub
                const tag =
                  r.kind === 'command'
                    ? 'Command'
                    : r.kind === 'note'
                      ? 'Note'
                      : r.kind === 'code'
                        ? 'Code'
                        : 'Topic'
                return (
                  <button
                    key={`${r.kind}-${i}`}
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => runResult(r)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                      i === index
                        ? 'bg-cyan/10 ring-1 ring-cyan/30'
                        : 'hover:bg-secondary/40',
                    )}
                  >
                    <span
                      className={cn(
                        'grid size-8 shrink-0 place-items-center rounded-lg',
                        i === index
                          ? 'bg-cyan/15 text-cyan'
                          : 'bg-secondary/50 text-muted-foreground',
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-medium">{title}</span>
                      <span className="block text-xs text-muted-foreground">
                        {sub}
                      </span>
                    </span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground/60">
                      {tag}
                    </span>
                    {i === index && (
                      <CornerDownLeft className="size-3.5 text-cyan" />
                    )}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[0.65rem] text-muted-foreground">
              <div className="flex items-center gap-3 font-mono">
                <span className="flex items-center gap-1">
                  <Library className="size-3" /> {notes.length} notes indexed
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <span>↑↓ navigate</span>
                <span>↵ open</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
