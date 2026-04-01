export function calculateStreak(completed, totalTasks) {
  let streak = 0
  for (let i = totalTasks; i >= 1; i--) {
    if (completed[i]) streak++
    else if (streak > 0) break
  }
  return streak
}
