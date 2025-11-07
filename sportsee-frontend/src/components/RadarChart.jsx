import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import { useState, useEffect } from 'react'
import './RadarChart.css'

function RadarPerformanceChart({ dataPerformance }) {

  const getInitialTick = () => (typeof window !== 'undefined' && window.innerWidth <= 1024 ? 10 : 12)
  const [tickSize, setTickSize] = useState(getInitialTick)

  useEffect(() => {
    const onResize = () => setTickSize(window.innerWidth <= 1024 ? 10 : 12)
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResize)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onResize)
      }
    }
  }, [])

  if (!dataPerformance) return null

  const kindMap = dataPerformance.kind || {}
  const raw = dataPerformance.data || []

  const translations = {
    cardio: 'Cardio',
    energy: 'Énergie',
    endurance: 'Endurance',
    strength: 'Force',
    speed: 'Vitesse',
    intensity: 'Intensité'
  }

  const chartData = raw.map((item) => {
    const rawLabel = (kindMap[String(item.kind)] || kindMap[item.kind] || String(item.kind) || '').toString()
    const key = rawLabel.toLowerCase()
    const mapped = translations[key]
    const subject = mapped || (rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1))
    return {
      subject,
      value: item.value
    }
  })


  return (
    <div className="radarchart">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" stroke="#ffffff" tick={{ fill: '#ffffff', fontSize: tickSize }} />
          <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={false} axisLine={false} />
          <Tooltip formatter={(value) => `${value}`} />
          <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RadarPerformanceChart
