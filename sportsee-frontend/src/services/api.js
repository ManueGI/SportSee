const API_BASE_URL = 'http://localhost:3000'

import UserModel from '../models/UserModel'
import ActivityModel from '../models/ActivityModel'
import AverageSessionsModel from '../models/AverageSessionsModel'
import PerformanceModel from '../models/PerformanceModel'

let MOCK_DATA_CACHE = null

const fetchAllMocks = async () => {
  if (MOCK_DATA_CACHE) return MOCK_DATA_CACHE
  const base = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL ? import.meta.env.BASE_URL : '/'
  const url = `${base}mocks/data.json`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Could not load combined mocks: ${res.status}`)
  MOCK_DATA_CACHE = await res.json()
  return MOCK_DATA_CACHE
}

export const getUserMainData = async (userId, useMocks = false) => {
  try {
    if (useMocks) {
      const all = await fetchAllMocks()
      const found = (all.USER_MAIN_DATA || []).find(u => u.id === Number(userId))
      return found ? UserModel.fromApi(found) : null
    }

    const response = await fetch(`${API_BASE_URL}/user/${userId}`)
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }
    const data = await response.json()
    return UserModel.fromApi(data)
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error)
    throw error
  }
}

export const getUserActivity = async (userId, useMocks = false) => {
  try {
    if (useMocks) {
      const all = await fetchAllMocks()
      const found = (all.USER_ACTIVITY || []).find(a => a.userId === Number(userId))
      return found ? ActivityModel.fromApi(found) : null
    }

    const response = await fetch(`${API_BASE_URL}/user/${userId}/activity`)
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }
    const data = await response.json()
    return ActivityModel.fromApi(data)
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'activité:', error)
    throw error
  }
}

export const getUserAverageSessions = async (userId, useMocks = false) => {
  try {
    if (useMocks) {
      const all = await fetchAllMocks()
      const found = (all.USER_AVERAGE_SESSIONS || []).find(a => a.userId === Number(userId))
      return found ? AverageSessionsModel.fromApi(found) : null
    }

    const response = await fetch(`${API_BASE_URL}/user/${userId}/average-sessions`)
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }
    const data = await response.json()
    return AverageSessionsModel.fromApi(data)
  } catch (error) {
    console.error('Erreur lors de la récupération des sessions moyennes:', error)
    throw error
  }
}

export const getUserPerformance = async (userId, useMocks = false) => {
  try {
    if (useMocks) {
      const all = await fetchAllMocks()
      const found = (all.USER_PERFORMANCE || []).find(a => a.userId === Number(userId))
      return found ? PerformanceModel.fromApi(found) : null
    }
    const response = await fetch(`${API_BASE_URL}/user/${userId}/performance`)
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }
    const data = await response.json()
    return PerformanceModel.fromApi(data)
  } catch (error) {
    console.error('Erreur lors de la récupération des performances:', error)
    throw error
  }
}
