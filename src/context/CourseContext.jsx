import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { COURSES } from '../config/courses';
import { XP_PER_TASK } from '../config/constants';

const STORAGE_KEY = 'study-analytics-v4';

const CourseContext = createContext(null);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadCourseData(courseId) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const courses = stored.courses || {};
    return courses[courseId] || { completed: [], notes: {} };
  } catch {
    return { completed: [], notes: {} };
  }
}

function saveCourseData(courseId, data) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (!stored.courses) stored.courses = {};
    stored.courses[courseId] = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // storage unavailable
  }
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function CourseProvider({ children }) {
  const [activeCourseId, setActiveCourseId] = useState('digital-marketing-100');
  const [completed, setCompleted] = useState([]); // array of day numbers
  const [notes, setNotes] = useState({}); // { [day]: string }

  // Load from localStorage when active course changes
  useEffect(() => {
    const data = loadCourseData(activeCourseId);
    setCompleted(data.completed || []);
    setNotes(data.notes || {});
  }, [activeCourseId]);

  // Persist whenever completed/notes change
  useEffect(() => {
    saveCourseData(activeCourseId, { completed, notes });
  }, [activeCourseId, completed, notes]);

  // -------------------------------------------------------------------------
  // Course object helpers
  // -------------------------------------------------------------------------

  const getActiveCourse = useCallback(() => {
    return COURSES.find((c) => c.id === activeCourseId) || COURSES[0];
  }, [activeCourseId]);

  const course = useMemo(() => getActiveCourse(), [getActiveCourse]);

  const getAllTasks = useCallback(() => {
    return course.phases.flatMap((p) => p.tasks);
  }, [course]);

  const allTasks = useMemo(() => getAllTasks(), [getAllTasks]);

  // -------------------------------------------------------------------------
  // Toggle & notes
  // -------------------------------------------------------------------------

  const toggle = useCallback(
    (day) => {
      let newlyCompleted = false;
      setCompleted((prev) => {
        if (prev.includes(day)) {
          return prev.filter((d) => d !== day);
        }
        newlyCompleted = true;
        return [...prev, day];
      });
      return newlyCompleted;
    },
    []
  );

  const saveNote = useCallback((day, text) => {
    setNotes((prev) => {
      const next = { ...prev };
      if (!text || text.trim() === '') {
        delete next[day];
      } else {
        next[day] = text;
      }
      return next;
    });
  }, []);

  // -------------------------------------------------------------------------
  // Computed values
  // -------------------------------------------------------------------------

  const totalDone = completed.length;
  const pct = allTasks.length > 0 ? Math.round((totalDone / allTasks.length) * 100) : 0;

  // Streak: longest consecutive run of completed days (by day number)
  const streak = useMemo(() => {
    if (completed.length === 0) return 0;
    const sorted = [...completed].sort((a, b) => a - b);
    let max = 1;
    let cur = 1;
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i] === sorted[i - 1] + 1) {
        cur++;
        max = Math.max(max, cur);
      } else {
        cur = 1;
      }
    }
    return max;
  }, [completed]);

  // Current phase: the phase containing the first incomplete task
  const currentPhase = useMemo(() => {
    for (const phase of course.phases) {
      const hasIncomplete = phase.tasks.some((t) => !completed.includes(t.d));
      if (hasIncomplete) return phase;
    }
    return course.phases[course.phases.length - 1];
  }, [course, completed]);

  // Next task: first incomplete task
  const nextTask = useMemo(() => {
    for (const phase of course.phases) {
      for (const task of phase.tasks) {
        if (!completed.includes(task.d)) return task;
      }
    }
    return null;
  }, [course, completed]);

  // XP
  const xp = useMemo(() => {
    return allTasks
      .filter((t) => completed.includes(t.d))
      .reduce((sum, t) => sum + (XP_PER_TASK[t.lvl] || 10), 0);
  }, [allTasks, completed]);

  // -------------------------------------------------------------------------
  // Phase progress data (for charts)
  // -------------------------------------------------------------------------

  const getPhaseData = useCallback(() => {
    return course.phases.map((phase) => {
      const total = phase.tasks.length;
      const done = phase.tasks.filter((t) => completed.includes(t.d)).length;
      return {
        name: phase.name,
        total,
        done,
        pct: total > 0 ? Math.round((done / total) * 100) : 0,
        color: course.phaseColors?.[phase.name] || '#6366f1',
      };
    });
  }, [course, completed]);

  // Category progress data
  const getCatData = useCallback(() => {
    const cats = course.categories || {};
    return Object.keys(cats).map((cat) => {
      const tasksInCat = allTasks.filter((t) => t.cat === cat);
      const done = tasksInCat.filter((t) => completed.includes(t.d)).length;
      return {
        name: cat,
        total: tasksInCat.length,
        done,
        pct: tasksInCat.length > 0 ? Math.round((done / tasksInCat.length) * 100) : 0,
        color: cats[cat],
      };
    });
  }, [course, allTasks, completed]);

  // Level progress data (Beginner / Intermediate / Advanced)
  const getLevelData = useCallback(() => {
    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    const levelColors = course.levelColors || {
      Beginner: '#22c55e',
      Intermediate: '#f59e0b',
      Advanced: '#ef4444',
    };
    return levels.map((lvl) => {
      const tasksInLvl = allTasks.filter((t) => t.lvl === lvl);
      const done = tasksInLvl.filter((t) => completed.includes(t.d)).length;
      return {
        name: lvl,
        total: tasksInLvl.length,
        done,
        pct: tasksInLvl.length > 0 ? Math.round((done / tasksInLvl.length) * 100) : 0,
        color: levelColors[lvl],
      };
    });
  }, [course, allTasks, completed]);

  // Cumulative completion data (for line chart)
  const getCumulativeData = useCallback(() => {
    const sorted = [...completed].sort((a, b) => a - b);
    const data = [];
    let cumulative = 0;
    for (const day of sorted) {
      cumulative++;
      data.push({ day, count: cumulative });
    }
    return data;
  }, [completed]);

  // Radar chart data (one axis per category)
  const getRadarData = useCallback(() => {
    const cats = course.categories || {};
    return Object.keys(cats).map((cat) => {
      const tasksInCat = allTasks.filter((t) => t.cat === cat);
      const done = tasksInCat.filter((t) => completed.includes(t.d)).length;
      return {
        subject: cat,
        value: tasksInCat.length > 0 ? Math.round((done / tasksInCat.length) * 100) : 0,
        fullMark: 100,
      };
    });
  }, [course, allTasks, completed]);

  // Filtered tasks (for task list view)
  const filteredTasks = useCallback(
    (filterPhase, filterLevel, searchQuery) => {
      let tasks = allTasks;

      if (filterPhase && filterPhase !== 'all') {
        const phase = course.phases.find((p) => p.name === filterPhase);
        if (phase) {
          const phaseDays = new Set(phase.tasks.map((t) => t.d));
          tasks = tasks.filter((t) => phaseDays.has(t.d));
        }
      }

      if (filterLevel && filterLevel !== 'all') {
        tasks = tasks.filter((t) => t.lvl === filterLevel);
      }

      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        tasks = tasks.filter(
          (t) =>
            t.task.toLowerCase().includes(q) ||
            t.cat.toLowerCase().includes(q) ||
            String(t.d).includes(q)
        );
      }

      return tasks;
    },
    [allTasks, course]
  );

  // -------------------------------------------------------------------------
  // Context value
  // -------------------------------------------------------------------------

  const value = useMemo(
    () => ({
      activeCourseId,
      setActiveCourseId,
      completed,
      notes,
      toggle,
      saveNote,
      getActiveCourse,
      getAllTasks,
      allTasks,
      getPhaseData,
      getCatData,
      getLevelData,
      getCumulativeData,
      getRadarData,
      totalDone,
      pct,
      streak,
      currentPhase,
      nextTask,
      xp,
      filteredTasks,
      course,
    }),
    [
      activeCourseId,
      completed,
      notes,
      toggle,
      saveNote,
      getActiveCourse,
      getAllTasks,
      allTasks,
      getPhaseData,
      getCatData,
      getLevelData,
      getCumulativeData,
      getRadarData,
      totalDone,
      pct,
      streak,
      currentPhase,
      nextTask,
      xp,
      filteredTasks,
      course,
    ]
  );

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const ctx = useContext(CourseContext);
  if (!ctx) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return ctx;
}

export default CourseContext;
