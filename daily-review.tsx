'use client'

import { useEffect, useRef, useState } from 'react'
import { mockAiResponse, suggestedQuestions } from '@/lib/data'
import { Panel, MonoLabel } from '@/components/kit'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, Send, Mic, BrainCircuit, User, Square } from 'lucide-react'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const initialMessages: Message[] = [
  {
    id: 'm0',
    role: 'assistant',
    content:
      "I'm your Knowledge AI. I can search across your 247 notes and 412 connections, explain concepts using your own material, surface links between topics, and generate quizzes. What would you like to explore?",
  },
]

export function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [listening, setListening] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, typing])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || typing) return
    const userMsg: Message = { id: `u${Date.now()}`, role: 'user', content: trimmed }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTyping(true)
    // Mock latency — swap this block for a real API call later.
    setTimeout(() => {
      const reply: Message = {
        id: `a${Date.now()}`,
        role: 'assistant',
        content: mockAiResponse(trimmed),
      }
      setMessages((m) => [...m, reply])
      setTyping(false)
    }, 1100)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing || e.keyCode === 229) return
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <div className="flex h-[calc(100svh-8rem)] flex-col gap-5 md:h-[calc(100svh-7rem)]">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="relative grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan/25 to-violet/25 ring-1 ring-cyan/40">
          <BrainCircuit className="size-6 text-cyan" />
          <span className="absolute inset-0 animate-ping rounded-2xl ring-1 ring-cyan/30 [animation-duration:3s]" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Knowledge AI</h1>
          <p className="text-sm text-muted-foreground">
            Ask anything about your knowledge.
          </p>
        </div>
        <span className="ml-auto hidden items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 sm:flex">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
          <MonoLabel className="text-emerald-400">connected</MonoLabel>
        </span>
      </div>

      {/* Chat */}
      <Panel className="flex min-h-0 flex-1 flex-col overflow-hidden p-0">
        <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto p-5 md:p-6">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                'flex gap-3',
                m.role === 'user' ? 'flex-row-reverse' : 'flex-row',
              )}
            >
              <div
                className={cn(
                  'grid size-8 shrink-0 place-items-center rounded-lg',
                  m.role === 'user'
                    ? 'bg-violet/15 text-violet'
                    : 'bg-cyan/15 text-cyan',
                )}
              >
                {m.role === 'user' ? (
                  <User className="size-4" />
                ) : (
                  <Sparkles className="size-4" />
                )}
              </div>
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                  m.role === 'user'
                    ? 'rounded-tr-sm bg-violet/15 text-foreground'
                    : 'rounded-tl-sm border border-border bg-secondary/40 text-foreground/90',
                )}
              >
                {m.content}
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {typing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-cyan/15 text-cyan">
                  <Sparkles className="size-4" />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border bg-secondary/40 px-4 py-4">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="size-1.5 rounded-full bg-cyan"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Suggested questions */}
        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-2 border-t border-border px-5 py-3">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-border bg-secondary/30 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-cyan/40 hover:text-cyan"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="glass flex items-end gap-2 rounded-2xl p-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              placeholder="Ask about your notes, connections or next steps…"
              className="max-h-32 flex-1 resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={() => setListening((l) => !l)}
              className={cn(
                'grid size-10 shrink-0 place-items-center rounded-xl border transition-colors',
                listening
                  ? 'border-violet/50 bg-violet/15 text-violet'
                  : 'border-border bg-secondary/40 text-muted-foreground hover:text-foreground',
              )}
              aria-label="Voice input"
            >
              {listening ? (
                <Square className="size-4 fill-current" />
              ) : (
                <Mic className="size-4" />
              )}
            </button>
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || typing}
              className="grid size-10 shrink-0 place-items-center rounded-xl bg-cyan text-primary-foreground transition-all hover:brightness-110 disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="size-4" />
            </button>
          </div>
          <p className="mt-2 px-2 font-mono text-[0.6rem] text-muted-foreground/60">
            mock responses · ready to connect a real AI API
          </p>
        </div>
      </Panel>
    </div>
  )
}
