import { useRef, useState } from 'react'
import { gsap } from '../../animations/gsapSetup'
import { XP_PER_TASK } from '../../config/constants'
import { RESOURCES } from '../../config/resources'
import { BookOpen, ExternalLink } from 'lucide-react'

const TYPE_ICONS = { article: '📄', video: '🎬', course: '🎓', tool: '🔧', guide: '📖' }

function ResourceSection({ label, emoji, items, color }) {
  if (!items || items.length === 0) return null
  return (
    <div className="mb-2.5">
      <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color }}>
        {emoji} {label}
      </p>
      <div className="space-y-1">
        {items.map((r, i) => (
          <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[var(--bg)] border border-[var(--bd)]
              hover:border-[var(--ac)] hover:bg-[var(--ac)]/5 transition-all duration-200 group">
            <span className="text-xs">{TYPE_ICONS[r.type] || '🔗'}</span>
            <span className="text-[11px] font-semibold text-[var(--tx)] flex-1 truncate group-hover:text-[var(--ac)] transition-colors">
              {r.title}
            </span>
            <ExternalLink size={10} className="text-[var(--tx3)] group-hover:text-[var(--ac)] flex-shrink-0 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  )
}

export default function TaskCard({ task, done, note, phaseColor, catColor, lvlColor, onToggle, onNote }) {
  const checkRef = useRef(null)
  const [showNote, setShowNote] = useState(false)
  const [showResources, setShowResources] = useState(false)
  const [noteText, setNoteText] = useState(note || '')

  const resources = RESOURCES[task.d]

  const handleToggle = () => {
    if (!done && checkRef.current) {
      gsap.fromTo(checkRef.current,
        { scale: 0, rotation: -90 },
        { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(3)' }
      )
    }
    onToggle(task.d)
  }

  const handleSaveNote = () => {
    onNote(task.d, noteText)
    setShowNote(false)
  }

  return (
    <div className={`rounded-xl border transition-all duration-200 overflow-hidden
      ${done
        ? 'bg-[var(--ok)]/5 border-[var(--ok)]'
        : 'bg-[var(--bg2)] border-[var(--bd)] hover:translate-x-1 hover:shadow-lg'
      }`}>

      {/* Main row */}
      <div onClick={handleToggle} className="flex items-center gap-3 px-4 py-3 cursor-pointer">
        <div ref={checkRef}
          className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-extrabold transition-all duration-300
            ${done ? 'bg-[var(--ok)] border-2 border-[var(--ok)] text-white' : 'bg-[var(--bg2)] border-2 border-[var(--bd)] text-transparent'}`}>
          ✓
        </div>

        <div className="text-white font-extrabold text-[10px] rounded-md px-2 py-1 min-w-[42px] text-center font-mono flex-shrink-0"
          style={{ background: phaseColor || '#64748b' }}>
          D{task.d}
        </div>

        <div className="flex-1 min-w-0">
          <div className={`text-[13px] font-semibold leading-tight ${done ? 'text-[var(--ok)] line-through' : 'text-[var(--tx)]'}`}>
            {task.task}
          </div>
          <div className="flex gap-1 mt-1 flex-wrap">
            <span className="text-[9px] font-bold text-[var(--tx3)] bg-[var(--bg3)] px-1.5 py-0.5 rounded">{task.phase}</span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: catColor, background: catColor + '15' }}>{task.cat}</span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: lvlColor, background: lvlColor + '15' }}>{task.lvl}</span>
            <span className="text-[9px] font-bold text-[var(--ac)] bg-[var(--ac)]/10 px-1.5 py-0.5 rounded">+{XP_PER_TASK[task.lvl]}XP</span>
            {note && <span className="text-[9px] font-bold text-[var(--wn)] bg-[var(--wn)]/10 px-1.5 py-0.5 rounded">📝</span>}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-1.5 flex-shrink-0" onClick={e => e.stopPropagation()}>
          {resources && (
            <button onClick={() => { setShowResources(!showResources); setShowNote(false) }}
              className={`w-7 h-7 rounded-md text-xs flex items-center justify-center transition-colors
                ${showResources ? 'bg-[var(--ac)] text-white' : 'bg-[var(--bg3)] text-[var(--tx3)] hover:bg-[var(--bd)]'}`}>
              <BookOpen size={13} />
            </button>
          )}
          <button onClick={() => { setShowNote(!showNote); setShowResources(false); setNoteText(note || '') }}
            className={`w-7 h-7 rounded-md text-xs flex items-center justify-center transition-colors
              ${showNote ? 'bg-[var(--wn)] text-white' : 'bg-[var(--bg3)] text-[var(--tx3)] hover:bg-[var(--bd)]'}`}>
            📝
          </button>
        </div>
      </div>

      {/* Resources dropdown */}
      {showResources && resources && (
        <div className="px-4 pb-3 pt-1 border-t border-[var(--bd)] bg-[var(--bg3)]/30">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={14} className="text-[var(--ac)]" />
            <p className="text-[12px] font-bold text-[var(--tx)]">Study Resources for Day {task.d}</p>
          </div>
          <ResourceSection label="Free Resources" emoji="🆓" items={resources.free} color="var(--ok)" />
          <ResourceSection label="Paid / Premium" emoji="💎" items={resources.paid} color="var(--ac)" />
          <ResourceSection label="All-Time Best" emoji="⭐" items={resources.best} color="var(--wn)" />
        </div>
      )}

      {/* Note panel */}
      {showNote && (
        <div className="px-4 pb-3 pt-1 border-t border-[var(--bd)]">
          <textarea value={noteText} onChange={e => setNoteText(e.target.value)}
            placeholder="Add a note..." rows={2}
            className="w-full p-2.5 rounded-lg border border-[var(--bd)] bg-[var(--bg3)] text-[var(--tx)] text-xs font-medium
              resize-y outline-none focus:border-[var(--ac)] transition-colors" />
          <div className="flex gap-2 mt-2">
            <button onClick={handleSaveNote}
              className="px-3 py-1.5 rounded-md bg-[var(--ac)] text-white text-[11px] font-bold hover:opacity-90 transition-opacity">
              Save
            </button>
            <button onClick={() => setShowNote(false)}
              className="px-3 py-1.5 rounded-md bg-[var(--bg3)] text-[var(--tx2)] text-[11px] font-bold hover:bg-[var(--bd)] transition-colors">
              Cancel
            </button>
          </div>
          {note && <p className="text-[11px] text-[var(--tx2)] mt-2 p-2 bg-[var(--bg3)] rounded-md">{note}</p>}
        </div>
      )}
    </div>
  )
}
