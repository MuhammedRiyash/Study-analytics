export function computePhaseData(phases, completed) {
  return phases.map(phase => {
    const total = phase.tasks.length
    const done = phase.tasks.filter(t => completed[t.d]).length
    const pct = total ? Math.round((done / total) * 100) : 0
    return { name: phase.name, total, done, pct }
  })
}

export function computeCatData(tasks, completed, categories) {
  const map = {}
  tasks.forEach(t => {
    if (!map[t.cat]) map[t.cat] = { name: t.cat, total: 0, done: 0 }
    map[t.cat].total++
    if (completed[t.d]) map[t.cat].done++
  })
  return Object.values(map)
}

export function computeLevelData(tasks, completed) {
  const map = {}
  tasks.forEach(t => {
    if (!map[t.lvl]) map[t.lvl] = { name: t.lvl, total: 0, done: 0 }
    map[t.lvl].total++
    if (completed[t.d]) map[t.lvl].done++
  })
  return ['Beginner', 'Intermediate', 'Advanced'].map(l => map[l] || { name: l, total: 0, done: 0 })
}

export function computeCumulativeData(completed, totalTasks) {
  let cum = 0
  return Array.from({ length: totalTasks }, (_, i) => {
    if (completed[i + 1]) cum++
    return { day: i + 1, done: cum, target: i + 1 }
  })
}

export function computeRadarData(catData) {
  return catData.map(c => ({
    subject: c.name,
    pct: c.total ? Math.round((c.done / c.total) * 100) : 0,
    full: 100,
  }))
}

export function filterTasks(tasks, { phase = 'All', level = 'All', search = '' } = {}) {
  let filtered = tasks
  if (phase !== 'All') filtered = filtered.filter(t => t.phase === phase)
  if (level !== 'All') filtered = filtered.filter(t => t.lvl === level)
  if (search.trim()) {
    const q = search.toLowerCase()
    filtered = filtered.filter(t =>
      t.task.toLowerCase().includes(q) ||
      t.cat.toLowerCase().includes(q) ||
      (t.phase && t.phase.toLowerCase().includes(q))
    )
  }
  return filtered
}
