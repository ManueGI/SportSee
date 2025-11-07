import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
  Legend

} from 'recharts'
import './LineChart.css'

const CustomCursor = (props) => {
  const { points, width, height } = props;
  const { x = 0, y = 0 } = (points && points[0]) || {};
  return (
    <Rectangle
      fill="rgba(0,0,0,0.12)"
      stroke="#0000001f"
      x={x}
      y={y}
      width={width}
      height={height + 60}
    />
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null
  const v = payload[0].value
  return (
    <div className="linechart__tooltip">
      {`${v} min`}
    </div>
  )
}

const CustomActiveDot = (props) => {
  const { cx, cy } = props || {}
  if (cx == null || cy == null) return null
  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill="rgba(255,255,255,0.22)" />
      <circle cx={cx} cy={cy} r={6} fill="#ffffff" />
    </g>
  )
}

function LineChart({ dataAverageSessions }) {
  const sessions = dataAverageSessions?.sessions ?? []
  const dayShorts = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  const data = sessions.map(s => ({
    ...s,
    dayIndex: Number(s.day),
    dayShort: dayShorts[(Number(s.day) || 1) - 1],
    sessionLength: s.sessionLength
  }))

  const renderLegend = () => (
    <h2 className="linechart__title">Durée moyenne des sessions</h2>
  )

  return (
    <div className="linechart">
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart data={data} margin={{ top: 0, right: 12, left: 12, bottom: 5 }}>
          <Legend content={renderLegend} wrapperStyle={{ top: 10, left: 0 }} />
          <XAxis
            dataKey="dayIndex"
            type="number"
            domain={[1, 7]}
            height={10}
            ticks={[1, 2, 3, 4, 5, 6, 7]}
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'rgba(255,255,255,0.60)' }}
            interval={0}
            tickMargin={4}
            tickFormatter={(value) => dayShorts[(Number(value) || 1) - 1]}
          />
          <YAxis hide={true} width={0} axisLine={false} tick={false} domain={[dataMin => Math.max(0, dataMin - 10), dataMax => dataMax + 10]} />
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="#ffffff"
            strokeWidth={3}
            strokeOpacity={0.75}
            strokeLinecap="round"
            dot={false}
            activeDot={<CustomActiveDot />}
          />
        </ReLineChart>
      </ResponsiveContainer>

    </div>
  )
}

export default LineChart
