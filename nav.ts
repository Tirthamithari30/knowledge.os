import type { LucideIcon } from 'lucide-react'
import {
  Code2,
  Brain,
  Globe,
  ShieldCheck,
  Database,
  GraduationCap,
  Lightbulb,
  Boxes,
} from 'lucide-react'

export type ViewId =
  | 'command'
  | 'vault'
  | 'assistant'
  | 'graph'
  | 'review'
  | 'quiz'
  | 'code'
  | 'insights'
  | 'settings'

export type KnowledgeArea = {
  id: string
  name: string
  icon: LucideIcon
  notes: number
  progress: number
  accent: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose'
}

export const knowledgeAreas: KnowledgeArea[] = [
  { id: 'programming', name: 'Programming', icon: Code2, notes: 64, progress: 82, accent: 'cyan' },
  { id: 'ai', name: 'Artificial Intelligence', icon: Brain, notes: 48, progress: 71, accent: 'violet' },
  { id: 'web', name: 'Web Development', icon: Globe, notes: 52, progress: 88, accent: 'emerald' },
  { id: 'security', name: 'Cybersecurity', icon: ShieldCheck, notes: 29, progress: 44, accent: 'rose' },
  { id: 'databases', name: 'Databases', icon: Database, notes: 33, progress: 63, accent: 'amber' },
  { id: 'college', name: 'College', icon: GraduationCap, notes: 14, progress: 51, accent: 'cyan' },
  { id: 'ideas', name: 'Ideas', icon: Lightbulb, notes: 21, progress: 33, accent: 'violet' },
  { id: 'concepts', name: 'Concepts', icon: Boxes, notes: 38, progress: 76, accent: 'emerald' },
]

export type Note = {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  date: string
  connections: number
  readingMinutes: number
}

export const notes: Note[] = [
  {
    id: 'js-closures',
    title: 'JavaScript Closures',
    description:
      'A closure gives a function access to its outer scope even after that scope has returned. Foundation for currying, memoization and private state.',
    category: 'Programming',
    tags: ['javascript', 'functions', 'scope'],
    date: '2026-08-06',
    connections: 14,
    readingMinutes: 6,
  },
  {
    id: 'react-hooks',
    title: 'React Hooks',
    description:
      'useState, useEffect, useMemo and custom hooks let function components own state and side-effects. Rules of hooks keep call order stable.',
    category: 'Web Development',
    tags: ['react', 'hooks', 'frontend'],
    date: '2026-08-07',
    connections: 22,
    readingMinutes: 9,
  },
  {
    id: 'rest-api',
    title: 'REST API Design',
    description:
      'Resource-oriented endpoints, correct HTTP verbs, statelessness and consistent status codes. Versioning and pagination for scale.',
    category: 'Web Development',
    tags: ['api', 'http', 'backend'],
    date: '2026-08-05',
    connections: 17,
    readingMinutes: 8,
  },
  {
    id: 'db-indexing',
    title: 'Database Indexing',
    description:
      'B-tree and hash indexes speed up reads at the cost of writes. Understand selectivity, composite indexes and covering indexes.',
    category: 'Databases',
    tags: ['sql', 'performance', 'index'],
    date: '2026-08-04',
    connections: 11,
    readingMinutes: 7,
  },
  {
    id: 'ml-basics',
    title: 'Machine Learning Basics',
    description:
      'Supervised vs unsupervised learning, loss functions, gradient descent and the bias-variance tradeoff that governs generalization.',
    category: 'AI',
    tags: ['ml', 'ai', 'math'],
    date: '2026-08-03',
    connections: 19,
    readingMinutes: 12,
  },
  {
    id: 'prompt-eng',
    title: 'Prompt Engineering',
    description:
      'Structuring context, few-shot examples, role framing and output constraints to steer large language models reliably.',
    category: 'AI',
    tags: ['llm', 'ai', 'prompts'],
    date: '2026-08-07',
    connections: 15,
    readingMinutes: 5,
  },
  {
    id: 'nextjs-routing',
    title: 'Next.js App Router',
    description:
      'Server components, nested layouts, streaming and the file-based routing model that powers modern Next.js applications.',
    category: 'Web Development',
    tags: ['nextjs', 'react', 'ssr'],
    date: '2026-08-02',
    connections: 20,
    readingMinutes: 10,
  },
  {
    id: 'node-event-loop',
    title: 'Node.js Event Loop',
    description:
      'Phases of the libuv event loop, the microtask queue and how async I/O stays non-blocking under a single thread.',
    category: 'Programming',
    tags: ['nodejs', 'async', 'runtime'],
    date: '2026-08-01',
    connections: 13,
    readingMinutes: 9,
  },
  {
    id: 'jwt-auth',
    title: 'JWT Authentication',
    description:
      'Signed stateless tokens, access vs refresh token rotation and common pitfalls like storing tokens in localStorage.',
    category: 'Cybersecurity',
    tags: ['auth', 'security', 'tokens'],
    date: '2026-07-31',
    connections: 9,
    readingMinutes: 7,
  },
  {
    id: 'sql-joins',
    title: 'SQL Joins Deep Dive',
    description:
      'Inner, left, right and full joins visualized, plus how the query planner chooses hash vs merge join strategies.',
    category: 'Databases',
    tags: ['sql', 'joins', 'query'],
    date: '2026-07-30',
    connections: 12,
    readingMinutes: 8,
  },
  {
    id: 'transformers',
    title: 'Transformer Architecture',
    description:
      'Self-attention, positional encoding and multi-head attention — the backbone behind modern language and vision models.',
    category: 'AI',
    tags: ['ai', 'nlp', 'deep-learning'],
    date: '2026-08-06',
    connections: 24,
    readingMinutes: 14,
  },
  {
    id: 'css-grid',
    title: 'CSS Grid Layout',
    description:
      'Two-dimensional layouts with template areas, fractional units and auto-placement for responsive interfaces.',
    category: 'Web Development',
    tags: ['css', 'layout', 'frontend'],
    date: '2026-07-29',
    connections: 8,
    readingMinutes: 6,
  },
]

