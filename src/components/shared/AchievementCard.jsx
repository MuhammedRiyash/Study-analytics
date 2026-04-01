export default function AchievementCard({ achievement, earned }) {
  return (
    <div className={`bg-[var(--bg2)] rounded-2xl p-5 border transition-all duration-300
      ${earned
        ? 'border-[var(--wn)] opacity-100 shadow-[0_4px_20px_rgba(245,158,11,.15)]'
        : 'border-[var(--bd)] opacity-50'
      }`}>
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl
          ${earned
            ? 'bg-[var(--wn)]/10 border border-[var(--wn)]/20'
            : 'bg-[var(--bg3)] border border-[var(--bd)]'
          }`}>
          {earned ? achievement.icon : '🔒'}
        </div>
        <div>
          <h4 className={`text-sm font-extrabold ${earned ? 'text-[var(--tx)]' : 'text-[var(--tx3)]'}`}>
            {achievement.title}
          </h4>
          <p className="text-[11px] text-[var(--tx3)] mt-0.5">{achievement.desc}</p>
        </div>
      </div>
      {earned && (
        <div className="mt-2.5 text-[10px] font-bold text-[var(--wn)] uppercase tracking-wider">
          ✓ Unlocked
        </div>
      )}
    </div>
  )
}
