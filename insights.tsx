'use client'

import { useMemo, useState } from 'react'
import { codeSnippets } from '@/lib/data'
import { Panel, MonoLabel, PageHeader } from '@/components/kit'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Copy, Check, Sparkles, Link2, Terminal } from 'lucide-react'

const languages = ['All', 'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'CSS']

const langAccent: Record<string, string> = {
  JavaScript: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  Python: 'text-cyan border-cyan/30 bg-cyan/10',
  React: 'text-cyan border-cyan/30 bg-cyan/10',
  'Node.js': 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  SQL: 'text-violet border-violet/30 bg-violet/10',
  CSS: 'text-rose-400 border-rose-400/30 bg-rose-400/10',
}

export function CodeVault() {
  const [active, setActive] = useState('All')
  const [copied, setCopied] = useState<string | null>(null)
  const [explained, setExplained] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      active === 'All'
        ? codeSnippets
        : codeSnippets.filter((c) => c.language === active),
    [active],
  )

  const copy = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      /* clipboard may be blocked in preview */
    }
    setCopied(id)
    setTimeout(() => setCopied((c) => (c === id ? null : c)), 1600)
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Code Vault"
        title="Your snippet library"
        subtitle="Reusable code, organized by language and connected to your notes."
      />

      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setActive(lang)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all',
              active === lang
                ? 'border-cyan/50 bg-cyan/15 text-cyan'
                : 'border-border bg-secondary/30 text-muted-foreground hover:text-foreground',
            )}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {filtered.map((s) => (
          <motion.div
            key={s.id}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Panel className="flex h-full flex-col overflow-hidden p-0">
              <div className="flex items-start justify-between gap-3 border-b border-border p-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Terminal className="size-4 text-cyan" />
                    <h3 className="truncate font-medium">{s.title}</h3>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {s.description}
                  </p>
                </div>
                <span
                  className={cn(
                    'shrink-0 rounded-md border px-2 py-0.5 font-mono text-[0.6rem]',
                    langAccent[s.language] ?? 'border-border text-muted-foreground',
                  )}
                >
                  {s.language}
                </span>
              </div>

              {/* Code block */}
              <div className="relative">
                <div className="flex items-center gap-1.5 border-b border-border/60 bg-background/40 px-4 py-2">
                  <span className="size-2.5 rounded-full bg-rose-400/60" />
                  <span className="size-2.5 rounded-full bg-amber-400/60" />
                  <span className="size-2.5 rounded-full bg-emerald-400/60" />
                </div>
                <pre className="overflow-x-auto bg-background/40 p-4 font-mono text-[0.78rem] leading-relaxed text-foreground/90">
                  <code>{s.code}</code>
                </pre>
              </div>

              <div className="flex flex-wrap gap-1.5 px-4 pt-3">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.65rem] text-muted-foreground/70"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <AnimatePresence>
                {explained === s.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden px-4 pt-3"
                  >
                    <div className="rounded-xl border border-violet/30 bg-violet/10 p-3">
                      <MonoLabel className="text-violet">ai explanation</MonoLabel>
                      <p className="mt-1.5 text-xs leading-relaxed text-foreground/90">
                        This {s.language} snippet, &ldquo;{s.title}&rdquo;,{' '}
                        {s.description.toLowerCase().replace(/\.$/, '')}. It links
                        to your notes on the same topic and is safe to reuse across
                        projects.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="mt-auto flex items-center gap-2 p-4">
                <button
                  onClick={() => copy(s.id, s.code)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground transition-colors hover:border-cyan/40 hover:text-cyan"
                >
                  {copied === s.id ? (
                    <>
                      <Check className="size-3.5 text-emerald-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      Copy
                    </>
                  )}
                </button>
                <button
                  onClick={() =>
                    setExplained((e) => (e === s.id ? null : s.id))
                  }
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-wider transition-colors',
                    explained === s.id
                      ? 'border-violet/50 bg-violet/10 text-violet'
                      : 'border-border bg-secondary/40 text-muted-foreground hover:border-violet/40 hover:text-violet',
                  )}
                >
                  <Sparkles className="size-3.5" />
                  AI Explain
                </button>
                <button className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/40 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground transition-colors hover:border-cyan/40 hover:text-cyan">
                  <Link2 className="size-3.5" />
                  Related
                </button>
              </div>
            </Panel>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
