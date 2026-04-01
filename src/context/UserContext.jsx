import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'study-analytics-v4';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (stored.user) {
        setUserState(stored.user);
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  // Save user to localStorage whenever it changes (after initial load)
  useEffect(() => {
    if (!loaded) return;
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (user === null) {
        delete stored.user;
      } else {
        stored.user = user;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // storage unavailable
    }
  }, [user, loaded]);

  const setUser = useCallback((name) => {
    setUserState(name);
  }, []);

  const logout = useCallback(() => {
    setUserState(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loaded, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
}

export default UserContext;
