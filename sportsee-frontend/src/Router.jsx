import { Routes, Route, Navigate } from 'react-router-dom'
import Profile from './pages/Profile'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import Community from './pages/Community'
import { useAppContext } from './contexts'

function RequireUser({ children }) {
  const { selectedUserId } = useAppContext()
  if (!selectedUserId) return <Navigate to="/not-found" replace />
  return children
}

function Router() {
  return (
    <Routes>
      <Route path="/" element={<RequireUser><Home /></RequireUser>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/community" element={<Community />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router
