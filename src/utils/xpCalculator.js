import { XP_PER_TASK, getLevel } from '../config/constants'

export function calculateXP(completed, tasks) {
  return tasks.reduce((sum, t) => sum + (completed[t.d] ? (XP_PER_TASK[t.lvl] || 0) : 0), 0)
}

export function calculateLevel(xp) {
  return getLevel(xp)
}

export function xpForTask(task) {
  return XP_PER_TASK[task.lvl] || 0
}