export type ActivityDay = { date: string; count: number }

// 12 weeks x 7 days heatmap
export const activity: ActivityDay[] = Array.from({ length: 84 }, (_, i) => {
  const seed = (i * 928371 + 13) % 97
  const count = seed % 11 === 0 ? 0 : (seed % 5) + (i % 7 === 0 ? 1 : 0)
  return { date: `d${i}`, count: Math.min(count, 6) }
})

export type GraphNode = {
  id: string
  label: string
  x: number
  y: number
  size: number
  accent: 'cyan' | 'violet' | 'emerald'
  notes: number
  summary: string
  related: string[]
}

export const graphNodes: GraphNode[] = [
  { id: 'javascript', label: 'JavaScript', x: 50, y: 50, size: 30, accent: 'cyan', notes: 18, summary: 'Core language of the web. Prototypal inheritance, closures and the event loop.', related: ['Closures', 'Async/Await', 'Node.js'] },
  { id: 'react', label: 'React', x: 27, y: 30, size: 26, accent: 'cyan', notes: 22, summary: 'Declarative UI library built on components and a virtual DOM diffing model.', related: ['Hooks', 'Next.js', 'State Management'] },
  { id: 'hooks', label: 'Hooks', x: 15, y: 55, size: 20, accent: 'violet', notes: 12, summary: 'Functions that let components tap into state and lifecycle features.', related: ['React', 'useEffect', 'Custom Hooks'] },
  { id: 'nextjs', label: 'Next.js', x: 40, y: 14, size: 22, accent: 'emerald', notes: 20, summary: 'React framework with server components, routing and streaming.', related: ['React', 'SSR', 'APIs'] },
  { id: 'node', label: 'Node.js', x: 72, y: 30, size: 24, accent: 'emerald', notes: 13, summary: 'JavaScript runtime for servers with a non-blocking event loop.', related: ['JavaScript', 'APIs', 'Event Loop'] },
  { id: 'apis', label: 'APIs', x: 74, y: 62, size: 22, accent: 'violet', notes: 17, summary: 'Contracts for data exchange. REST, GraphQL and RPC styles.', related: ['Node.js', 'Databases', 'REST'] },
  { id: 'databases', label: 'Databases', x: 55, y: 82, size: 24, accent: 'amber' as 'cyan', notes: 33, summary: 'Structured persistence with indexing, joins and transactions.', related: ['APIs', 'SQL', 'Indexing'] },
  { id: 'ai', label: 'AI', x: 30, y: 78, size: 26, accent: 'violet', notes: 48, summary: 'Systems that learn from data to predict and generate.', related: ['Machine Learning', 'Transformers', 'Prompts'] },
  { id: 'ml', label: 'Machine Learning', x: 14, y: 88, size: 22, accent: 'cyan', notes: 19, summary: 'Algorithms that improve through experience and data.', related: ['AI', 'Statistics', 'Neural Nets'] },
]

