'use client'

import { cn } from '@/lib/utils'
import type { ViewId } from '@/lib/data'
import { navItems, settingsNav } from '@/lib/nav'
import { MonoLabel } from '@/components/kit'
import { AnimatePresence, motion } from 'framer-motion'
import { BrainCircuit, Search, Menu, X } from 'lucide-react'

export function MobileTopBar({
  onOpenMenu,
  onOpenSearch,
  title,
}: {
  onOpenMenu: () => void
  onOpenSearch: () => void
  title: string
}) {
  return (
    <header className="glass-strong sticky top-0 z-30 flex h-14 items-center gap-3 rounded-none border-x-0 border-t-0 px-4 md:hidden">
      <div className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-cyan/25 to-violet/25 ring-1 ring-cyan/40">
        <BrainCircuit className="size-4 text-cyan" />
      </div>
      <div className="flex flex-1 flex-col leading-none">
        <span className="text-sm font-semibold">Knowledge OS</span>
        <MonoLabel className="mt-0.5 text-[0.55rem] text-cyan">{title}</MonoLabel>
      </div>
      <button
        onClick={onOpenSearch}
        className="grid size-9 place-items-center rounded-lg border border-border bg-secondary/30 text-muted-foreground"
        aria-label="Search"
      >
        <Search className="size-4" />
      </button>
      <button
        onClick={onOpenMenu}
        className="grid size-9 place-items-center rounded-lg border border-border bg-secondary/30 text-muted-foreground"
        aria-label="Open menu"
      >
        <Menu className="size-4" />
      </button>
    </header>
  )
}

export function MobileMenu({
  open,
  onClose,
  active,
  onNavigate,
}: {
  open: boolean
  onClose: () => void
  active: ViewId
  onNavigate: (id: ViewId) => void
}) {
  const items = [...navItems, settingsNav]
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 36 }}
            className="glass-strong absolute inset-y-0 left-0 flex w-[80%] max-w-xs flex-col rounded-none"
          >
            <div className="flex h-14 items-center justify-between px-4">
              <span className="text-sm font-semibold">Navigation</span>
              <button
                onClick={onClose}
                className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground"
                aria-label="Close menu"
              >
                <X className="size-4" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
              {items.map((item) => {
                const isActive = active === item.id
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id)
                      onClose()
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'border border-cyan/40 bg-cyan/10 text-foreground'
                        : 'text-muted-foreground hover:bg-secondary/40',
                    )}
                  >
                    <Icon
                      className={cn('size-[18px]', isActive && 'text-cyan')}
                    />
                    <span className="flex-1 text-left">{item.label}</span>
                    <span className="font-mono text-[0.6rem] text-muted-foreground/50">
                      {item.code}
                    </span>
                  </button>
                )
              })}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
