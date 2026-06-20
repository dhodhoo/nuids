/**
 * ============================================
 * App.jsx — Router Utama Aplikasi
 * ============================================
 *
 * File ini mengatur rute/halaman mana yang ditampilkan.
 * Setiap halaman (page) punya path URL sendiri.
 *
 * Contoh: /dashboard → DashboardPage
 *         /tracking  → TrackingPage
 *         /login     → LoginPage
 *
 * Halaman yang butuh login dibungkus <ProtectedRoute>.
 * Kalau belum login, otomatis diarahkan ke /auth.
 * ============================================
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'

import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ConsentPage from './pages/ConsentPage'
import InputDataAwalPage from './pages/InputDataAwalPage'
import DashboardPage from './pages/DashboardPage'
import TrackingPage from './pages/TrackingPage'
import WeeklyInputPage from './pages/WeeklyInputPage'
import HistoryPage from './pages/HistoryPage'
import MealPlannerPage from './pages/MealPlannerPage'
import AIChatPage from './pages/AIChatPage'
import ProfilePage from './pages/ProfilePage'

/**
 * ProtectedRoute — Pembatas akses halaman
 *
 * Cara kerja:
 * 1. Kalau user belum login → redirect ke /auth
 * 2. Kalau masih loading data → tampilkan "Memuat..."
 * 3. Kalau sudah login → tampilkan halaman yang diminta
 */
function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useApp()

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-app flex items-center justify-center text-text-muted text-[14px]">
        Memuat...
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />
  }

  return children
}

/**
 * GuestRoute — User yang sudah login tidak bisa akses halaman publik
 *
 * Kalau user sudah login dan mencoba buka /, /auth, /login, /register,
 * otomatis diarahkan ke /dashboard.
 */
function GuestRoute({ children }) {
  const { isLoggedIn, loading } = useApp()

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-app flex items-center justify-center text-text-muted text-[14px]">
        Memuat...
      </div>
    )
  }

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Halaman publik — redirect ke /dashboard kalau sudah login */}
          <Route path="/" element={<GuestRoute><LandingPage /></GuestRoute>} />
          <Route path="/auth" element={<GuestRoute><AuthPage /></GuestRoute>} />
          <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />

          {/* Halaman yang butuh login */}
          <Route path="/consent" element={<ProtectedRoute><ConsentPage /></ProtectedRoute>} />
          <Route path="/input-data-awal" element={<ProtectedRoute><InputDataAwalPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/tracking" element={<ProtectedRoute><TrackingPage /></ProtectedRoute>} />
          <Route path="/weekly-input" element={<ProtectedRoute><WeeklyInputPage /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
          <Route path="/meal-planner" element={<ProtectedRoute><MealPlannerPage /></ProtectedRoute>} />
          <Route path="/ai-chat" element={<ProtectedRoute><AIChatPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

          {/* Kalau path tidak dikenal → redirect ke halaman utama */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