export const graphEdges: [string, string][] = [
  ['javascript', 'react'],
  ['javascript', 'node'],
  ['react', 'hooks'],
  ['react', 'nextjs'],
  ['node', 'apis'],
  ['apis', 'databases'],
  ['nextjs', 'node'],
  ['ai', 'ml'],
  ['ai', 'databases'],
  ['javascript', 'ai'],
  ['apis', 'ai'],
]

export type CodeSnippet = {
  id: string
  title: string
  language: string
  description: string
  tags: string[]
  code: string
}

export const codeSnippets: CodeSnippet[] = [
  {
    id: 'debounce',
    title: 'Debounce Utility',
    language: 'JavaScript',
    description: 'Delays invoking a function until after wait ms have elapsed since the last call.',
    tags: ['performance', 'events', 'util'],
    code: `function debounce(fn, wait = 300) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), wait)
  }
}`,
  },
  {
    id: 'use-local-storage',
    title: 'useLocalStorage Hook',
    language: 'React',
    description: 'A typed React hook that syncs state to localStorage.',
    tags: ['react', 'hooks', 'storage'],
    code: `function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : initial
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}`,
  },
  {
    id: 'fastapi-route',
    title: 'FastAPI Endpoint',
    language: 'Python',
    description: 'A minimal typed FastAPI route with a Pydantic model.',
    tags: ['python', 'api', 'backend'],
    code: `@app.post("/notes")
async def create_note(note: Note):
    saved = await db.notes.insert(note.dict())
    return {"id": saved.id, "ok": True}`,
  },
  {
    id: 'sql-window',
    title: 'SQL Window Function',
    language: 'SQL',
    description: 'Rank rows within partitions without collapsing them.',
    tags: ['sql', 'analytics', 'query'],
    code: `SELECT
  topic,
  title,
  RANK() OVER (
    PARTITION BY topic
    ORDER BY connections DESC
  ) AS rank
FROM notes;`,
  },
  {
    id: 'express-mw',
    title: 'Express Auth Middleware',
    language: 'Node.js',
    description: 'Verifies a bearer token before passing to the next handler.',
    tags: ['nodejs', 'auth', 'express'],
    code: `function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    req.user = verify(token, process.env.SECRET)
    next()
  } catch {
    res.status(403).json({ error: 'Invalid token' })
  }
}`,
  },
  {
    id: 'css-glass',
    title: 'Glassmorphism Card',
    language: 'CSS',
    description: 'A frosted glass panel with a subtle inner highlight.',
    tags: ['css', 'ui', 'style'],
    code: `.glass {
  background: rgba(20, 26, 44, 0.55);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 20px 40px -24px rgba(0,0,0,0.7);
}`,
  },
]

export type QuizQuestion = {
  question: string
  options: string[]
  answer: number
  explanation: string
}

export const quizBank: Record<string, QuizQuestion[]> = {
  JavaScript: [
    {
      question: 'What does a closure capture?',
      options: [
        'A copy of all global variables',
        'References to variables in its lexical scope',
        'Only its own parameters',
        'The DOM tree at call time',
      ],
      answer: 1,
      explanation: 'A closure keeps references to variables from the scope in which it was defined.',
    },
    {
      question: 'Which queue has priority in the event loop?',
      options: ['Macrotask queue', 'Render queue', 'Microtask queue', 'Timer queue'],
      answer: 2,
      explanation: 'Microtasks (promises) drain fully before the next macrotask runs.',
    },
    {
      question: 'What does `typeof null` return?',
      options: ['"null"', '"object"', '"undefined"', '"boolean"'],
      answer: 1,
      explanation: 'A long-standing quirk: typeof null evaluates to "object".',
    },
    {
      question: 'How do you create a shallow copy of an array?',
      options: ['arr.clone()', '[...arr]', 'arr.deepCopy()', 'copy(arr)'],
      answer: 1,
      explanation: 'The spread operator creates a new array with the same elements.',
    },
    {
      question: 'What is the result of `0.1 + 0.2 === 0.3`?',
      options: ['true', 'false', 'NaN', 'throws'],
      answer: 1,
      explanation: 'Floating point rounding makes 0.1 + 0.2 slightly more than 0.3.',
    },
  ],
  React: [
    {
      question: 'When does useEffect run by default?',
      options: ['Before render', 'After every render', 'Only once ever', 'Never'],
      answer: 1,
      explanation: 'Without a dependency array, an effect runs after every completed render.',
    },
    {
      question: 'What does the dependency array control?',
      options: [
        'Component styling',
        'When the effect re-runs',
        'The render order',
        'Prop validation',
      ],
      answer: 1,
      explanation: 'The effect re-runs only when a listed dependency changes.',
    },
    {
      question: 'Why must hooks be called at the top level?',
      options: [
        'For performance',
        'To keep call order stable across renders',
        'It is only a style preference',
        'To avoid CSS conflicts',
      ],
      answer: 1,
      explanation: 'React relies on consistent call order to associate state with each hook.',
    },
  ],
  Databases: [
    {
      question: 'What does an index primarily improve?',
      options: ['Write speed', 'Read/lookup speed', 'Disk space', 'Backup time'],
      answer: 1,
      explanation: 'Indexes accelerate lookups at the cost of extra write overhead.',
    },
    {
      question: 'Which join returns only matching rows in both tables?',
      options: ['LEFT JOIN', 'FULL JOIN', 'INNER JOIN', 'CROSS JOIN'],
      answer: 2,
      explanation: 'INNER JOIN returns rows where the join condition matches in both tables.',
    },
  ],
}

