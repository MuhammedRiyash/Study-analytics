import { useMemo, useRef, useEffect, useCallback } from 'react';
import { ACHIEVEMENTS } from '../config/achievements';

export function useAchievements(completed, tasks, onNewAchievement) {
  const prevEarnedRef = useRef(new Set());

  // completed is an array of day numbers, tasks is the flat task array
  const earned = useMemo(() => {
    if (!completed || !tasks) return [];
    const phases = [];
    // Build phases from tasks for the phase achievement check
    const phaseMap = {};
    for (const t of tasks) {
      // tasks have no explicit phase grouping at this level,
      // so we pass the raw tasks array; phase-based achievements
      // receive the course phases from the caller if needed
    }

    return ACHIEVEMENTS.filter((a) => {
      try {
        return a.check(completed, tasks);
      } catch {
        return false;
      }
    });
  }, [completed, tasks]);

  const newlyEarned = useMemo(() => {
    const prevSet = prevEarnedRef.current;
    return earned.filter((a) => !prevSet.has(a.id));
  }, [earned]);

  const onNewRef = useRef(onNewAchievement);
  onNewRef.current = onNewAchievement;

  useEffect(() => {
    if (newlyEarned.length > 0 && onNewRef.current) {
      for (const achievement of newlyEarned) {
        onNewRef.current(achievement);
      }
    }
    // Update the previously earned set after notifying
    prevEarnedRef.current = new Set(earned.map((a) => a.id));
  }, [earned, newlyEarned]);

  return { earned, newlyEarned };
}

export default useAchievements;
