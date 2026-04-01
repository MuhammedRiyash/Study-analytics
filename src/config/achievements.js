export const ACHIEVEMENTS = [
  {
    id: "first",
    title: "First Step",
    desc: "Complete your first task",
    icon: "🎯",
    check: (completed) => completed.length >= 1,
  },
  {
    id: "five",
    title: "Getting Started",
    desc: "Complete 5 tasks",
    icon: "⭐",
    check: (completed) => completed.length >= 5,
  },
  {
    id: "ten",
    title: "Double Digits",
    desc: "Complete 10 tasks",
    icon: "🔥",
    check: (completed) => completed.length >= 10,
  },
  {
    id: "quarter",
    title: "Quarter Way",
    desc: "Complete 25 tasks",
    icon: "🏅",
    check: (completed) => completed.length >= 25,
  },
  {
    id: "half",
    title: "Halfway Hero",
    desc: "Complete 50 tasks",
    icon: "🏆",
    check: (completed) => completed.length >= 50,
  },
  {
    id: "seventy",
    title: "Unstoppable",
    desc: "Complete 75 tasks",
    icon: "💎",
    check: (completed) => completed.length >= 75,
  },
  {
    id: "ninety",
    title: "Almost There",
    desc: "Complete 90 tasks",
    icon: "🌟",
    check: (completed) => completed.length >= 90,
  },
  {
    id: "complete",
    title: "Marketing Master",
    desc: "Complete all 100 tasks",
    icon: "👑",
    check: (completed) => completed.length >= 100,
  },
  {
    id: "seo_done",
    title: "SEO Expert",
    desc: "Complete all SEO category tasks",
    icon: "🔍",
    check: (completed, tasks) => {
      const seoTasks = tasks.filter((t) => t.cat === "SEO");
      return seoTasks.every((t) => completed.includes(t.d));
    },
  },
  {
    id: "ppc_done",
    title: "PPC Pro",
    desc: "Complete all PPC category tasks",
    icon: "💰",
    check: (completed, tasks) => {
      const ppcTasks = tasks.filter((t) => t.cat === "PPC");
      return ppcTasks.every((t) => completed.includes(t.d));
    },
  },
  {
    id: "beginner_done",
    title: "Foundations Set",
    desc: "Complete all Beginner level tasks",
    icon: "📚",
    check: (completed, tasks) => {
      const beginnerTasks = tasks.filter((t) => t.lvl === "Beginner");
      return beginnerTasks.every((t) => completed.includes(t.d));
    },
  },
  {
    id: "phase1",
    title: "Phase Pioneer",
    desc: "Complete any one entire phase",
    icon: "🚀",
    check: (completed, tasks, phases) => {
      if (!phases) return false;
      return phases.some((phase) =>
        phase.tasks.every((t) => completed.includes(t.d))
      );
    },
  },
];
