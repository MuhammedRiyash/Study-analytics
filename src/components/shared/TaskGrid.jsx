export default function TaskGrid({ task, done, phaseColor, catColor, lvlColor, onToggle }) {
  return (
    <div
      onClick={() => onToggle(task.d)}
      className={`rounded-2xl p-3.5 border text-center cursor-pointer relative overflow-hidden
        transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
        ${done
          ? 'bg-[var(--ok)]/5 border-[var(--ok)]'
          : 'bg-[var(--bg2)] border-[var(--bd)]'
        }`}
    >
      {done && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[var(--ok)] flex items-center justify-center text-white text-[10px] font-extrabold">
          ✓
        </div>
      )}
      <div
        className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center font-black text-sm font-mono"
        style={{ background: phaseColor + '18', color: phaseColor }}
      >
        {task.d}
      </div>
      <p className={`text-[10px] font-semibold leading-tight
        ${done ? 'text-[var(--ok)] line-through' : 'text-[var(--tx)]'}`}>
        {task.task}
      </p>
      <div className="mt-1.5 flex gap-1 justify-center flex-wrap">
        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ color: catColor, background: catColor + '12' }}>
          {task.cat}
        </span>
        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ color: lvlColor, background: lvlColor + '12' }}>
          {task.lvl}
        </span>
      </div>
    </div>
  )
}
