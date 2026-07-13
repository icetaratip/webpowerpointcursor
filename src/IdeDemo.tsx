/**
 * Visual mock of Cursor IDE — shows Agent chat + code editor + multi-file edits
 */
export function IdeDemo() {
  return (
    <div className="ide" role="img" aria-label="ตัวอย่างหน้าจอ Cursor IDE">
      <div className="ide__titlebar">
        <div className="ide__dots" aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className="ide__title">
          <img src="/icons/cursor/mono.svg" alt="" width={14} height={14} />
          Cursor — checkout-flow · Agent
        </div>
        <div className="ide__badge">Agent Mode</div>
      </div>

      <div className="ide__body">
        <aside className="ide__sidebar">
          <p className="ide__side-label">EXPLORER</p>
          <ul>
            <li className="is-folder">src</li>
            <li className="is-active">App.tsx</li>
            <li>auth.ts</li>
            <li>api/login.ts</li>
            <li className="is-changed">schema.sql</li>
            <li>styles.css</li>
          </ul>
        </aside>

        <section className="ide__editor">
          <div className="ide__tabs">
            <span className="is-on">App.tsx</span>
            <span className="is-dirty">auth.ts</span>
            <span className="is-dirty">schema.sql</span>
          </div>
          <pre className="ide__code">{`import { login } from './auth'

export function App() {
  // Cursor: เพิ่มหน้า Login + เชื่อม API
  return (
    <LoginForm
      onSubmit={async (email, pass) => {
        await login(email, pass)
      }}
    />
  )
}`}</pre>
          <div className="ide__ghost">
            <span className="ide__ghost-tag">Tab</span>
            เติมโค้ดอัตโนมัติจากบริบทโปรเจกต์…
          </div>
        </section>

        <aside className="ide__chat">
          <p className="ide__side-label">CURSOR AGENT</p>
          <div className="ide__msg ide__msg--user">
            เพิ่มระบบ Login ให้ Frontend กับ Backend สอดคล้องกัน รวม schema ด้วย
          </div>
          <div className="ide__msg ide__msg--ai">
            <strong>กำลังแก้ 3 ไฟล์</strong>
            <ul>
              <li><em>App.tsx</em> — เพิ่ม LoginForm</li>
              <li><em>auth.ts</em> — สร้าง login()</li>
              <li><em>schema.sql</em> — ตาราง users</li>
            </ul>
            <div className="ide__diff">
              <span className="is-add">+ export async function login(…)</span>
              <span className="is-add">+ CREATE TABLE users (…)</span>
            </div>
          </div>
          <div className="ide__composer">
            <span>ถาม Cursor…</span>
            <kbd>⌘</kbd><kbd>Enter</kbd>
          </div>
        </aside>
      </div>

      <footer className="ide__status">
        <span>Cursor Tab · On</span>
        <span>Multi-file edit · 3 files</span>
        <span>Model · Auto</span>
      </footer>
    </div>
  )
}
