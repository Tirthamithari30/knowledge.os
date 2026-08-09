'use client'

import { cn } from '@/lib/utils'
import type { ViewId } from '@/lib/data'
import { navItems, settingsNav } from '@/lib/nav'
import { MonoLabel } from '@/components/kit'
import { motion } from 'framer-motion'
import { BrainCircuit, PanelLeftClose, PanelLeft, Search } from 'lucide-react'

export function Sidebar({
  active,
  onNavigate,
  collapsed,
  onToggle,
  onOpenSearch,
}: {
  active: ViewId
  onNavigate: (id: ViewId) => void
  collapsed: boolean
  onToggle: () => void
  onOpenSearch: () => void
}) {
  return (
    <aside
      className={cn(
        'glass-strong relative z-20 hidden shrink-0 flex-col rounded-none border-y-0 border-l-0 transition-[width] duration-300 ease-out md:flex',
        collapsed ? 'w-[76px]' : 'w-[260px]',
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-4">
        <div className="relative grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan/25 to-violet/25 ring-1 ring-cyan/40">
          <BrainCircuit className="size-5 text-cyan" />
          <span className="absolute inset-0 rounded-xl ring-1 ring-cyan/20" />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight">
              Knowledge OS
            </span>
            <MonoLabel className="mt-1 text-[0.6rem] text-cyan">
              v2.4 · online
            </MonoLabel>
          </div>
        )}
      </div>

      {/* Search trigger */}
      <div className="px-3 pb-2">
        <button
          onClick={onOpenSearch}
          className={cn(
            'group flex w-full items-center gap-2.5 rounded-xl border border-border bg-secondary/30 px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:border-cyan/40 hover:text-foreground',
            collapsed && 'justify-center px-0',
          )}
        >
          <Search className="size-4 shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1">Search…</span>
              <kbd className="rounded-md border border-border bg-background/60 px-1.5 py-0.5 font-mono text-[0.6rem]">
                ⌘K
              </kbd>
            </>
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {!collapsed && (
          <MonoLabel className="px-2 pb-1 text-[0.6rem]">Workspace</MonoLabel>
        )}
        {navItems.map((item) => {
          const isActive = active === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                collapsed && 'justify-center px-0',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground',
              )}
              title={collapsed ? item.label : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl border border-cyan/40 bg-cyan/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <Icon
                className={cn(
                  'relative size-[18px] shrink-0 transition-colors',
                  isActive ? 'text-cyan' : 'group-hover:text-foreground',
                )}
              />
              {!collapsed && <span className="relative flex-1 text-left">{item.label}</span>}
              {!collapsed && (
                <span
                  className={cn(
                    'relative font-mono text-[0.6rem] tracking-wider',
                    isActive ? 'text-cyan/80' : 'text-muted-foreground/50',
                  )}
                >
                  {item.code}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer: settings + collapse */}
      <div className="space-y-1 border-t border-border px-3 py-3">
        <button
          onClick={() => onNavigate(settingsNav.id)}
          className={cn(
            'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
            collapsed && 'justify-center px-0',
            active === 'settings'
              ? 'border border-cyan/40 bg-cyan/10 text-foreground'
              : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground',
          )}
          title={collapsed ? 'Settings' : undefined}
        >
          <settingsNav.icon className="size-[18px] shrink-0" />
          {!collapsed && <span className="flex-1 text-left">Settings</span>}
        </button>
        <button
          onClick={onToggle}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/40 hover:text-foreground',
            collapsed && 'justify-center px-0',
          )}
        >
          {collapsed ? (
            <PanelLeft className="size-[18px] shrink-0" />
          ) : (
            <>
              <PanelLeftClose className="size-[18px] shrink-0" />
              <span className="flex-1 text-left">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
