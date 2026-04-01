export const XP_PER_TASK = {
  Beginner: 10,
  Intermediate: 20,
  Advanced: 35,
};

export const LEVELS = [
  { name: "Rookie", min: 0 },
  { name: "Learner", min: 50 },
  { name: "Student", min: 150 },
  { name: "Practitioner", min: 300 },
  { name: "Specialist", min: 500 },
  { name: "Expert", min: 750 },
  { name: "Master", min: 1000 },
  { name: "Guru", min: 1400 },
  { name: "Legend", min: 1900 },
];

export const MOTIVATIONS = [
  "Every expert was once a beginner. Keep going!",
  "Small daily improvements lead to stunning results.",
  "You don't have to be great to start, but you have to start to be great.",
  "The secret of getting ahead is getting started.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Don't watch the clock; do what it does — keep going.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "It always seems impossible until it's done.",
  "Your future self will thank you for the effort you put in today.",
];

export function getLevel(xp) {
  let idx = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) {
      idx = i;
      break;
    }
  }

  const current = LEVELS[idx];
  const next = LEVELS[idx + 1] || null;
  const progress = next
    ? ((xp - current.min) / (next.min - current.min)) * 100
    : 100;

  return {
    name: current.name,
    min: current.min,
    idx,
    next: next ? next.min : null,
    progress: Math.min(progress, 100),
  };
}
