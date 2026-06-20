import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

function combineChartData(months, minus2sd, median, plus2sd, childData) {
  const monthMap = {}
  months.forEach((m, i) => {
    monthMap[m] = { month: m, minus2sd: minus2sd[i], median: median[i], plus2sd: plus2sd[i] }
  })
  childData.forEach((d) => {
    if (monthMap[d.month]) {
      monthMap[d.month].anak = d.value
    } else {
      monthMap[d.month] = { month: d.month, anak: d.value }
    }
  })
  return Object.values(monthMap).sort((a, b) => a.month - b.month)
}

export default function GrowthChart({ chartData, metric }) {
  if (!chartData) return null

  const { months, minus2sd, median, plus2sd, childData } = chartData
  const data = combineChartData(months, minus2sd, median, plus2sd, childData)

  const unit = metric === 'wfa' ? 'kg' : 'cm'

  return (
    <div className="bg-bg-app rounded-3xl p-3">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} tickFormatter={(v) => v + ' bln'} />
          <YAxis tick={{ fontSize: 11 }} unit={' ' + unit} />
          <Tooltip
            formatter={(value, name) => {
              const labels = { minus2sd: '-2 SD', median: 'Median', plus2sd: '+2 SD', anak: 'Anak' }
              return [Number(value).toFixed(1) + ' ' + unit, labels[name] || name]
            }}
          />
          <Legend
            formatter={(value) => {
              const labels = { minus2sd: '-2 SD', median: 'Median', plus2sd: '+2 SD', anak: 'Anak' }
              return labels[value] || value
            }}
          />
          <Line type="monotone" dataKey="plus2sd" stroke="#ccc" strokeDasharray="5 5" dot={false} name="plus2sd" />
          <Line type="monotone" dataKey="median" stroke="#4CAF50" strokeWidth={2} dot={false} name="median" />
          <Line type="monotone" dataKey="minus2sd" stroke="#EA6A6A" strokeDasharray="5 5" dot={false} name="minus2sd" />
          <Line type="monotone" dataKey="anak" stroke="#58A5DA" strokeWidth={2.5} dot={{ r: 4, fill: '#58A5DA' }} activeDot={{ r: 6 }} name="anak" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
