import { useState, useCallback, lazy, Suspense, useMemo } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { UserProvider, useUser } from './context/UserContext'
import { CourseProvider } from './context/CourseContext'

import Header from './components/layout/Header'
import Navigation from './components/layout/Navigation'
import MobileNav from './components/layout/MobileNav'
import Footer from './components/layout/Footer'
import ChatWidget from './components/chatbot/ChatWidget'
import ConfettiEffect from './components/shared/ConfettiEffect'

// Lazy load screens for code splitting
const WelcomeScreen = lazy(() => import('./components/screens/WelcomeScreen'))
const CourseSelect = lazy(() => import('./components/screens/CourseSelect'))
const Dashboard = lazy(() => import('./components/screens/Dashboard'))
const Checklist = lazy(() => import('./components/screens/Checklist'))
const Phases = lazy(() => import('./components/screens/Phases'))
const Heatmap = lazy(() => import('./components/screens/Heatmap'))
const Achievements = lazy(() => import('./components/screens/Achievements'))
const Analytics = lazy(() => import('./components/screens/Analytics'))
const FocusTimer = lazy(() => import('./components/screens/FocusTimer'))

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-3 border-[var(--bd)] border-t-[var(--ac)] rounded-full animate-spin" />
    </div>
  )
}

function AppContent() {
  const { user, setUser, loaded } = useUser()
  const [tab, setTab] = useState('dashboard')
  const [checklistFilter, setChecklistFilter] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleRegister = useCallback((name) => {
    setUser(name)
  }, [setUser])

  const handleNavigate = useCallback((newTab, filter) => {
    if (filter) setChecklistFilter(filter)
    setTab(newTab)
  }, [])

  const handleConfetti = useCallback(() => {
    setShowConfetti(true)
  }, [])

  const clearConfetti = useCallback(() => {
    setShowConfetti(false)
  }, [])

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--bg)]">
        <div className="text-center animate-float">
          <div className="w-14 h-14 border-3 border-[var(--ac)]/20 border-t-[var(--ac)] rounded-full animate-spin mx-auto mb-5" />
          <p className="text-[var(--tx3)] text-sm font-medium">Loading your journey...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <WelcomeScreen onRegister={handleRegister} />
      </Suspense>
    )
  }

  const renderScreen = () => {
    switch (tab) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} onConfetti={handleConfetti} />
      case 'checklist':
        return <Checklist initialPhase={checklistFilter} onConfetti={handleConfetti} />
      case 'phases':
        return <Phases onNavigate={handleNavigate} onConfetti={handleConfetti} />
      case 'heatmap':
        return <Heatmap onConfetti={handleConfetti} />
      case 'achievements':
        return <Achievements />
      case 'analytics':
        return <Analytics />
      case 'timer':
        return <FocusTimer />
      default:
        return <Dashboard onNavigate={handleNavigate} onConfetti={handleConfetti} />
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)] font-sans">
      <ConfettiEffect active={showConfetti} onComplete={clearConfetti} />

      <Header />

      <div className="hidden md:block">
        <Navigation activeTab={tab} onTabChange={setTab} />
      </div>

      <main className="max-w-[1200px] mx-auto px-4 md:px-5 pb-24 md:pb-8">
        <Suspense fallback={<LoadingFallback />}>
          {renderScreen()}
        </Suspense>
      </main>

      <Footer />

      <MobileNav activeTab={tab} onTabChange={setTab} />
      <ChatWidget />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CourseProvider>
          <AppContent />
        </CourseProvider>
      </UserProvider>
    </ThemeProvider>
  )
}
