'use client'

import { useMemo, useState } from 'react'
import { graphNodes, graphEdges, type GraphNode } from '@/lib/data'
import { Panel, MonoLabel, PageHeader, accent, type Accent } from '@/components/kit'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Network, X, FileText, Link2, Sparkles, Compass } from 'lucide-react'

const nodeColor: Record<string, string> = {
  cyan: 'var(--cyan)',
  violet: 'var(--violet)',
  emerald: '#34d399',
}

export function KnowledgeGraph() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<GraphNode | null>(null)

  const active = hovered ?? selected?.id ?? null

  const neighbors = useMemo(() => {
    if (!active) return new Set<string>()
    const set = new Set<string>()
    graphEdges.forEach(([a, b]) => {
      if (a === active) set.add(b)
      if (b === active) set.add(a)
    })
    return set
  }, [active])

  const nodeById = (id: string) => graphNodes.find((n) => n.id === id)!

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Knowledge Graph"
        title="Connection map"
        subtitle="Explore how your ideas link together. Hover to trace connections, click a node to dive in."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Graph canvas */}
        <Panel className="relative overflow-hidden p-0 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <Network className="size-4 text-cyan" />
              <MonoLabel className="text-foreground/80">
                {graphNodes.length} nodes · {graphEdges.length} edges
              </MonoLabel>
            </div>
            <MonoLabel className="hidden sm:block">interactive</MonoLabel>
          </div>

          <div className="relative aspect-square w-full sm:aspect-[4/3]">
            {/* Edges */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {graphEdges.map(([a, b], i) => {
                const na = nodeById(a)
                const nb = nodeById(b)
                const isActive =
                  active !== null && (a === active || b === active)
                return (
                  <line
                    key={i}
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke={
                      isActive ? 'var(--cyan)' : 'oklch(0.98 0.01 250 / 0.12)'
                    }
                    strokeWidth={isActive ? 0.5 : 0.25}
                    className="transition-all duration-300"
                    style={{
                      filter: isActive
                        ? 'drop-shadow(0 0 4px var(--cyan))'
                        : 'none',
                    }}
                    vectorEffect="non-scaling-stroke"
                  />
                )
              })}
            </svg>

            {/* Nodes */}
            {graphNodes.map((n) => {
              const isActive = active === n.id
              const isNeighbor = neighbors.has(n.id)
              const dim = active !== null && !isActive && !isNeighbor
              const color = nodeColor[n.accent]
              return (
                <button
                  key={n.id}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(n)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <motion.span
                    animate={{
                      scale: isActive ? 1.15 : dim ? 0.85 : 1,
                      opacity: dim ? 0.35 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative flex items-center justify-center rounded-full"
                    style={{
                      width: n.size,
                      height: n.size,
                      background: `radial-gradient(circle at 30% 30%, ${color}, transparent 75%)`,
                      boxShadow: isActive
                        ? `0 0 24px 2px ${color}`
                        : `0 0 12px -2px ${color}`,
                    }}
                  >
                    <span
                      className="rounded-full"
                      style={{
                        width: n.size * 0.45,
                        height: n.size * 0.45,
                        background: color,
                      }}
                    />
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: `1px solid ${color}`,
                          animation: 'pulse-ring 1.8s ease-out infinite',
                        }}
                      />
                    )}
                  </motion.span>
                  <span
                    className={cn(
                      'absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap font-mono text-[0.6rem] transition-colors',
                      isActive ? 'text-cyan' : 'text-muted-foreground',
                      dim && 'opacity-40',
                    )}
                  >
                    {n.label}
                  </span>
                </button>
              )
            })}
          </div>
        </Panel>

        {/* Detail / legend panel */}
        <div>
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
              >
                <Panel className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="size-4 rounded-full"
                        style={{
                          background: nodeColor[selected.accent],
                          boxShadow: `0 0 12px ${nodeColor[selected.accent]}`,
                        }}
                      />
                      <h2 className="text-lg font-semibold">{selected.label}</h2>
                    </div>
                    <button
                      onClick={() => setSelected(null)}
                      className="grid size-7 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border bg-secondary/30 p-3">
                      <div className="flex items-center gap-1.5 text-cyan">
                        <FileText className="size-3.5" />
                        <span className="text-lg font-semibold">
                          {selected.notes}
                        </span>
                      </div>
                      <MonoLabel className="text-[0.55rem]">notes</MonoLabel>
                    </div>
                    <div className="rounded-xl border border-border bg-secondary/30 p-3">
                      <div className="flex items-center gap-1.5 text-violet">
                        <Link2 className="size-3.5" />
                        <span className="text-lg font-semibold">
                          {neighbors.size}
                        </span>
                      </div>
                      <MonoLabel className="text-[0.55rem]">connections</MonoLabel>
                    </div>
                  </div>

                  <div className="mt-4">
                    <MonoLabel className="mb-2 block text-cyan">
                      ai explanation
                    </MonoLabel>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {selected.summary}
                    </p>
                  </div>

                  <div className="mt-4">
                    <MonoLabel className="mb-2 block">related topics</MonoLabel>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.related.map((r) => (
                        <span
                          key={r}
                          className="rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="mt-5 w-full">
                    <Sparkles className="text-cyan" />
                    Explore in assistant
                  </Button>
                </Panel>
              </motion.div>
            ) : (
              <motion.div
                key="legend"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Panel className="p-5">
                  <div className="flex items-center gap-2">
                    <Compass className="size-4 text-cyan" />
                    <MonoLabel className="text-foreground/80">
                      how to explore
                    </MonoLabel>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Hover any node to highlight its direct connections. Click a
                    node to open its notes, connection count and an AI-generated
                    explanation.
                  </p>
                  <div className="mt-5 space-y-3 border-t border-border pt-4">
                    {(
                      [
                        ['cyan', 'Core / language'],
                        ['violet', 'Concept / abstraction'],
                        ['emerald', 'Framework / tool'],
                      ] as [Accent, string][]
                    ).map(([a, label]) => {
                      const c = accent(a)
                      return (
                        <div key={a} className="flex items-center gap-3">
                          <span className={cn('size-3 rounded-full', c.dot)} />
                          <span className="text-sm text-muted-foreground">
                            {label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-5 rounded-xl border border-cyan/20 bg-cyan/5 p-3">
                    <MonoLabel className="text-cyan">tip</MonoLabel>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Your densest cluster is JavaScript → React → Hooks.
                    </p>
                  </div>
                </Panel>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