export type Insight = {
  type: 'learned' | 'gap' | 'connection' | 'next'
  title: string
  detail: string
}

export const insights: Insight[] = [
  { type: 'learned', title: 'React Hooks mastered', detail: 'You reviewed hooks 4 times this week and scored 92% on the last quiz.' },
  { type: 'learned', title: 'Next.js routing solidified', detail: 'Two new notes and 6 fresh connections added around the App Router.' },
  { type: 'gap', title: 'Cybersecurity is thin', detail: 'Only 29 notes and no reviews in 12 days — your weakest connected area.' },
  { type: 'gap', title: 'Missing testing notes', detail: 'You reference tests in code but have no dedicated testing knowledge nodes.' },
  { type: 'connection', title: 'AI ↔ Databases', detail: 'Your ML notes now link to indexing and vector storage concepts.' },
  { type: 'connection', title: 'Node.js ↔ APIs', detail: '5 new edges formed between runtime internals and REST design.' },
  { type: 'next', title: 'Learn State Management', detail: 'You have studied React Hooks and Next.js recently. A useful next topic is state management.' },
  { type: 'next', title: 'Explore Vector Databases', detail: 'Bridges your AI and Databases clusters — high leverage given recent activity.' },
]

export const suggestedQuestions = [
  'What did I learn about JavaScript?',
  'Explain React hooks using my notes.',
  'What topics are connected to Node.js?',
  'Create a quiz from my notes.',
  'What should I learn next?',
]

export function mockAiResponse(prompt: string): string {
  const p = prompt.toLowerCase()
  if (p.includes('javascript')) {
    return 'From your notes, JavaScript centers on closures, the event loop, and async patterns. Your "JavaScript Closures" note (14 connections) links functions retaining lexical scope to memoization and private state, while "Node.js Event Loop" explains non-blocking I/O. Together they form your strongest Programming cluster.'
  }
  if (p.includes('hook')) {
    return 'Your "React Hooks" note (22 connections) covers useState, useEffect and useMemo. The key idea you captured: hooks must be called at the top level so React can keep call order stable. You linked custom hooks to the "useLocalStorage Hook" snippet in your Code Vault.'
  }
  if (p.includes('node')) {
    return 'Node.js connects to JavaScript, APIs, and the Event Loop in your graph. Related nodes: "REST API Design", "Express Auth Middleware", and "Node.js Event Loop". There are 3 direct edges and 6 second-degree links you might want to review.'
  }
  if (p.includes('quiz')) {
    return 'I can generate a quiz from your notes. Head to the Quizzes tab — I suggest a JavaScript quiz with 5 medium questions based on your most-connected notes. Want me to pre-fill those settings?'
  }
  if (p.includes('learn next') || p.includes('should i')) {
    return 'Based on recent activity in React Hooks and Next.js, your highest-leverage next topic is State Management, followed by Vector Databases to bridge your AI and Databases clusters. Both fill gaps flagged in your Insights.'
  }
  return 'I searched your 247 notes and 412 connections. I found relevant material across your Programming and AI clusters. Ask me to explain a concept, surface connections, or generate a quiz from what you have saved.'
}
