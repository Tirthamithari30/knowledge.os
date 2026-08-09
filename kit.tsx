'use client'

import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ViewId } from '@/lib/data'
import { navItems, settingsNav } from '@/lib/nav'
import { Sidebar } from '@/components/sidebar'
import { MobileTopBar, MobileMenu } from '@/components/mobile-nav'
import { Spotlight } from '@/components/spotlight'
import { CommandCenter } from '@/components/views/command-center'
import { KnowledgeVault } from '@/components/views/knowledge-vault'
import { AiAssistant } from '@/components/views/ai-assistant'
import { KnowledgeGraph } from '@/components/views/knowledge-graph'
import { DailyReview } from '@/components/views/daily-review'
import { QuizGenerator } from '@/components/views/quiz-generator'
import { CodeVault } from '@/components/views/code-vault'
import { Insights } from '@/components/views/insights'
import { SettingsView } from '@/components/views/settings'

const allNav = [...navItems, settingsNav]

export function AppShell() {
  const [view, setView] = useState<ViewId>('command')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [spotlight, setSpotlight] = useState(false)

  const navigate = useCallback((id: ViewId) => {
    setView(id)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 })
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSpotlight((s) => !s)
      }
      if (e.key === 'Escape') setSpotlight(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const activeLabel =
    allNav.find((n) => n.id === view)?.label ?? 'Command Center'

  const renderView = () => {
    switch (view) {
      case 'command':
        return <CommandCenter onNavigate={navigate} onOpenSearch={() => setSpotlight(true)} />
      case 'vault':
        return <KnowledgeVault />
      case 'assistant':
        return <AiAssistant />
      case 'graph':
        return <KnowledgeGraph />
      case 'review':
        return <DailyReview />
      case 'quiz':
        return <QuizGenerator />
      case 'code':
        return <CodeVault />
      case 'insights':
        return <Insights onNavigate={navigate} />
      case 'settings':
        return <SettingsView />
      default:
        return null
    }
  }

  return (
    <div className="relative flex min-h-svh">
      <div className="app-backdrop" aria-hidden />

      <Sidebar
        active={view}
        onNavigate={navigate}
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        onOpenSearch={() => setSpotlight(true)}
      />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <MobileTopBar
          onOpenMenu={() => setMobileMenu(true)}
          onOpenSearch={() => setSpotlight(true)}
          title={activeLabel}
        />

        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 md:px-8 md:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <MobileMenu
        open={mobileMenu}
        onClose={() => setMobileMenu(false)}
        active={view}
        onNavigate={navigate}
      />

      <Spotlight
        open={spotlight}
        onClose={() => setSpotlight(false)}
        onNavigate={navigate}
      />
    </div>
  )
}
