import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import './BarChart.css'

function BarChart({ dataActivity }) {
  const sessions = dataActivity?.sessions ?? []
  const formatted = sessions.map((s, i) => ({ ...s, day: String(i + 1) }))

  return (
    <div className="barchart">
      <div className="barchart__header">
        <h2 className="barchart__title">Activité quotidienne</h2>
        <div className="barchart__legend">
          <div className="barchart__legend-group">
            <span className="barchart__legend-dot" style={{ background: '#282D30' }} />
            <span className="barchart__legend-text">Poids (kg)</span>
          </div>
          <div className="barchart__legend-group">
            <span className="barchart__legend-dot" style={{ background: '#FF0101' }} />
            <span className="barchart__legend-text">Calories brûlées (kCal)</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <ReBarChart data={formatted} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="day" tickLine={false} />
          <YAxis orientation="right" />
          <Tooltip
            wrapperStyle={{ background: '#ff0101', borderRadius: 0, border: 'none', boxShadow: 'none' }}
            contentStyle={{ background: 'transparent', padding: 6, color: '#fff', border: 'none' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value, name) => {
              return name === 'kilogram' ? [`${value}kg`, ''] : [`${value}cal`, '']
            }}
            separator={''}
            labelFormatter={() => ''}
            itemSorter={(a, b) => {
              if (!a || !b) return 0
              if (a.dataKey === 'kilogram' && b.dataKey !== 'kilogram') return -1
              if (b.dataKey === 'kilogram' && a.dataKey !== 'kilogram') return 1
              return 0
            }}
            cursor={false}
          />
          <Bar dataKey="kilogram" fill="#282D30" barSize={7} radius={[3.5, 3.5, 0, 0]} />
          <Bar dataKey="calories" fill="#FF0101" barSize={7} radius={[3.5, 3.5, 0, 0]} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChart
