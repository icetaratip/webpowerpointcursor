import { useCallback, useEffect, useRef, useState } from 'react'
import { brands } from './brands'

const USER_PROMPT = 'เพิ่มระบบ Login ให้ Frontend กับ Backend สอดคล้องกัน รวม schema ด้วย'

const FILE_CONTENT: Record<string, { before: string[]; after: string[] }> = {
  'App.tsx': {
    before: ['export function App() {', '  return <div>Hello</div>', '}'],
    after: [
      "import { login } from './auth'",
      '',
      'export function App() {',
      '  return (',
      '    <LoginForm',
      '      onSubmit={async (email, pass) => {',
      '        await login(email, pass)',
      '      }}',
      '    />',
      '  )',
      '}',
    ],
  },
  'auth.ts': {
    before: ['// empty'],
    after: [
      'export async function login(email: string, pass: string) {',
      "  const res = await fetch('/api/login', {",
      "    method: 'POST',",
      '    body: JSON.stringify({ email, pass }),',
      '  })',
      "  if (!res.ok) throw new Error('Login failed')",
      '  return res.json()',
      '}',
    ],
  },
  'schema.sql': {
    before: ['-- empty'],
    after: [
      'CREATE TABLE users (',
      '  id SERIAL PRIMARY KEY,',
      '  email VARCHAR(255) UNIQUE NOT NULL,',
      '  password_hash TEXT NOT NULL,',
      '  created_at TIMESTAMPTZ DEFAULT NOW()',
      ');',
    ],
  },
}

const EDIT_SEQUENCE = ['App.tsx', 'auth.ts', 'schema.sql'] as const

type DemoPhase = 'idle' | 'prompt' | 'thinking' | 'planning' | 'editing' | 'done'

function wait(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const id = window.setTimeout(resolve, ms)
    signal.addEventListener('abort', () => {
      window.clearTimeout(id)
      reject(new DOMException('aborted', 'AbortError'))
    })
  })
}

export function IdeDemo() {
  const runRef = useRef<AbortController | null>(null)
  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState<DemoPhase>('idle')
  const [promptText, setPromptText] = useState('')
  const [activeTab, setActiveTab] = useState('App.tsx')
  const [visibleLines, setVisibleLines] = useState(FILE_CONTENT['App.tsx'].before)
  const [changedFiles, setChangedFiles] = useState<string[]>([])
  const [dirtyTabs, setDirtyTabs] = useState<string[]>([])
  const [planStep, setPlanStep] = useState(0)
  const [showDiff, setShowDiff] = useState(false)
  const [showGhost, setShowGhost] = useState(false)
  const [statusFiles, setStatusFiles] = useState(0)
  const [showCaret, setShowCaret] = useState(false)

  const reset = useCallback(() => {
    setPhase('idle')
    setPromptText('')
    setActiveTab('App.tsx')
    setVisibleLines(FILE_CONTENT['App.tsx'].before)
    setChangedFiles([])
    setDirtyTabs([])
    setPlanStep(0)
    setShowDiff(false)
    setShowGhost(false)
    setStatusFiles(0)
    setShowCaret(false)
  }, [])

  const runDemo = useCallback(async () => {
    runRef.current?.abort()
    const controller = new AbortController()
    runRef.current = controller
    const { signal } = controller

    try {
      setRunning(true)
      reset()

      setPhase('prompt')
      for (let i = 0; i <= USER_PROMPT.length; i++) {
        await wait(28, signal)
        setPromptText(USER_PROMPT.slice(0, i))
      }
      await wait(500, signal)

      setPhase('thinking')
      await wait(1400, signal)

      setPhase('planning')
      for (let i = 1; i <= 3; i++) {
        await wait(450, signal)
        setPlanStep(i)
      }
      await wait(350, signal)

      setPhase('editing')
      setShowDiff(true)

      for (const file of EDIT_SEQUENCE) {
        setActiveTab(file)
        setVisibleLines([])
        setShowCaret(true)
        setChangedFiles((prev) => (prev.includes(file) ? prev : [...prev, file]))
        await wait(320, signal)

        const lines = FILE_CONTENT[file].after
        for (let i = 1; i <= lines.length; i++) {
          await wait(file === 'App.tsx' ? 120 : 95, signal)
          setVisibleLines(lines.slice(0, i))
        }

        setDirtyTabs((prev) => (prev.includes(file) ? prev : [...prev, file]))
        setStatusFiles((prev) => prev + 1)
        await wait(380, signal)
      }

      setShowCaret(false)
      setShowGhost(true)
      setPhase('done')
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      throw err
    } finally {
      setRunning(false)
      setShowCaret(false)
    }
  }, [reset])

  useEffect(() => () => runRef.current?.abort(), [])

  const sidebarFiles = ['src', 'App.tsx', 'auth.ts', 'api/login.ts', 'schema.sql', 'styles.css']

  return (
    <div className="ide-demo">
      <div className="ide-demo__toolbar">
        <button
          type="button"
          className="ide-demo__test"
          onClick={() => void runDemo()}
          disabled={running}
          aria-busy={running}
        >
          <span className="ide-demo__test-icon" aria-hidden="true">
            ▶
          </span>
          {running ? 'กำลังรัน…' : 'Test'}
        </button>
      </div>

      <div
        className={`ide${running ? ' is-running' : ''}${phase === 'done' ? ' is-done' : ''}`}
        role="region"
        aria-label="ตัวอย่างหน้าจอ Cursor IDE"
      >
        {running && <div className="ide__progress" aria-hidden="true" />}

        <div className="ide__titlebar">
          <div className="ide__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="ide__title">
            <img src={brands.cursor} alt="" width={14} height={14} />
            Cursor — checkout-flow · Agent
          </div>
          <div className={`ide__badge${phase === 'thinking' || phase === 'editing' ? ' is-pulse' : ''}`}>
            {phase === 'thinking' ? 'กำลังคิด…' : phase === 'editing' ? 'กำลังแก้ไฟล์…' : 'Agent Mode'}
          </div>
        </div>

        <div className="ide__body">
          <aside className="ide__sidebar">
            <p className="ide__side-label">EXPLORER</p>
            <ul>
              {sidebarFiles.map((file) => {
                const isFolder = file === 'src'
                const isActive = file === activeTab
                const isChanged = changedFiles.includes(file)
                const isScanning = phase === 'editing' && activeTab === file

                return (
                  <li
                    key={file}
                    className={[
                      isFolder ? 'is-folder' : '',
                      isActive ? 'is-active' : '',
                      isChanged ? 'is-changed' : '',
                      isScanning ? 'is-scanning' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {file}
                  </li>
                )
              })}
            </ul>
          </aside>

          <section className="ide__editor">
            <div className="ide__tabs">
              {['App.tsx', 'auth.ts', 'schema.sql'].map((tab) => (
                <span
                  key={tab}
                  className={[
                    activeTab === tab ? 'is-on' : '',
                    dirtyTabs.includes(tab) ? 'is-dirty' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {tab}
                </span>
              ))}
            </div>

            <pre className="ide__code">
              {visibleLines.map((line, index) => {
                const beforeCount = FILE_CONTENT[activeTab]?.before.length ?? 0
                const isNew = phase !== 'idle' && index >= beforeCount

                return (
                  <code
                    key={`${activeTab}-${index}`}
                    className={`ide__code-line${isNew ? ' is-added' : ''}`}
                  >
                    <span className="ide__ln">{String(index + 1).padStart(2, ' ')}</span>
                    {line}
                  </code>
                )
              })}
              {showCaret && <span className="ide__caret" aria-hidden="true" />}
            </pre>

            <div className={`ide__ghost${showGhost ? ' is-visible' : ''}`}>
              <span className="ide__ghost-tag">Tab</span>
              เติมโค้ดอัตโนมัติจากบริบทโปรเจกต์…
            </div>
          </section>

          <aside className="ide__chat">
            <p className="ide__side-label">CURSOR AGENT</p>

            {promptText && (
              <div className={`ide__msg ide__msg--user${phase === 'prompt' ? ' is-entering' : ''}`}>
                {promptText}
              </div>
            )}

            {phase === 'thinking' && (
              <div className="ide__msg ide__msg--ai ide__msg--thinking is-entering">
                <span className="ide__thinking-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                กำลังอ่านโปรเจกต์และวางแผน…
              </div>
            )}

            {(phase === 'planning' || phase === 'editing' || phase === 'done') && (
              <div className="ide__msg ide__msg--ai is-entering">
                <strong>กำลังแก้ 3 ไฟล์</strong>
                <ul>
                  <li className={planStep >= 1 ? 'is-done' : ''}>
                    <em>App.tsx</em> — เพิ่ม LoginForm
                  </li>
                  <li className={planStep >= 2 ? 'is-done' : ''}>
                    <em>auth.ts</em> — สร้าง login()
                  </li>
                  <li className={planStep >= 3 ? 'is-done' : ''}>
                    <em>schema.sql</em> — ตาราง users
                  </li>
                </ul>
                {showDiff && (
                  <div className="ide__diff">
                    <span className={`is-add${planStep >= 2 ? ' is-visible' : ''}`}>
                      + export async function login(…)
                    </span>
                    <span className={`is-add${planStep >= 3 ? ' is-visible' : ''}`}>
                      + CREATE TABLE users (…)
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="ide__composer">
              <span>{running ? 'Agent กำลังทำงาน…' : 'ถาม Cursor…'}</span>
              <kbd>⌘</kbd>
              <kbd>Enter</kbd>
            </div>
          </aside>
        </div>

        <footer className="ide__status">
          <span>Cursor Tab · {showGhost ? 'On' : 'Off'}</span>
          <span>
            Multi-file edit · {statusFiles > 0 ? `${statusFiles} files` : '—'}
          </span>
          <span>Model · Auto</span>
        </footer>
      </div>
    </div>
  )
}
