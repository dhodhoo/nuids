/**
 * ============================================
 * AppContext — State Global Aplikasi
 * ============================================
 *
 * React Context berfungsi seperti "penyimpanan global" —
 * data yang disimpan di sini bisa diakses oleh halaman mana pun
 * tanpa perlu dikirim lewat props.
 *
 * Data yang disimpan:
 *   - user       → data orang tua (nama, email)
 *   - child      → data anak yang dipilih
 *   - checkups   → riwayat checkups anak
 *   - isLoggedIn → status login
 *
 * Cara pakai di komponen mana pun:
 *   import { useApp } from '../context/AppContext'
 *   const { user, child, logout } = useApp()
 * ============================================
 */

import { createContext, useContext, useState, useEffect } from 'react'
import api, { getToken, setToken } from '../services/api'

// Buat context baru dengan nilai awal null
const AppContext = createContext(null)

/**
 * AppProvider — Bungkus seluruh aplikasi dengan provider ini
 * di file App.jsx. Semua komponen di dalamnya bisa akses context.
 */
export function AppProvider({ children }) {
  // --- State global ---
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken()) // true kalau ada token
  const [consentGiven, setConsentGiven] = useState(false)
  const [user, setUser] = useState(null)    // Data orang tua
  const [child, setChild] = useState(null)  // Data anak
  const [checkups, setCheckups] = useState([]) // Riwayat checkups
  const [loading, setLoading] = useState(false)

  /**
   * Saat aplikasi pertama di-load, kalau user sudah login (ada token),
   * langsung ambil data user + anak dari backend.
   */
  useEffect(() => {
    if (isLoggedIn) {
      loadInitialData()
    }
  }, [isLoggedIn])

  /**
   * Ambil data awal: user, anak, dan checkups dari backend.
   * Dipanggil otomatis saat login atau halaman di-refresh.
   */
  async function loadInitialData() {
    setLoading(true)
    try {
      const userData = await api.auth.me()
      setUser(userData)

      const children = await api.children.list()
      if (children && children.length > 0) {
        setChild(children[0])
        const checkupsData = await api.checkups.list(children[0].id)
        setCheckups(checkupsData || [])
      }
    } catch (e) {
      // Kalau token sudah tidak valid, logout otomatis
      if (e.message.includes('401') || e.message.includes('Unauthorized')) {
        logout()
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * FUNGSI LOGIN
   * 1. Kirim email + password ke backend
   * 2. Dapat token
   * 3. Simpan token di localStorage
   * 4. Update state isLoggedIn jadi true
   *    → otomatis trigger useEffect → loadInitialData()
   */
  async function login(email, password) {
    const data = await api.auth.login({ email, password })
    setToken(data.token)
    setIsLoggedIn(true)
    setUser(data.user)
    return data
  }

  /**
   * FUNGSI REGISTER
   * Sama seperti login tapi untuk akun baru.
   */
  async function register(name, email, password, phone) {
    const data = await api.auth.register({ name, email, password, phone })
    setToken(data.token)
    setIsLoggedIn(true)
    setUser(data.user)
    return data
  }

  /**
   * FUNGSI LOGOUT
   * 1. Hapus token di backend
   * 2. Hapus token di localStorage
   * 3. Reset semua state ke nilai awal
   */
  function logout() {
    api.auth.logout().catch(() => {})
    setToken(null)
    setIsLoggedIn(false)
    setUser(null)
    setChild(null)
    setCheckups([])
    setConsentGiven(false)
  }

  function giveConsent() {
    setConsentGiven(true)
  }

  function updateChild(data) {
    setChild(prev => ({ ...prev, ...data }))
  }

  function addCheckup(entry) {
    setCheckups(prev => [entry, ...prev])
  }

  /**
   * Provider membagikan semua state dan fungsi ke seluruh aplikasi.
   * Komponen anak bisa mengaksesnya via useApp().
   */
  return (
    <AppContext.Provider value={{
      isLoggedIn,
      consentGiven,
      user,
      child,
      checkups,
      loading,
      login,
      register,
      logout,
      giveConsent,
      updateChild,
      addCheckup,
      setChild,
      setUser,
      setCheckups,
      loadInitialData,
    }}>
      {children}
    </AppContext.Provider>
  )
}

/**
 * Hook untuk mengakses context dari komponen mana pun.
 *
 * Contoh:
 *   function DashboardPage() {
 *     const { user, child } = useApp()
 *     return <h1>Halo {user.name}</h1>
 *   }
 */
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
