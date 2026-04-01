import { useRef, useEffect, useState, useMemo } from 'react'
import { useCourse } from '../../context/CourseContext'
import { useUser } from '../../context/UserContext'
import ChartCard from '../shared/ChartCard'
import FilterPills from '../shared/FilterPills'
import { gsap } from '../../animations/gsapSetup'
import { pageEnter } from '../../animations/pageTransitions'
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, AreaChart, Area,
} from 'recharts'

const TICK = { fontSize: 10, fill: 'var(--tx3)' }
const FILTERS = [
  { label: 'All Charts', value: 'all' },
  { label: 'Progress', value: 'progress' },
  { label: 'Categories', value: 'category' },
  { label: 'Difficulty', value: 'difficulty' },
]

export default function Analytics() {
  const containerRef = useRef(null)
  const [chartFilter, setChartFilter] = useState('all')
  const { user, setUser } = useUser()
  const {
    totalDone, getPhaseData, getCatData, getLevelData,
    getCumulativeData, getRadarData, course, allTasks, completed,
    setActiveCourseId,
  } = useCourse()

  const phaseData = useMemo(() => getPhaseData(), [getPhaseData])
  const catData = useMemo(() => getCatData(), [getCatData])
  const levelData = useMemo(() => getLevelData(), [getLevelData])
  const cumulativeData = useMemo(() => getCumulativeData(), [getCumulativeData])
  const radarData = useMemo(() => getRadarData(), [getRadarData])
  const categories = course.categories || {}

  const targetLine = useMemo(() => {
    return allTasks.map((_, i) => ({ day: i + 1, target: i + 1 }))
  }, [allTasks])

  const cumulativeWithTarget = useMemo(() => {
    const map = {}
    for (const d of cumulativeData) map[d.day] = d.count
    return allTasks.map((_, i) => ({
      day: i + 1,
      done: map[i + 1] || (i > 0 ? map[i] : 0) || 0,
      target: i + 1,
    }))
  }, [cumulativeData, allTasks])

  useEffect(() => { pageEnter(containerRef.current) }, [])

  const show = (section) => chartFilter === 'all' || chartFilter === section

  const resetProgress = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      localStorage.removeItem('study-analytics-v4')
      window.location.reload()
    }
  }

  if (totalDone === 0) {
    return (
      <div ref={containerRef} className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-4">📊</div>
        <h2 className="text-lg font-extrabold text-[var(--tx)] mb-2">No Data Yet</h2>
        <p className="text-sm text-[var(--tx3)]">Start checking off tasks to see your analytics!</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="space-y-6">
      <div>
        <h2 className="text-lg font-extrabold text-[var(--tx)]">Analytics</h2>
        <p className="text-xs text-[var(--tx3)] mt-0.5">Deep dive into your progress</p>
      </div>

      <FilterPills options={FILTERS} value={chartFilter} onChange={setChartFilter} />

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        {/* Category Charts */}
        {show('category') && (
          <ChartCard title="Tasks by Category" subtitle="Distribution of all tasks">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={catData} dataKey="total" nameKey="name" cx="50%" cy="50%"
                  outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  fontSize={9}>
                  {catData.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {show('category') && (
          <ChartCard title="Completion by Category" subtitle="Done vs remaining">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={catData} dataKey="done" nameKey="name" cx="50%" cy="50%"
                  outerRadius={90} label={({ name, value }) => `${name}: ${value}`}
                  fontSize={9}>
                  {catData.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {show('category') && (
          <ChartCard title="Category %" subtitle="Completion percentage">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={catData} layout="vertical" margin={{ left: 60 }}>
                <XAxis type="number" domain={[0, 100]} tick={TICK} />
                <YAxis type="category" dataKey="name" tick={TICK} width={55} />
                <Tooltip />
                <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                  {catData.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {/* Progress Charts */}
        {show('progress') && (
          <ChartCard title="Phase Progress" subtitle="Done vs total per phase">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={phaseData} margin={{ left: 10 }}>
                <XAxis dataKey="name" tick={TICK} interval={0} angle={-30} textAnchor="end" height={60} />
                <YAxis tick={TICK} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="done" fill="var(--ac)" name="Done" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" fill="var(--bg3)" name="Total" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {show('progress') && (
          <ChartCard title="Cumulative vs Target" subtitle="Your pace vs ideal">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={cumulativeWithTarget}>
                <XAxis dataKey="day" tick={TICK} />
                <YAxis tick={TICK} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Area type="monotone" dataKey="target" stroke="var(--tx3)" fill="var(--bg3)"
                  strokeDasharray="4 4" name="Target" />
                <Area type="monotone" dataKey="done" stroke="var(--ac)" fill="var(--acl)"
                  name="Done" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {show('progress') && (
          <ChartCard title="Phase Journey" subtitle="Completion by phase">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={phaseData}>
                <XAxis dataKey="name" tick={TICK} interval={0} angle={-30} textAnchor="end" height={60} />
                <YAxis tick={TICK} domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="pct" stroke="var(--ac)" strokeWidth={2}
                  dot={{ r: 4, fill: 'var(--ac)' }} name="% Complete" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {/* Difficulty Charts */}
        {show('difficulty') && (
          <ChartCard title="Difficulty Breakdown" subtitle="Done vs total by level">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={levelData}>
                <XAxis dataKey="name" tick={TICK} />
                <YAxis tick={TICK} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="done" name="Done" radius={[4, 4, 0, 0]}>
                  {levelData.map((l, i) => <Cell key={i} fill={l.color} />)}
                </Bar>
                <Bar dataKey="total" fill="var(--bg3)" name="Total" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        )}

        {show('difficulty') && (
          <ChartCard title="Skill Radar" subtitle="Category mastery">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--bd)" />
                <PolarAngleAxis dataKey="subject" tick={TICK} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={TICK} />
                <Radar dataKey="value" stroke="var(--ac)" fill="var(--acl)" fillOpacity={0.5}
                  name="Mastery %" />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-[var(--bd)]">
        <button
          onClick={resetProgress}
          className="px-4 py-2 rounded-lg text-xs font-bold bg-[var(--dn)]/10 text-[var(--dn)]
            hover:bg-[var(--dn)]/20 transition-colors"
        >
          Reset Progress
        </button>
        <button
          onClick={() => setUser(null)}
          className="px-4 py-2 rounded-lg text-xs font-bold bg-[var(--bg3)] text-[var(--tx2)]
            hover:text-[var(--tx)] transition-colors"
        >
          Change Name
        </button>
      </div>
    </div>
  )
}
