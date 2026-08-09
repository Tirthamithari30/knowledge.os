import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Library,
  Sparkles,
  Network,
  CalendarCheck,
  ListChecks,
  Code2,
  LineChart,
  Settings,
} from 'lucide-react'
import type { ViewId } from './data'

export type NavItem = {
  id: ViewId
  label: string
  icon: LucideIcon
  code: string
}

export const navItems: NavItem[] = [
  { id: 'command', label: 'Command Center', icon: LayoutDashboard, code: 'CMD' },
  { id: 'vault', label: 'Knowledge', icon: Library, code: 'VLT' },
  { id: 'assistant', label: 'AI Assistant', icon: Sparkles, code: 'AI' },
  { id: 'graph', label: 'Knowledge Graph', icon: Network, code: 'GRF' },
  { id: 'review', label: 'Daily Review', icon: CalendarCheck, code: 'REV' },
  { id: 'quiz', label: 'Quizzes', icon: ListChecks, code: 'QZ' },
  { id: 'code', label: 'Code Vault', icon: Code2, code: 'COD' },
  { id: 'insights', label: 'Insights', icon: LineChart, code: 'INS' },
]

export const settingsNav: NavItem = {
  id: 'settings',
  label: 'Settings',
  icon: Settings,
  code: 'SET',
}
