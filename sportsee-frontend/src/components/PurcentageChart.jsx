import './PurcentageChart.css'
import { ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts'

function PurcentageChart({ score = 0 }) {
  const s = Math.max(0, Math.min(1, Number(score) || 0))
  const percent = Math.round(s * 100)

  return (
    <div className="purcentage">
      <div className="purcentage__card" role="img" aria-label={`Score ${percent} pourcent`}>
        <div className="purcentage__chart">
          <ResponsiveContainer width="100%" >
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              startAngle={90}
              endAngle={450}
              data={[{ name: 'score', progress: percent, full: 100 }]}
            >

              <RadialBar
                minAngle={15}
                dataKey="full"
                cornerRadius={999}
                background={{ fill: '#f5f5f5' }}
                fill="#f5f5f5"
              />

              <RadialBar
                minAngle={15}
                dataKey="progress"
                cornerRadius={999}
                fill="#ff0101"
              />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="purcentage__overlay" aria-hidden="true">
            <ResponsiveContainer width="100%">
              <PieChart>
                <Pie
                  data={[{ value: 1 }]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius={0}
                  outerRadius="70%"
                  isAnimationActive={false}
                >
                  <Cell key="fill" fill="#ffffff" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="purcentage__center">
          <div className="purcentage__value">{percent}%</div>
          <div className="purcentage__label">de votre objectif</div>
        </div>
      </div>
    </div>
  )
}

export default PurcentageChart
