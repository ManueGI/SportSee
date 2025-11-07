import { useState, useEffect } from 'react'
import { AppContext } from './AppContextCore'

export function AppProvider({ children }) {
  const [selectedUserId, setSelectedUserId] = useState(() => {
    try {
      const v = window.localStorage.getItem('SELECTED_USER_ID')
      return v ? Number(v) : null
    } catch (err) {
      console.error('Error reading SELECTED_USER_ID from localStorage', err)
      return null
    }
  })

  const [useMocks, setUseMocks] = useState(() => {
    try { return window.localStorage.getItem('USE_MOCKS') === 'true' } catch (err) { console.error('Error reading USE_MOCKS from localStorage', err); return false }
  })

  useEffect(() => {
    try {
      if (selectedUserId != null) window.localStorage.setItem('SELECTED_USER_ID', String(selectedUserId))
      else window.localStorage.removeItem('SELECTED_USER_ID')
    } catch (err) {
      console.error('Error writing SELECTED_USER_ID to localStorage', err)
    }
  }, [selectedUserId])

  useEffect(() => {
    try {
      window.localStorage.setItem('USE_MOCKS', useMocks ? 'true' : 'false')
    } catch (err) {
      console.error('Error writing USE_MOCKS to localStorage', err)
    }
  }, [useMocks])

  return (
    <AppContext.Provider value={{ selectedUserId, setSelectedUserId, useMocks, setUseMocks }}>
      {children}
    </AppContext.Provider>
  )
}
