'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

const accentMap = {
  cyan: {
    text: 'text-cyan',
    bg: 'bg-cyan/10',
    ring: 'ring-cyan/30',
    dot: 'bg-cyan',
    glow: 'shadow-[0_0_24px_-6px_var(--cyan)]',
    from: 'from-cyan/20',
  },
  violet: {
    text: 'text-violet',
    bg: 'bg-violet/10',
    ring: 'ring-violet/30',
    dot: 'bg-violet',
    glow: 'shadow-[0_0_24px_-6px_var(--violet)]',
    from: 'from-violet/20',
  },
  emerald: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    ring: 'ring-emerald-400/30',
    dot: 'bg-emerald-400',
    glow: 'shadow-[0_0_24px_-6px_#34d399]',
    from: 'from-emerald-400/20',
  },
  amber: {
    text: 'text-amber-400',
    bg: 'bg-amber-400/10',
    ring: 'ring-amber-400/30',
    dot: 'bg-amber-400',
    glow: 'shadow-[0_0_24px_-6px_#fbbf24]',
    from: 'from-amber-400/20',
  },
  rose: {
    text: 'text-rose-400',
    bg: 'bg-rose-400/10',
    ring: 'ring-rose-400/30',
    dot: 'bg-rose-400',
    glow: 'shadow-[0_0_24px_-6px_#fb7185]',
    from: 'from-rose-400/20',
  },
} as const

export type Accent = keyof typeof accentMap
export function accent(a: Accent) {
  return accentMap[a]
}

export function Panel({
  className,
  children,
  interactive,
  ...props
}: {
  className?: string
  children: ReactNode
  interactive?: boolean
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'glass rounded-2xl',
        interactive &&
          'transition-all duration-300 hover:border-cyan/40 hover:shadow-[0_0_40px_-16px_var(--cyan)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function MonoLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span className={cn('mono-label text-muted-foreground', className)}>
      {children}
    </span>
  )
}

export function SectionTitle({
  icon: Icon,
  title,
  action,
}: {
  icon?: LucideIcon
  title: string
  action?: ReactNode
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        {Icon ? <Icon className="size-4 text-cyan" /> : null}
        <MonoLabel className="text-foreground/80">{title}</MonoLabel>
      </div>
      {action}
    </div>
  )
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  children?: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
    >
      <div className="space-y-2">
        {eyebrow ? <MonoLabel className="text-cyan">{eyebrow}</MonoLabel> : null}
        <h1 className="text-pretty text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="max-w-xl text-pretty text-sm text-muted-foreground md:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children ? <div className="flex items-center gap-2">{children}</div> : null}
    </motion.div>
  )
}

export function Chip({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-border bg-secondary/40 px-2.5 py-0.5 font-mono text-[0.68rem] text-muted-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function ProgressBar({
  value,
  accent: a = 'cyan',
}: {
  value: number
  accent?: Accent
}) {
  const c = accentMap[a]
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn('h-full rounded-full', c.dot)}
      />
    </div>
  )
}
