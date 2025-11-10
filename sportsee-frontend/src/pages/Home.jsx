import { useState, useEffect } from 'react'
import { getUserMainData, getUserActivity, getUserAverageSessions, getUserPerformance } from '../services/api'
import { useAppContext } from '../contexts'
import BarChart from '../components/BarChart'
import './Home.css'
import LineChart from '../components/LineChart'
import RadarPerformanceChart from '../components/RadarChart'
import PurcentageChart from '../components/PurcentageChart'

function Home() {
  const { selectedUserId, useMocks, setUseMocks } = useAppContext()
  const [userData, setUserData] = useState(null)
  const [dataActivity, setDataActivity] = useState(null)
  const [dataAverageSessions, setDataAverageSessions] = useState(null)
  const [dataPerformance, setDataPerformance] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const data = await getUserMainData(selectedUserId, useMocks)
        setUserData(data)
      } catch (err) {
        console.error('Error fetching user data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (selectedUserId) {
      fetchUserData()
    }
  }, [selectedUserId, useMocks])

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      try {
        if (!selectedUserId) return
        const data = await getUserActivity(selectedUserId, useMocks)
        if (mounted) setDataActivity(data)
      } catch (err) {
        console.error('Error fetching user activity:', err)
      }
    }
    if (selectedUserId) fetchData()
    return () => {
      mounted = false
    }
  }, [selectedUserId, useMocks])

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      try {
        if (!selectedUserId) return
        const data = await getUserAverageSessions(selectedUserId, useMocks)
        if (mounted) setDataAverageSessions(data)
      } catch (err) {
        console.error('Error fetching user average sessions:', err)
      }
    }
    if (selectedUserId) fetchData()
    return () => {
      mounted = false
    }
  }, [selectedUserId, useMocks])

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      try {
        if (!selectedUserId) return
        const data = await getUserPerformance(selectedUserId, useMocks)
        if (mounted) setDataPerformance(data)
      } catch (err) {
        console.error('Error fetching user performance:', err)
      }
    }
    if (selectedUserId) fetchData()
    return () => {
      mounted = false
    }
  }, [selectedUserId, useMocks])

  if (isLoading) {
    return (
      <div className="user__loading">
        <p>Chargement des données...</p>
      </div>
    )
  }



  return (
    <div className="user">
      <div className="user__header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 className="user__greeting">
              Bonjour{' '}
              <span className="user__name">
                {userData?.userInfos?.firstName}
              </span>
            </h1>
            <p className="user__congratulations">
              Félicitation ! Vous avez explosé vos objectifs hier 👏
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={useMocks} onChange={(e) => setUseMocks(e.target.checked)} />
              <span style={{ fontSize: 14 }}>Use mocks</span>
            </label>
          </div>
        </div>

      </div>

      <div className="user__content">
        <div className="user__main">
          <div className="user__chart-placeholder">
            <BarChart dataActivity={dataActivity} />
          </div>

          <div className="user__stats-row">
            <div className="user__chart-placeholder">
              <LineChart dataAverageSessions={dataAverageSessions} />
            </div>
            <div className="user__chart-placeholder">
              <RadarPerformanceChart dataPerformance={dataPerformance} />
            </div>
            <div className="user__chart-placeholder">
              <PurcentageChart score={userData?.todayScore} />
            </div>
          </div>
        </div>

        <aside className="user__sidebar">
          <div className="user__key-data">
            <div className="user__data-card user__data-card--calories">
              <div className="user__data-icon">🔥</div>
              <div className="user__data-info">
                <p className="user__data-value">
                  {userData?.keyData?.calorieCount?.toLocaleString()}kCal
                </p>
                <p className="user__data-label">Calories</p>
              </div>
            </div>

            <div className="user__data-card user__data-card--protein">
              <div className="user__data-icon">🥩</div>
              <div className="user__data-info">
                <p className="user__data-value">
                  {userData?.keyData?.proteinCount}g
                </p>
                <p className="user__data-label">Proteines</p>
              </div>
            </div>

            <div className="user__data-card user__data-card--carbs">
              <div className="user__data-icon">🍎</div>
              <div className="user__data-info">
                <p className="user__data-value">
                  {userData?.keyData?.carbohydrateCount}g
                </p>
                <p className="user__data-label">Glucides</p>
              </div>
            </div>

            <div className="user__data-card user__data-card--fat">
              <div className="user__data-icon">🥑</div>
              <div className="user__data-info">
                <p className="user__data-value">
                  {userData?.keyData?.lipidCount}g
                </p>
                <p className="user__data-label">Lipides</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

    </div>
  )
}

export default Home
